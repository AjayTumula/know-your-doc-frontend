import { useAuth } from "../../hooks/useAuth";

export default function Header() {
  const { user, logout } = useAuth();
  return (
    <header className="bg-blue-600 text-white p-4 flex justify-between items-center">
      <h1 className="text-lg font-bold">AI Knowledge Base</h1>
      {user && (
        <button onClick={logout} className="text-sm underline">
          Logout
        </button>
      )}
    </header>
  );
}
