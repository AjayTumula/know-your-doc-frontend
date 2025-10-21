import { Search } from "lucide-react";

export default function DocumentSearch({ searchQuery, setSearchQuery }) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-4 flex items-center gap-3">
      <Search className="text-gray-400 w-5 h-5" />
      <input
        type="text"
        placeholder="Search documents..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="flex-1 outline-none text-gray-700 placeholder-gray-400"
      />
    </div>
  );
}
