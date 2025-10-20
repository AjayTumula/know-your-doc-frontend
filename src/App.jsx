import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import ChatPage from "./pages/ChatPage";
import DocumentsPage from "./pages/DocumentsPage";
import Layout from "./components/layout/Layout";
import { useAuth } from "./hooks/useAuth";

function App() {
  const { user } = useAuth();

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        {user ? (
          <>
            <Route
              path="/chat"
              element={
                <Layout>
                  <ChatPage />
                </Layout>
              }
            />
            <Route
              path="/documents"
              element={
                <Layout>
                  <DocumentsPage />
                </Layout>
              }
            />
            <Route path="*" element={<Navigate to="/chat" />} />
          </>
        ) : (
          <Route path="*" element={<Navigate to="/login" />} />
        )}
      </Routes>
    </Router>
  );
}

export default App;
