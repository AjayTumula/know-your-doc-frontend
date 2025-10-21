import { useState, useEffect } from "react";
import DocumentList from "../components/documents/DocumentList";
import DocumentUpload from "../components/documents/DocumentUpload";
import DocumentSearch from "../components/documents/DocumentSearch";
import { useNotification } from "../hooks/useNotification";
import { documentService } from "../services/documentService";

export default function DocumentsPage() {
  const [documents, setDocuments] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { showNotification } = useNotification();

  // ✅ Load documents when page mounts
  useEffect(() => {
    loadDocuments();
  }, []);

  // ✅ Fetch documents from backend
  const loadDocuments = async () => {
    setIsLoading(true);
    try {
      const response = await documentService.getDocuments();
      setDocuments(response);
    } catch (error) {
      console.error("Failed to load documents:", error);
      showNotification("Failed to load documents", "error");
    } finally {
      setIsLoading(false);
    }
  };

  // ✅ Upload new documents
  const handleUpload = async (files) => {
    setIsLoading(true);
    try {
      const uploadedDocs = await documentService.uploadDocuments(files);
      setDocuments((prevDocs) => [...uploadedDocs, ...prevDocs]);
      showNotification(
        `${files.length} document(s) uploaded successfully`,
        "success"
      );
    } catch (error) {
      console.error("Upload failed:", error);
      showNotification("Failed to upload documents", "error");
    } finally {
      setIsLoading(false);
    }
  };

  // ✅ Delete a document
  const handleDelete = async (docId) => {
    try {
      await documentService.deleteDocument(docId);
      setDocuments((docs) => docs.filter((doc) => doc.id !== docId));
      showNotification("Document deleted successfully", "info");
    } catch (error) {
      console.error("Delete failed:", error);
      showNotification("Failed to delete document", "error");
    }
  };

  // ✅ Filter search results
  const filteredDocuments = documents.filter((doc) =>
    doc.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // ✅ UI
  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Document Library</h1>
            <p className="text-gray-600 mt-1">
              Upload and manage your knowledge base documents
            </p>
          </div>
          <div className="flex items-center gap-3">
            <div className="text-right">
              <p className="text-2xl font-bold text-blue-600">
                {documents.length}
              </p>
              <p className="text-xs text-gray-500">Documents</p>
            </div>
          </div>
        </div>
      </div>

      {/* Upload Section */}
      <DocumentUpload onUpload={handleUpload} isLoading={isLoading} />

      {/* Search */}
      <DocumentSearch
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />

      {/* Documents List */}
      <DocumentList
        documents={filteredDocuments}
        onDelete={handleDelete}
        isLoading={isLoading}
      />
    </div>
  );
}
