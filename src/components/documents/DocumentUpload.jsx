import { useState, useRef } from 'react';
import { Upload, FileText, X, AlertCircle } from 'lucide-react';

export default function DocumentUpload({ onUpload, isLoading }) {
  const [dragActive, setDragActive] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const fileInputRef = useRef(null);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const handleChange = (e) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      handleFiles(e.target.files);
    }
  };

  const handleFiles = (files) => {
    const fileArray = Array.from(files);
    const validFiles = fileArray.filter(file => {
      const ext = file.name.split('.').pop().toLowerCase();
      return ['pdf', 'txt', 'doc', 'docx'].includes(ext);
    });

    if (validFiles.length !== fileArray.length) {
      alert('Some files were skipped. Only PDF, TXT, DOC, and DOCX files are allowed.');
    }

    setSelectedFiles(prev => [...prev, ...validFiles]);
  };

  const removeFile = (index) => {
    setSelectedFiles(files => files.filter((_, i) => i !== index));
  };

  const handleUpload = () => {
    if (selectedFiles.length > 0) {
      onUpload(selectedFiles);
      setSelectedFiles([]);
    }
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 space-y-4">
      <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
        <Upload className="w-5 h-5 text-blue-600" />
        Upload Documents
      </h2>

      {/* Drag and Drop Area */}
      <div
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        className={`relative border-2 border-dashed rounded-xl p-8 transition-all ${
          dragActive
            ? 'border-blue-500 bg-blue-50'
            : 'border-gray-300 bg-gray-50 hover:bg-gray-100'
        }`}
      >
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept=".pdf,.txt,.doc,.docx"
          onChange={handleChange}
          className="hidden"
        />

        <div className="text-center space-y-4">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full">
            <Upload className="w-8 h-8 text-blue-600" />
          </div>

          <div>
            <p className="text-lg font-medium text-gray-900">
              Drag and drop files here
            </p>
            <p className="text-sm text-gray-600 mt-1">
              or click to browse from your computer
            </p>
          </div>

          <button
            onClick={() => fileInputRef.current?.click()}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium"
            disabled={isLoading}
          >
            Browse Files
          </button>

          <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
            <AlertCircle className="w-4 h-4" />
            <span>Supported: PDF, TXT, DOC, DOCX (Max 10MB)</span>
          </div>
        </div>
      </div>

      {/* Selected Files */}
      {selectedFiles.length > 0 && (
        <div className="space-y-3">
          <h3 className="text-sm font-medium text-gray-700">
            Selected Files ({selectedFiles.length})
          </h3>
          
          <div className="space-y-2 max-h-48 overflow-y-auto">
            {selectedFiles.map((file, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-200"
              >
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  <FileText className="w-5 h-5 text-blue-600 flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {file.name}
                    </p>
                    <p className="text-xs text-gray-500">
                      {formatFileSize(file.size)}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => removeFile(index)}
                  className="p-1 text-gray-400 hover:text-red-600 transition"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            ))}
          </div>

          <button
            onClick={handleUpload}
            disabled={isLoading}
            className="w-full px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:from-blue-700 hover:to-indigo-700 transition font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Uploading...
              </>
            ) : (
              <>
                <Upload className="w-5 h-5" />
                Upload {selectedFiles.length} File{selectedFiles.length !== 1 ? 's' : ''}
              </>
            )}
          </button>
        </div>
      )}
    </div>
  );
}