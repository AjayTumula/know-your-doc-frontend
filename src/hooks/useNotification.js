// import { useContext } from "react";
// import { NotificationContext } from "../context/NotificationContext";

// export const useNotification = () => useContext(NotificationContext);



import { useNotificationContext } from "../context/NotificationContext";

export const useNotification = () => {
  return useNotificationContext();
};
