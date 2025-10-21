import { createContext, useContext, useState, useCallback } from "react";

const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
  const [notification, setNotification] = useState(null);

  const showNotification = useCallback((message, type = "info") => {
    setNotification({ message, type });

    // Hide after 3 seconds
    setTimeout(() => setNotification(null), 3000);
  }, []);

  return (
    <NotificationContext.Provider value={{ showNotification }}>
      {children}
      {notification && (
        <div
          className={`fixed bottom-6 right-6 px-4 py-3 rounded-xl shadow-lg text-white transition-all duration-300 ${
            notification.type === "error"
              ? "bg-red-500"
              : notification.type === "success"
              ? "bg-green-500"
              : "bg-blue-500"
          }`}
        >
          {notification.message}
        </div>
      )}
    </NotificationContext.Provider>
  );
};

export const useNotificationContext = () => useContext(NotificationContext);
