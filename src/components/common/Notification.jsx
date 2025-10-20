import { useNotification } from "../../hooks/useNotification";

export default function Notification() {
  const { notification } = useNotification();

  if (!notification) return null;

  return (
    <div
      className={`fixed top-5 right-5 p-3 rounded-lg shadow-md text-white ${
        notification.type === "error" ? "bg-red-500" : "bg-green-500"
      }`}
    >
      {notification.message}
    </div>
  );
}
