import { useState, useCallback } from "react";
import axios from "axios";
import {
    Upload,
    X,
    AlertCircle,
    CheckCircle,
    Download,
    FileSpreadsheet,
    Trash2,
} from "lucide-react";
import * as XLSX from "xlsx";
import { BulkUploadTemplate } from "./productBulkTemplate";

const API_URL = import.meta.env.VITE_API_URL;

export default function BulkUploadModal({ isOpen, onClose, onUpload }) {
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

        const fileExtension = selectedFile.name.split(".").pop().toLowerCase();

        if (!["csv", "xlsx", "xls"].includes(fileExtension)) {
            setErrors(["Please upload a valid CSV or Excel file"]);
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
    // PARSE FILE
    // ===============================
    const parseFile = (file) => {
        const reader = new FileReader();

        reader.onload = (e) => {
            try {
                const data = e.target.result;

                const workbook = XLSX.read(data, {
                    type: file.name.endsWith(".csv") ? "string" : "binary",
                });

                const sheet = workbook.Sheets[workbook.SheetNames[0]];
                const jsonData = XLSX.utils.sheet_to_json(sheet, { header: 1 });

                if (!jsonData.length) {
                    setErrors(["The file is empty"]);
                    return;
                }

                const rawHeaders = jsonData[0];
                const normalizedHeaders = rawHeaders.map((h) => h?.trim());

                const rows = jsonData
                    .slice(1)
                    .filter((row) =>
                        row.some((cell) => cell !== undefined && cell !== "")
                    );

                setHeaders(normalizedHeaders);
                setPreviewData(rows);
                validateData(normalizedHeaders, rows);

            } catch (error) {
                setErrors([`Error parsing file: ${error.message}`]);
            }
        };

        file.name.endsWith(".csv")
            ? reader.readAsText(file)
            : reader.readAsBinaryString(file);
    };

    // ===============================
    // VALIDATION
    // ===============================
    const validateData = (headers, rows) => {
        const requiredFields = ["name", "price", "brand", "category", "stock"];
        const validationErrors = [];

        const missingHeaders = requiredFields.filter(
            (field) =>
                !headers.some((h) => h?.toLowerCase() === field.toLowerCase())
        );

        if (missingHeaders.length) {
            validationErrors.push(
                `Missing required columns: ${missingHeaders.join(", ")}`
            );
        }

        if (!rows.length) {
            validationErrors.push("No data rows found");
        }

        rows.forEach((row, index) => {
            if (row.every((cell) => !cell)) {
                validationErrors.push(`Row ${index + 2} is empty`);
            }
        });

        setErrors(validationErrors);
    };

    // ===============================
    // DRAG HANDLERS
    // ===============================
    const handleDrag = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(e.type === "dragenter" || e.type === "dragover");
    };

    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);

        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            handleFileChange(e.dataTransfer.files[0]);
        }
    };

    // ===============================
    // TEMPLATE DOWNLOAD
    // ===============================
    const downloadTemplate = () => {
        const ws = XLSX.utils.aoa_to_sheet(BulkUploadTemplate);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "Products");
        XLSX.writeFile(wb, "product_upload_template.xlsx");
    };

    // ===============================
    // REMOVE FILE
    // ===============================
    const handleRemoveFile = () => {
        setFile(null);
        setPreviewData([]);
        setHeaders([]);
        setErrors([]);
    };

    // ===============================
    // UPLOAD API CALL
    // ===============================
    const handleUpload = async () => {
        if (errors.length) {
            alert("Please fix validation errors first");
            return;
        }

        try {
            setLoading(true);

            const formattedData = previewData.map((row) => {
                const item = {};
                headers.forEach((header, index) => {
                    item[header] = row[index];
                });
                return item;
            });

            const token = localStorage.getItem("token");

            if (!token) {
                alert("Admin authentication required");
                return;
            }

            const response = await axios.post(
                `${API_URL}/products/bulk-upload`,
                { products: formattedData },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            handleClose();
            onUpload();
        } catch (error) {
            console.error("Bulk Upload Error:", error.response?.data || error);
            alert(error.response?.data?.message || "Bulk upload failed");
        } finally {
            setLoading(false);
        }
    };

    // ===============================
    // CLOSE MODAL
    // ===============================
    const handleClose = () => {
        setFile(null);
        setPreviewData([]);
        setHeaders([]);
        setErrors([]);
        setDragActive(false);
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl max-w-6xl w-full max-h-[90vh] shadow-2xl flex flex-col">

                {/* HEADER */}
                <div className="bg-gradient-to-r from-[#162A78] to-[#1e3a9e] text-white p-6 flex justify-between items-center rounded-t-2xl">
                    <div>
                        <h2 className="text-2xl font-bold">Bulk Upload Products</h2>
                        <p className="text-blue-100 text-sm mt-1">Upload multiple products at once using CSV or Excel file</p>
                    </div>
                    <button 
                        onClick={handleClose}
                        className="hover:bg-white/20 p-2 rounded-lg transition-colors"
                    >
                        <X size={24} />
                    </button>
                </div>

                {/* CONTENT */}
                <div className="p-6 space-y-6 overflow-y-auto flex-1">

                    {/* DOWNLOAD TEMPLATE SECTION */}
                    <div className="bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-200 rounded-xl p-4">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="bg-green-500 p-2 rounded-lg">
                                    <FileSpreadsheet className="text-white" size={24} />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-green-900">Download Template First</h3>
                                    <p className="text-sm text-green-700">Use our pre-formatted template to ensure correct data structure</p>
                                </div>
                            </div>
                            <button
                                onClick={downloadTemplate}
                                className="flex items-center gap-2 px-5 py-2.5 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-colors shadow-md"
                            >
                                <Download size={18} />
                                Download Template
                            </button>
                        </div>
                    </div>

                    {/* FILE UPLOAD AREA */}
                    {!file && (
                        <div
                            onDragEnter={handleDrag}
                            onDragLeave={handleDrag}
                            onDragOver={handleDrag}
                            onDrop={handleDrop}
                            className={`border-3 border-dashed p-12 text-center rounded-xl transition-all ${
                                dragActive 
                                    ? "border-blue-600 bg-blue-50 scale-[1.02]" 
                                    : "border-gray-300 hover:border-gray-400 hover:bg-gray-50"
                            }`}
                        >
                            <div className="flex flex-col items-center gap-4">
                                <div className={`p-4 rounded-full ${dragActive ? 'bg-blue-100' : 'bg-gray-100'}`}>
                                    <Upload size={40} className={dragActive ? "text-blue-600" : "text-gray-400"} />
                                </div>
                                <div>
                                    <p className="text-lg font-semibold text-gray-700">
                                        {dragActive ? "Drop your file here" : "Drag & drop your file here"}
                                    </p>
                                    <p className="text-sm text-gray-500 mt-1">or</p>
                                </div>
                                <label className="cursor-pointer">
                                    <div className="px-6 py-3 bg-[#162A78] hover:bg-[#1e3a9e] text-white rounded-lg font-medium transition-colors">
                                        Browse Files
                                    </div>
                                    <input
                                        type="file"
                                        accept=".csv,.xlsx,.xls"
                                        onChange={(e) => handleFileChange(e.target.files[0])}
                                        className="hidden"
                                    />
                                </label>
                                <p className="text-xs text-gray-400">Supported formats: CSV, XLSX, XLS (Max 5MB)</p>
                            </div>
                        </div>
                    )}

                    {/* FILE INFO CARD */}
                    {file && (
                        <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-4">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="bg-blue-500 p-2 rounded-lg">
                                        <FileSpreadsheet className="text-white" size={20} />
                                    </div>
                                    <div>
                                        <p className="font-semibold text-blue-900">{file.name}</p>
                                        <p className="text-sm text-blue-600">
                                            {(file.size / 1024).toFixed(2)} KB • {previewData.length} rows detected
                                        </p>
                                    </div>
                                </div>
                                <button
                                    onClick={handleRemoveFile}
                                    className="p-2 hover:bg-red-100 rounded-lg transition-colors"
                                    title="Remove file"
                                >
                                    <Trash2 size={20} className="text-red-600" />
                                </button>
                            </div>
                        </div>
                    )}

                    {/* VALIDATION ERRORS */}
                    {errors.length > 0 && (
                        <div className="bg-red-50 border-2 border-red-300 rounded-xl p-4">
                            <div className="flex items-start gap-3">
                                <AlertCircle size={22} className="text-red-600 flex-shrink-0 mt-0.5" />
                                <div className="flex-1">
                                    <h4 className="font-semibold text-red-900 mb-2">Validation Errors</h4>
                                    <ul className="space-y-1">
                                        {errors.map((err, i) => (
                                            <li key={i} className="text-red-700 text-sm flex items-start gap-2">
                                                <span className="text-red-500">•</span>
                                                <span>{err}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* SUCCESS MESSAGE */}
                    {file && errors.length === 0 && (
                        <div className="bg-green-50 border-2 border-green-300 rounded-xl p-4">
                            <div className="flex items-center gap-3">
                                <CheckCircle size={22} className="text-green-600" />
                                <div>
                                    <h4 className="font-semibold text-green-900">File Validated Successfully</h4>
                                    <p className="text-sm text-green-700">
                                        {previewData.length} products ready to upload
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* DATA PREVIEW TABLE */}
                    {file && previewData.length > 0 && (
                        <div className="border-2 border-gray-200 rounded-xl overflow-hidden">
                            <div className="bg-gray-50 px-4 py-3 border-b-2 border-gray-200">
                                <h3 className="font-semibold text-gray-800">Data Preview</h3>
                                <p className="text-sm text-gray-600">
                                    Showing {Math.min(10, previewData.length)} of {previewData.length} rows
                                </p>
                            </div>
                            <div className="overflow-x-auto max-h-96">
                                <table className="w-full">
                                    <thead className="bg-[#162A78] text-white sticky top-0">
                                        <tr>
                                            <th className="px-4 py-3 text-left text-sm font-semibold border-r border-blue-600">
                                                #
                                            </th>
                                            {headers.map((header, index) => (
                                                <th
                                                    key={index}
                                                    className="px-4 py-3 text-left text-sm font-semibold border-r border-blue-600 last:border-r-0 whitespace-nowrap"
                                                >
                                                    {header}
                                                </th>
                                            ))}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {previewData.slice(0, 10).map((row, rowIndex) => (
                                            <tr
                                                key={rowIndex}
                                                className={`border-b border-gray-200 hover:bg-blue-50 transition-colors ${
                                                    rowIndex % 2 === 0 ? "bg-white" : "bg-gray-50"
                                                }`}
                                            >
                                                <td className="px-4 py-3 text-sm font-medium text-gray-600 border-r border-gray-200">
                                                    {rowIndex + 1}
                                                </td>
                                                {row.map((cell, cellIndex) => (
                                                    <td
                                                        key={cellIndex}
                                                        className="px-4 py-3 text-sm text-gray-700 border-r border-gray-200 last:border-r-0"
                                                    >
                                                        {cell !== undefined && cell !== null && cell !== "" 
                                                            ? String(cell) 
                                                            : <span className="text-gray-400 italic">—</span>
                                                        }
                                                    </td>
                                                ))}
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            {previewData.length > 10 && (
                                <div className="bg-gray-50 px-4 py-2 text-center border-t border-gray-200">
                                    <p className="text-sm text-gray-600">
                                        + {previewData.length - 10} more rows...
                                    </p>
                                </div>
                            )}
                        </div>
                    )}
                </div>

                {/* FOOTER */}
                <div className="border-t-2 border-gray-200 p-6 flex justify-between items-center bg-gray-50 rounded-b-2xl">
                    <div className="text-sm text-gray-600">
                        {file && (
                            <span className="font-medium">
                                Ready to upload: <span className="text-blue-600">{previewData.length} products</span>
                            </span>
                        )}
                    </div>
                    <div className="flex gap-3">
                        <button
                            onClick={handleClose}
                            className="px-6 py-2.5 border-2 border-gray-300 hover:bg-gray-100 rounded-lg font-medium transition-colors"
                        >
                            Cancel
                        </button>

                        <button
                            onClick={handleUpload}
                            disabled={!file || errors.length > 0 || loading}
                            className="px-6 py-2.5 bg-[#162A78] hover:bg-[#1e3a9e] text-white rounded-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-md flex items-center gap-2"
                        >
                            {loading ? (
                                <>
                                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                    Uploading...
                                </>
                            ) : (
                                <>
                                    <Upload size={18} />
                                    Upload {previewData.length} Products
                                </>
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}