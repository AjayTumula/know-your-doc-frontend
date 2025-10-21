import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import ChatPage from "./pages/ChatPage";
import DocumentsPage from "./pages/DocumentsPage";
import Layout from "./components/layout/Layout";

function App() {
  return (
    <Router>
      <Routes>
        {/* Documents page as default */}
        <Route
          path="/"
          element={
            <Layout>
              <DocumentsPage />
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
        <Route
          path="/chat"
          element={
            <Layout>
              <ChatPage />
            </Layout>
          }
        />
        {/* Redirect unknown routes to documents */}
        <Route path="*" element={<Navigate to="/documents" />} />
      </Routes>
    </Router>
  );
}

export default App;