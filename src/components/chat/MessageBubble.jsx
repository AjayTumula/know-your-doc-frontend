export default function MessageBubble({ sender, text, sources }) {
  return (
    <div className={`p-3 rounded-lg ${sender === "user" ? "bg-blue-100 self-end" : "bg-gray-100 self-start"}`}>
      <p>{text}</p>
      {sources && (
        <p className="text-xs text-gray-500 mt-1">
          Sources: {sources.join(", ")}
        </p>
      )}
    </div>
  );
}
