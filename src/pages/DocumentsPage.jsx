import { useState } from "react";
import DocumentUpload from "../components/documents/DocumentUpload";
import DocumentList from "../components/documents/DocumentList";

export default function DocumentsPage() {
  const [documents, setDocuments] = useState([]);

  return (
    <div className="p-4">
      <DocumentUpload onUploadComplete={(docs) => setDocuments(docs)} />
      <DocumentList documents={documents} />
    </div>
  );
}
