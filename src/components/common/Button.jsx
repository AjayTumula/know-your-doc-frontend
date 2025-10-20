export default function Button({ children, onClick, type = "button", disabled }) {
  return (
    <button
      onClick={onClick}
      type={type}
      disabled={disabled}
      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
    >
      {children}
    </button>
  );
}
