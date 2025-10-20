import DocumentCard from "./DocumentCard";

export default function DocumentList({ documents }) {
  return (
    <div className="grid grid-cols-3 gap-4 mt-4">
      {documents.map((doc) => (
        <DocumentCard key={doc.id} doc={doc} />
      ))}
    </div>
  );
}
