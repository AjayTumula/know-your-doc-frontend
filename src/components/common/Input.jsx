export default function Input({ label, type = "text", value, onChange }) {
  return (
    <div className="flex flex-col space-y-1">
      <label className="text-sm font-medium">{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="border p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
    </div>
  );
}
