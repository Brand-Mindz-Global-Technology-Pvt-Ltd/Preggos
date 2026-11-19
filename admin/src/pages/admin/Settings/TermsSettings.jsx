import React, { useState, useEffect } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import axios from 'axios';

function TermsSettings() {
  const [termsData, setTermsData] = useState({
    title: 'Terms & Conditions',
    content: '',
    lastUpdated: new Date().toISOString().split('T')[0]
  });

  const [showPreview, setShowPreview] = useState(false);
  const [loading, setLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [hasContent, setHasContent] = useState(false);

  const BASE_URL = import.meta.env.VITE_API_URL;
  const API_BASE_URL = `${BASE_URL}/settings`;


  const getAdminId = () => {
    const admin = localStorage.getItem('admin');
    if (admin) {
      try {
        const adminData = JSON.parse(admin);
        return adminData.id;
      } catch (e) {
        console.error('Error parsing admin data:', e);
        return null;
      }
    }
    return null;
  };
  const getToken = () => {
    return localStorage.getItem('token');
  };
  const modules = {
    toolbar: [
      [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
      [{ 'font': [] }],
      [{ 'size': ['small', false, 'large', 'huge'] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ 'color': [] }, { 'background': [] }],
      [{ 'script': 'sub' }, { 'script': 'super' }],
      [{ 'list': 'ordered' }, { 'list': 'bullet' }],
      [{ 'indent': '-1' }, { 'indent': '+1' }],
      [{ 'align': [] }],
      ['blockquote', 'code-block'],
      ['link'],
      ['clean']
    ]
  };

  const formats = [
    'header', 'font', 'size',
    'bold', 'italic', 'underline', 'strike',
    'color', 'background',
    'script',
    'list', 'bullet', 'indent',
    'align',
    'blockquote', 'code-block',
    'link',
  ];

  useEffect(() => {
    fetchTerms();
  }, []);

  const fetchTerms = async () => {
    const adminId = getAdminId();
    const token = getToken();

    if (!adminId) {
      setError('Admin ID not found. Please login again.');
      setFetchLoading(false);
      return;
    }

    try {
      setFetchLoading(true);
      const response = await axios.get(
        `${API_BASE_URL}/get-terms/${adminId}`,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );

      if (response.data.success && response.data.data) {
        const { title, content, updatedAt } = response.data.data;
        setTermsData({
          title: title || 'Terms & Conditions',
          content: content || '',
          lastUpdated: updatedAt
            ? new Date(updatedAt).toISOString().split('T')[0]
            : new Date().toISOString().split('T')[0]
        });

        // If content exists, disable editing initially
        if (content && content.trim() !== '') {
          setHasContent(true);
          setIsEditing(false);
        } else {
          setHasContent(false);
          setIsEditing(true);
        }
      }
    } catch (err) {
      // If 404, it means no terms exist yet - this is okay, enable editing
      if (err.response?.status === 404) {
        setIsEditing(true);
        setHasContent(false);
      } else {
        console.error('Error fetching terms:', err);
        setError(err.response?.data?.message || 'Failed to fetch terms');
      }
    } finally {
      setFetchLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const adminId = getAdminId();
    const token = getToken();

    if (!adminId) {
      setError('Admin ID not found. Please login again.');
      return;
    }

    if (!termsData.content || termsData.content.trim() === '') {
      setError('Content is required');
      return;
    }

    try {
      setLoading(true);
      setError('');
      setSuccess('');

      const response = await axios.post(
        `${API_BASE_URL}/post-terms/${adminId}`,
        {
          title: termsData.title,
          content: termsData.content
        },
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );

      if (response.data.success) {
        setSuccess('Terms & Conditions saved successfully!');
        // Update lastUpdated from server response
        if (response.data.data.updatedAt) {
          setTermsData(prev => ({
            ...prev,
            lastUpdated: new Date(response.data.data.updatedAt).toISOString().split('T')[0]
          }));
        }

        // Disable editing after successful save
        setIsEditing(false);
        setHasContent(true);

        // Clear success message after 3 seconds
        setTimeout(() => setSuccess(''), 3000);
      }
    } catch (err) {
      console.error('Error saving terms:', err);
      setError(err.response?.data?.message || 'Failed to saveTerms & Conditions');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setError('');
    fetchTerms();
  };

  const handlePreview = () => {
    setShowPreview(true);
  };

  const handleClosePreview = () => {
    setShowPreview(false);
  };

  if (fetchLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <svg className="animate-spin h-10 w-10 text-blue-600 mx-auto" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <p className="mt-4 text-gray-600">Loading Terms & Conditions...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        {error && (
          <div className="mx-6 mt-6 p-4 bg-red-50 border border-red-200 rounded-md">
            <div className="flex">
              <svg className="h-5 w-5 text-red-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
              <p className="ml-3 text-sm text-red-700">{error}</p>
            </div>
          </div>
        )}

        {success && (
          <div className="mx-6 mt-6 p-4 bg-green-50 border border-green-200 rounded-md">
            <div className="flex">
              <svg className="h-5 w-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <p className="ml-3 text-sm text-green-700">{success}</p>
            </div>
          </div>
        )}

        <div className="p-6 border-b border-gray-200 flex justify-between items-center">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">Terms & Conditions</h2>
            <p className="mt-1 text-sm text-gray-600">Manage your platform's terms and legal agreement</p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={handlePreview}
              type="button"
              disabled={!hasContent}
              className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
              Preview
            </button>

            {hasContent && !isEditing && (
              <button
                onClick={handleEdit}
                type="button"
                className="inline-flex items-center px-4 py-2 border border-blue-300 rounded-md shadow-sm text-sm font-medium text-blue-700 bg-white hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
                Edit
              </button>
            )}

            {hasContent && isEditing && (
              <button
                onClick={handleCancelEdit}
                type="button"
                disabled={loading}
                className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
                Cancel
              </button>
            )}
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6">
          <div className="space-y-6">
            {/* Title */}
            <div>
              <label htmlFor="termsTitle" className="block text-sm font-medium text-gray-700 mb-2">
                Title
              </label>
              <input
                type="text"
                id="termsTitle"
                value={termsData.title}
                onChange={(e) => setTermsData({ ...termsData, title: e.target.value })}
                disabled={!isEditing}
                className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 transition-colors disabled:bg-gray-100 disabled:cursor-not-allowed"
                placeholder="Privacy Policy"
              />
            </div>

            {/* Content with Rich Text Editor */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Content <span className="text-red-500">*</span>
              </label>
              <div className={`border border-gray-300 rounded-md overflow-hidden ${!isEditing ? 'bg-gray-50' : ''}`}>
                <ReactQuill
                  theme="snow"
                  value={termsData.content}
                  onChange={(content) => setTermsData({ ...termsData, content })}
                  modules={modules}
                  formats={formats}
                  placeholder="Enter your privacy policy here..."
                  className="bg-white"
                  style={{ height: '350px' }}
                  readOnly={!isEditing}
                />
              </div>
              <p className="mt-14 text-xs text-gray-500">
                {isEditing ? 'Use the toolbar above to format your privacy policy' : 'Click Edit to modify the content'}
              </p>
            </div>

            {/* Last Updated */}
            <div>
              <label htmlFor="termsDate" className="block text-sm font-medium text-gray-700 mb-2">
                Last Updated
              </label>
              <input
                type="date"
                id="termsDate"
                value={termsData.lastUpdated}
                onChange={(e) => setTermsData({ ...termsData, lastUpdated: e.target.value })}
                disabled={!isEditing}
                className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 transition-colors disabled:bg-gray-100 disabled:cursor-not-allowed"
              />
            </div>

            {/* Submit Button - only show when editing */}
            {isEditing && (
              <div className="flex justify-end pt-4 border-t border-gray-200">
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
          </div>
        </form>
      </div>

      {/* Preview Modal */}
      {showPreview && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col">
            {/* Modal Header */}
            <div className="p-6 border-b border-gray-200 flex justify-between items-center">
              <h3 className="text-xl font-semibold text-gray-900">Preview</h3>
              <button
                onClick={handleClosePreview}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-8 overflow-y-auto flex-1">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{termsData.title}</h1>
              <p className="text-sm text-gray-500 mb-6">Last Updated: {termsData.lastUpdated}</p>
              <div
                className="prose prose-slate max-w-none"
                dangerouslySetInnerHTML={{ __html: termsData.content }}
              />
            </div>

            {/* Modal Footer */}
            <div className="p-6 border-t border-gray-200 flex justify-end">
              <button
                onClick={handleClosePreview}
                className="px-6 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors"
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

export default TermsSettings;