export default function DocumentCard({ doc }) {
  return (
    <div className="p-4 border rounded-lg bg-white shadow">
      <h3 className="font-bold">{doc.name}</h3>
      <p className="text-sm text-gray-600">{doc.size} bytes</p>
      <p className="text-sm text-green-600">{doc.status}</p>
    </div>
  );
}
