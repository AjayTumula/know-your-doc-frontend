import Header from "./Header";
import Notification from "../common/Notification";

export default function Layout({ children }) {
  return (
    <div className="h-screen flex flex-col">
      <Header />
      <Notification />
      <main className="flex-1 bg-gray-50">{children}</main>
    </div>
  );
}
