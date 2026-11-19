import React, { useState, useEffect } from 'react';
import axios from 'axios';

function CompanySettings() {
  const [companyData, setCompanyData] = useState({
    companyName: '',
    logo: null,
    logoPreview: null,
    email: '',
    phone: '',
    address: ''
  });

  const [message, setMessage] = useState({ type: '', text: '' });
  const [loading, setLoading] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [originalData, setOriginalData] = useState(null);

    const BASE_URL = import.meta.env.VITE_API_URL;

  const getAdminId = () => {
    const admin = localStorage.getItem('admin');
    if (admin) {
      try {
        return JSON.parse(admin)?.id;
      } catch {
        return null;
      }
    }
    return null;
  };

  const adminId = getAdminId();
  const token = localStorage.getItem('token');

  const api = axios.create({
    baseURL: `${BASE_URL}/settings`,
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });

  useEffect(() => {
    if (adminId) {
      fetchCompanyData();
    } else {
      setFetchLoading(false);
      setMessage({ type: 'error', text: 'Admin ID not found. Please login again.' });
    }
  }, []);

  const fetchCompanyData = async () => {
    setFetchLoading(true);
    try {
      const response = await api.get(`/getcompany/${adminId}`);

      if (response.data.success && response.data.data) {
        const data = response.data.data;
        const loadedData = {
          companyName: data.companyName || '',
          logo: null,
          logoPreview: data.logo || null,
          email: data.email || '',
          phone: data.phone || '',
          address: data.address || ''
        };
        setCompanyData(loadedData);
        setOriginalData(loadedData);
      }
    } catch (error) {
      console.error('Error fetching company data:', error);
      if (error.response?.status === 404) {
        const emptyData = {
          companyName: '',
          logo: null,
          logoPreview: null,
          email: '',
          phone: '',
          address: ''
        };
        setCompanyData(emptyData);
        setOriginalData(emptyData);
        setIsEditing(true);
      } else {
        setMessage({
          type: 'error',
          text: error.response?.data?.message || 'Failed to load company data'
        });
        setTimeout(() => setMessage({ type: '', text: '' }), 3000);
      }
    } finally {
      setFetchLoading(false);
    }
  };

  // Handle logo upload
  const handleLogoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setMessage({ type: 'error', text: 'File size should be less than 5MB' });
        setTimeout(() => setMessage({ type: '', text: '' }), 3000);
        return;
      }
      const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/svg+xml', 'image/webp'];
      if (!allowedTypes.includes(file.type)) {
        setMessage({ type: 'error', text: 'Only image files (JPG, PNG, GIF, SVG, WEBP) are allowed' });
        setTimeout(() => setMessage({ type: '', text: '' }), 3000);
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setCompanyData(prev => ({
          ...prev,
          logo: file,
          logoPreview: reader.result
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle Edit button click
  const handleEdit = () => {
    setIsEditing(true);
    setOriginalData({ ...companyData });
  };

  // Handle Cancel button click
  const handleCancel = () => {
    setIsEditing(false);
    setCompanyData({ ...originalData });
    setMessage({ type: '', text: '' });
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!companyData.companyName.trim()) {
      setMessage({ type: 'error', text: 'Company name is required' });
      setTimeout(() => setMessage({ type: '', text: '' }), 3000);
      return;
    }

    if (!companyData.email.trim()) {
      setMessage({ type: 'error', text: 'Company email is required' });
      setTimeout(() => setMessage({ type: '', text: '' }), 3000);
      return;
    }

    setLoading(true);

    try {
      const formData = new FormData();

      formData.append('companyName', companyData.companyName.trim());
      formData.append('email', companyData.email.trim());
      formData.append('phone', companyData.phone);
      formData.append('address', companyData.address);
      if (companyData.logo && companyData.logo instanceof File) {
        formData.append('logo', companyData.logo);
      }
      const response = await api.post(
        `/postcompany/${adminId}`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
      );

      console.log('=== Response ===', response.data);

      if (response.data.success) {
        setMessage({
          type: 'success',
          text: response.data.message || 'Company information saved successfully!'
        });

        const savedData = response.data.data;
        const updatedData = {
          companyName: savedData.companyName || '',
          logo: null,
          logoPreview: savedData.logo || companyData.logoPreview,
          email: savedData.email || '',
          phone: savedData.phone || '',
          address: savedData.address || ''
        };
        setCompanyData(updatedData);
        setOriginalData(updatedData);
        setIsEditing(false);

        setTimeout(() => setMessage({ type: '', text: '' }), 3000);
      }
    } catch (error) {
      console.error('=== Error ===', error);
      console.error('Error response:', error.response?.data);

      setMessage({
        type: 'error',
        text: error.response?.data?.message || 'Failed to save company information'
      });
      setTimeout(() => setMessage({ type: '', text: '' }), 3000);
    } finally {
      setLoading(false);
    }
  };

  const handlePreview = () => {
    setShowPreview(true);
  };

  if (fetchLoading) {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12">
        <div className="flex flex-col items-center justify-center">
          <svg className="animate-spin h-12 w-12 text-blue-600" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <p className="mt-4 text-gray-600">Loading company information...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        {/* Header */}
        <div className="p-6 border-b border-gray-200 flex justify-between items-center">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">Company Information</h2>
            <p className="mt-1 text-sm text-gray-600">Update your company details and logo</p>
          </div>
          <div className="flex items-center space-x-3">
            <button
              onClick={handlePreview}
              type="button"
              className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
              Preview
            </button>
            {!isEditing && (
              <button
                onClick={handleEdit}
                type="button"
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
                Edit
              </button>
            )}
          </div>
        </div>

        {/* Message Alert */}
        {message.text && (
          <div className={`mx-6 mt-6 p-4 rounded-lg border ${message.type === 'success'
              ? 'bg-green-50 border-green-200 text-green-800'
              : 'bg-red-50 border-red-200 text-red-800'
            }`}>
            <div className="flex items-center">
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                {message.type === 'success' ? (
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                ) : (
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                )}
              </svg>
              <span className="font-medium">{message.text}</span>
            </div>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Logo Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Company Logo
            </label>
            <div className="flex items-center space-x-6">
              {companyData.logoPreview ? (
                <div className="w-32 h-32 border-2 border-gray-200 rounded-lg overflow-hidden bg-gray-50 flex items-center justify-center">
                  <img
                    src={companyData.logoPreview}
                    alt="Company Logo"
                    className="max-w-full max-h-full object-contain"
                  />
                </div>
              ) : (
                <div className="w-32 h-32 border-2 border-dashed border-gray-300 rounded-lg bg-gray-50 flex items-center justify-center">
                  <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
              )}
              <div className="flex-1">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleLogoChange}
                  className="hidden"
                  id="logo-upload"
                  disabled={!isEditing}
                />
                <label
                  htmlFor="logo-upload"
                  className={`inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium transition-colors ${isEditing
                      ? 'text-gray-700 bg-white hover:bg-gray-50 cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
                      : 'text-gray-400 bg-gray-100 cursor-not-allowed'
                    }`}
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                  </svg>
                  Choose Logo
                </label>
                <p className="mt-2 text-xs text-gray-500">
                  Max file size: 5MB. Supported formats: JPG, PNG, SVG, GIF, WEBP
                </p>
              </div>
            </div>
          </div>

          {/* Company Name */}
          <div>
            <label htmlFor="companyName" className="block text-sm font-medium text-gray-700 mb-2">
              Company Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="companyName"
              value={companyData.companyName}
              onChange={(e) => setCompanyData({ ...companyData, companyName: e.target.value })}
              required
              disabled={!isEditing}
              className={`w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm transition-colors ${isEditing
                  ? 'focus:ring-blue-500 focus:border-blue-500 bg-white'
                  : 'bg-gray-50 text-gray-500 cursor-not-allowed'
                }`}
              placeholder="Enter company name"
            />
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
              Company Email <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              id="email"
              value={companyData.email}
              onChange={(e) => setCompanyData({ ...companyData, email: e.target.value })}
              required
              disabled={!isEditing}
              className={`w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm transition-colors ${isEditing
                  ? 'focus:ring-blue-500 focus:border-blue-500 bg-white'
                  : 'bg-gray-50 text-gray-500 cursor-not-allowed'
                }`}
              placeholder="company@example.com"
            />
          </div>

          {/* Phone */}
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
              Phone Number
            </label>
            <input
              type="tel"
              id="phone"
              value={companyData.phone}
              onChange={(e) => setCompanyData({ ...companyData, phone: e.target.value })}
              disabled={!isEditing}
              className={`w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm transition-colors ${isEditing
                  ? 'focus:ring-blue-500 focus:border-blue-500 bg-white'
                  : 'bg-gray-50 text-gray-500 cursor-not-allowed'
                }`}
              placeholder="+1 (555) 123-4567"
            />
          </div>

          {/* Address */}
          <div>
            <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-2">
              Address
            </label>
            <textarea
              id="address"
              value={companyData.address}
              onChange={(e) => setCompanyData({ ...companyData, address: e.target.value })}
              rows="3"
              disabled={!isEditing}
              className={`w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm resize-none transition-colors ${isEditing
                  ? 'focus:ring-blue-500 focus:border-blue-500 bg-white'
                  : 'bg-gray-50 text-gray-500 cursor-not-allowed'
                }`}
              placeholder="Enter company address"
            />
          </div>

          {/* Submit and Cancel Buttons */}
          {isEditing && (
            <div className="flex justify-end space-x-3 pt-4">
              <button
                type="button"
                onClick={handleCancel}
                disabled={loading}
                className="inline-flex items-center px-6 py-3 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className={`inline-flex items-center px-6 py-3 border border-transparent rounded-md shadow-sm text-sm font-medium text-white transition-colors ${loading
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
                  }`}
              >
                {loading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Saving...
                  </>
                ) : (
                  <>
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Save Changes
                  </>
                )}
              </button>
            </div>
          )}
        </form>
      </div>

      {/* Preview Modal */}
      {showPreview && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center">
              <h3 className="text-xl font-semibold text-gray-900">Company Information Preview</h3>
              <button
                onClick={() => setShowPreview(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6">
              {/* Logo Preview */}
              {companyData.logoPreview && (
                <div className="mb-6 flex justify-center">
                  <div className="w-48 h-48 border-2 border-gray-200 rounded-lg overflow-hidden bg-gray-50 flex items-center justify-center">
                    <img
                      src={companyData.logoPreview}
                      alt="Company Logo Preview"
                      className="max-w-full max-h-full object-contain"
                    />
                  </div>
                </div>
              )}

              {/* Company Details */}
              <div className="space-y-4">
                <div className="border-b border-gray-200 pb-4">
                  <h4 className="text-sm font-medium text-gray-500 mb-1">Company Name</h4>
                  <p className="text-lg font-semibold text-gray-900">
                    {companyData.companyName || 'Not provided'}
                  </p>
                </div>

                <div className="border-b border-gray-200 pb-4">
                  <h4 className="text-sm font-medium text-gray-500 mb-1">Email</h4>
                  <p className="text-base text-gray-900">
                    {companyData.email || 'Not provided'}
                  </p>
                </div>

                <div className="border-b border-gray-200 pb-4">
                  <h4 className="text-sm font-medium text-gray-500 mb-1">Phone Number</h4>
                  <p className="text-base text-gray-900">
                    {companyData.phone || 'Not provided'}
                  </p>
                </div>

                <div>
                  <h4 className="text-sm font-medium text-gray-500 mb-1">Address</h4>
                  <p className="text-base text-gray-900 whitespace-pre-wrap">
                    {companyData.address || 'Not provided'}
                  </p>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="sticky bottom-0 bg-gray-50 px-6 py-4 border-t border-gray-200 flex justify-end">
              <button
                onClick={() => setShowPreview(false)}
                className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors font-medium"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default CompanySettings;