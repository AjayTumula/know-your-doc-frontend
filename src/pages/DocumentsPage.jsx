import { useState, useEffect } from 'react';
import DocumentList from '../components/documents/DocumentList';
import DocumentUpload from '../components/documents/DocumentUpload';
import DocumentSearch from '../components/documents/DocumentSearch';
import { useNotification } from '../hooks/useNotification';

export default function DocumentsPage() {
  const [documents, setDocuments] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { showNotification } = useNotification();

  // Load documents on mount
  useEffect(() => {
    loadDocuments();
  }, []);

  const loadDocuments = async () => {
    setIsLoading(true);
    try {
      // TODO: Replace with actual API call
      // const response = await documentService.getDocuments();
      // setDocuments(response.data);
      
      // Mock data for now
      setDocuments([
        {
          id: '1',
          name: 'Company Handbook.pdf',
          file_type: '.pdf',
          file_size: 2048000,
          status: 'completed',
          chunks_count: 45,
          created_at: new Date().toISOString()
        },
        {
          id: '2',
          name: 'HR Policies.docx',
          file_type: '.docx',
          file_size: 1024000,
          status: 'completed',
          chunks_count: 32,
          created_at: new Date().toISOString()
        }
      ]);
    } catch (error) {
      showNotification('Failed to load documents', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpload = async (files) => {
    setIsLoading(true);
    try {
      // TODO: Replace with actual API call
      // await documentService.uploadDocuments(files);
      
      // Mock upload
      const newDocs = Array.from(files).map((file, idx) => ({
        id: Date.now() + idx,
        name: file.name,
        file_type: file.name.split('.').pop(),
        file_size: file.size,
        status: 'processing',
        chunks_count: 0,
        created_at: new Date().toISOString()
      }));

      setDocuments([...newDocs, ...documents]);
      showNotification(`${files.length} document(s) uploaded successfully`, 'success');

      // Simulate processing
      setTimeout(() => {
        setDocuments(prev => 
          prev.map(doc => 
            newDocs.find(nd => nd.id === doc.id)
              ? { ...doc, status: 'completed', chunks_count: Math.floor(Math.random() * 50) + 10 }
              : doc
          )
        );
      }, 2000);
    } catch (error) {
      showNotification('Failed to upload documents', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (docId) => {
    try {
      // TODO: Replace with actual API call
      // await documentService.deleteDocument(docId);
      
      setDocuments(documents.filter(doc => doc.id !== docId));
      showNotification('Document deleted successfully', 'info');
    } catch (error) {
      showNotification('Failed to delete document', 'error');
    }
  };

  const filteredDocuments = documents.filter(doc =>
    doc.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
              <p className="text-2xl font-bold text-blue-600">{documents.length}</p>
              <p className="text-xs text-gray-500">Documents</p>
            </div>
          </div>
        </div>
      </div>

      {/* Upload Section */}
      <DocumentUpload onUpload={handleUpload} isLoading={isLoading} />

      {/* Search */}
      <DocumentSearch searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

      {/* Documents List */}
      <DocumentList
        documents={filteredDocuments}
        onDelete={handleDelete}
        isLoading={isLoading}
      />
    </div>
  );
}