import { useNavigate, useLocation } from 'react-router-dom';
import { MessageSquare, FileText, BookOpen } from 'lucide-react';

export default function Layout({ children }) {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path || location.pathname.startsWith(path);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">AI Knowledge Base</h1>
                <p className="text-xs text-gray-500">RAG-powered Q&A System</p>
              </div>
            </div>

            {/* Navigation */}
            <nav className="flex items-center gap-2">
              <button
                onClick={() => navigate('/documents')}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition font-medium ${
                  isActive('/documents')
                    ? 'bg-blue-50 text-blue-600'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <FileText className="w-5 h-5" />
                <span className="hidden sm:inline">Documents</span>
              </button>
              
              <button
                onClick={() => navigate('/chat')}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition font-medium ${
                  isActive('/chat')
                    ? 'bg-blue-50 text-blue-600'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <MessageSquare className="w-5 h-5" />
                <span className="hidden sm:inline">Chat</span>
              </button>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="min-h-[calc(100vh-64px)]">
        {children}
      </main>
    </div>
  );
}