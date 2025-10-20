import { useState } from "react";
import { uploadDocuments } from "../../services/documentService";
import Button from "../common/Button";
import { useNotification } from "../../hooks/useNotification";

export default function DocumentUpload({ onUploadComplete }) {
  const [files, setFiles] = useState([]);
  const { notify } = useNotification();

  const handleUpload = async () => {
    const res = await uploadDocuments(files);
    notify("Documents uploaded successfully", "success");
    onUploadComplete(res);
  };

  return (
    <div className="flex items-center space-x-2">
      <input type="file" multiple onChange={(e) => setFiles(e.target.files)} />
      <Button onClick={handleUpload}>Upload</Button>
    </div>
  );
}
