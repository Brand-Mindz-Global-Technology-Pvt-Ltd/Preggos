import { useState, useCallback } from "react";
import axios from "axios";
import {
  Upload,
  X,
  AlertCircle,
  Download,
  FileSpreadsheet,
  Trash2,
  CheckCircle,
  Table as TableIcon,
} from "lucide-react";
import * as XLSX from "xlsx";
import { CategoryBulkUploadTemplate } from "./CategoryBulkTemplate.jsx";

const API_URL = import.meta.env.VITE_API_URL;

export default function CategoryBulkUploadModal({
  isOpen,
  onClose,
  onUpload,
}) {
  const [file, setFile] = useState(null);
  const [previewData, setPreviewData] = useState([]);
  const [headers, setHeaders] = useState([]);
  const [errors, setErrors] = useState([]);
  const [dragActive, setDragActive] = useState(false);
  const [loading, setLoading] = useState(false);

  // ===============================
  // FILE CHANGE
  // ===============================
  const handleFileChange = useCallback((selectedFile) => {
    if (!selectedFile) return;

    const extension = selectedFile.name.split(".").pop().toLowerCase();

    if (!["csv", "xlsx", "xls"].includes(extension)) {
      setErrors(["Please upload CSV or Excel file"]);
      return;
    }

    if (selectedFile.size > 5 * 1024 * 1024) {
      setErrors(["File size should not exceed 5MB"]);
      return;
    }

    setFile(selectedFile);
    setErrors([]);
    parseFile(selectedFile);
  }, []);

  // ===============================
  // DRAG AND DROP HANDLERS
  // ===============================
  const handleDrag = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileChange(e.dataTransfer.files[0]);
    }
  }, [handleFileChange]);

  // ===============================
  // PARSE FILE
  // ===============================
  const parseFile = (file) => {
    const reader = new FileReader();

    reader.onload = (e) => {
      try {
        const workbook = XLSX.read(e.target.result, {
          type: file.name.endsWith(".csv") ? "string" : "binary",
        });

        const sheet = workbook.Sheets[workbook.SheetNames[0]];
        const data = XLSX.utils.sheet_to_json(sheet, { header: 1 });

        if (!data.length) {
          setErrors(["File is empty"]);
          return;
        }

        const fileHeaders = data[0].map((h) => h?.trim());
        const rows = data
          .slice(1)
          .filter((row) => row.some((cell) => cell !== ""));

        setHeaders(fileHeaders);
        setPreviewData(rows);
      } catch {
        setErrors(["Error reading file"]);
      }
    };

    file.name.endsWith(".csv")
      ? reader.readAsText(file)
      : reader.readAsBinaryString(file);
  };

  const downloadTemplate = () => {
    const ws = XLSX.utils.aoa_to_sheet(CategoryBulkUploadTemplate);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Categories");
    XLSX.writeFile(wb, "category_upload_template.xlsx");
  };

  const handleUpload = async () => {
    if (!previewData.length) {
      setErrors(["No data to upload"]);
      return;
    }

    const admin = JSON.parse(localStorage.getItem("admin"));
    const adminId = admin?.id;

    if (!adminId) {
      setErrors(["Admin not found"]);
      return;
    }

    setLoading(true);
    setErrors([]);

    try {
      const formattedData = previewData.map((row) => {
        const obj = {};
        headers.forEach((header, index) => {
          obj[header] = row[index] ?? "";
        });
        return obj;
      });

      const response = await axios.post(
        `${API_URL}/category/${adminId}/bulk-upload-category`,
        { categories: formattedData },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.data.success) {
        setFile(null);
        setPreviewData([]);
        setHeaders([]);
        onUpload?.();
        onClose();
      } else {
        setErrors([response.data.message]);
      }
    } catch (err) {
      setErrors([
        err.response?.data?.message || "Upload failed. Please try again.",
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleRemove = () => {
    setFile(null);
    setPreviewData([]);
    setHeaders([]);
    setErrors([]);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex justify-center items-center p-2 sm:p-4">
      <div className="bg-white w-full max-w-6xl rounded-xl shadow-2xl flex flex-col max-h-[95vh] sm:max-h-[90vh] overflow-hidden">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-[#162A78] to-[#1e3a9e] text-white p-4 sm:p-6 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <FileSpreadsheet className="w-6 h-6 sm:w-7 sm:h-7" />
            <h2 className="text-lg sm:text-xl font-semibold">Bulk Upload Categories</h2>
          </div>
          <button 
            onClick={onClose}
            className="hover:bg-white/20 p-2 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="p-4 sm:p-6 space-y-4 sm:space-y-6 overflow-y-auto flex-1">
          
          {/* Download Template Card */}
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-200 p-4 rounded-xl shadow-sm hover:shadow-md transition-shadow">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
              <div className="flex items-center gap-3">
                <div className="bg-green-100 p-2 rounded-lg">
                  <FileSpreadsheet className="text-green-600 w-5 h-5 sm:w-6 sm:h-6" />
                </div>
                <div>
                  <span className="text-green-800 font-semibold text-sm sm:text-base block">
                    Download Template
                  </span>
                  <span className="text-green-600 text-xs sm:text-sm">
                    Use this template to format your data correctly
                  </span>
                </div>
              </div>

              <button
                onClick={downloadTemplate}
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2.5 rounded-lg flex items-center gap-2 font-medium transition-colors shadow-sm hover:shadow w-full sm:w-auto justify-center"
              >
                <Download size={18} />
                <span className="text-sm sm:text-base">Download</span>
              </button>
            </div>
          </div>

          {/* Upload Area */}
          {!file && (
            <div 
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
              className={`border-2 border-dashed rounded-xl p-8 sm:p-12 text-center transition-all ${
                dragActive 
                  ? "border-[#162A78] bg-blue-50" 
                  : "border-gray-300 hover:border-gray-400 bg-gray-50"
              }`}
            >
              <Upload className="mx-auto text-gray-400 mb-4" size={48} />
              <p className="text-base sm:text-lg font-medium text-gray-700 mb-2">
                Drag & Drop your file here
              </p>
              <p className="text-sm text-gray-500 mb-4">or</p>
              
              <label className="inline-block">
                <input
                  type="file"
                  accept=".csv,.xlsx,.xls"
                  onChange={(e) => handleFileChange(e.target.files[0])}
                  className="hidden"
                />
                <span className="bg-[#162A78] hover:bg-[#1e3a9e] text-white px-6 py-3 rounded-lg cursor-pointer inline-flex items-center gap-2 font-medium transition-colors">
                  <Upload size={18} />
                  Browse File
                </span>
              </label>
              
              <p className="text-xs text-gray-400 mt-4">
                Supported formats: CSV, XLSX, XLS (Max 5MB)
              </p>
            </div>
          )}

          {/* File Info */}
          {file && (
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 p-4 rounded-xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 shadow-sm">
              <div className="flex items-center gap-3 flex-1 min-w-0">
                <div className="bg-blue-100 p-2 rounded-lg flex-shrink-0">
                  <CheckCircle className="text-blue-600" size={20} />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="font-medium text-gray-800 text-sm sm:text-base truncate">{file.name}</p>
                  <p className="text-xs sm:text-sm text-gray-600">
                    {(file.size / 1024).toFixed(2)} KB • {previewData.length} rows
                  </p>
                </div>
              </div>
              <button 
                onClick={handleRemove}
                className="bg-red-100 hover:bg-red-200 text-red-600 p-2 rounded-lg transition-colors flex-shrink-0"
              >
                <Trash2 size={18} />
              </button>
            </div>
          )}

          {/* Error Messages */}
          {errors.length > 0 && (
            <div className="bg-red-50 border border-red-200 p-4 rounded-xl">
              <div className="flex items-start gap-3">
                <AlertCircle className="text-red-600 flex-shrink-0 mt-0.5" size={20} />
                <div className="flex-1">
                  {errors.map((err, i) => (
                    <p key={i} className="text-red-700 text-sm">{err}</p>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Preview Table */}
          {previewData.length > 0 && (
            <div className="border border-gray-200 rounded-xl overflow-hidden shadow-sm">
              <div className="bg-gray-50 border-b border-gray-200 p-4 flex items-center gap-3">
                <TableIcon className="text-gray-600" size={20} />
                <h3 className="font-semibold text-gray-800">
                  Data Preview ({previewData.length} rows)
                </h3>
              </div>
              
              <div className="overflow-x-auto">
                <div className="max-h-[300px] sm:max-h-[400px] overflow-y-auto">
                  <table className="w-full text-sm">
                    <thead className="bg-gray-100 sticky top-0 z-10">
                      <tr>
                        <th className="px-3 sm:px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider border-b border-gray-200">
                          #
                        </th>
                        {headers.map((header, index) => (
                          <th
                            key={index}
                            className="px-3 sm:px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider border-b border-gray-200 whitespace-nowrap"
                          >
                            {header}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {previewData.slice(0, 50).map((row, rowIndex) => (
                        <tr 
                          key={rowIndex}
                          className="hover:bg-gray-50 transition-colors"
                        >
                          <td className="px-3 sm:px-4 py-3 text-gray-500 font-medium border-r border-gray-200">
                            {rowIndex + 1}
                          </td>
                          {headers.map((_, colIndex) => (
                            <td
                              key={colIndex}
                              className="px-3 sm:px-4 py-3 text-gray-800 whitespace-nowrap"
                            >
                              {row[colIndex] ?? "-"}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
              
              {previewData.length > 50 && (
                <div className="bg-gray-50 border-t border-gray-200 p-3 text-center">
                  <p className="text-xs sm:text-sm text-gray-600">
                    Showing first 50 rows of {previewData.length} total rows
                  </p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="border-t border-gray-200 p-4 sm:p-5 bg-gray-50 flex flex-col sm:flex-row justify-end gap-3">
          <button 
            onClick={onClose} 
            className="px-5 py-2.5 border-2 border-gray-300 hover:border-gray-400 rounded-lg font-medium text-gray-700 hover:bg-gray-100 transition-colors order-2 sm:order-1"
          >
            Cancel
          </button>

          <button
            onClick={handleUpload}
            disabled={!file || loading || previewData.length === 0}
            className="px-5 py-2.5 bg-[#162A78] hover:bg-[#1e3a9e] text-white rounded-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-sm hover:shadow flex items-center justify-center gap-2 order-1 sm:order-2"
          >
            {loading ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Uploading...
              </>
            ) : (
              <>
                <Upload size={18} />
                Upload Categories
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}