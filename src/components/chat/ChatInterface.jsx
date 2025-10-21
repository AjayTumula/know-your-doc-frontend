import { useState, useEffect, useRef } from 'react';
import { Send, Loader2, Zap, User, Bot, FileText } from 'lucide-react';
import { useNotification } from '../../hooks/useNotification';
import { chatService } from '../../services/chatService'; // ✅ Real API

export default function ChatInterface() {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const chatEndRef = useRef(null);
  const { showNotification } = useNotification();

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const suggestedQuestions = [
    'What is our leave policy?',
    'How do I submit expenses?',
    'What are the remote work guidelines?',
    'Tell me about our health insurance',
  ];

  // ✅ Real backend query (not mock)
  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage = {
      id: Date.now(),
      text: inputMessage,
      sender: 'user',
      timestamp: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);

    try {
      const response = await chatService.askQuestion(inputMessage);

      const aiMessage = {
        id: Date.now() + 1,
        text: response.answer || 'No response generated.',
        sender: 'ai',
        timestamp: new Date().toISOString(),
        sources: response.sources || [],
      };

      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      console.error('Chat error:', error);
      showNotification('Failed to get response from backend', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSuggestedQuestion = (question) => {
    setInputMessage(question);
  };

  return (
    <div className="max-w-5xl mx-auto h-full flex flex-col p-4 sm:p-6">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden flex-1 flex flex-col">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-4">
          <h2 className="text-xl font-semibold text-white flex items-center gap-2">
            <Bot className="w-6 h-6" />
            Ask Questions About Your Documents
          </h2>
          <p className="text-blue-100 text-sm mt-1">
            Powered by RAG • AI-assisted knowledge retrieval
          </p>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-gray-50">
          {messages.length === 0 ? (
            <div className="text-center py-12">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
                <Zap className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Start a conversation
              </h3>
              <p className="text-gray-600 text-sm mb-6">
                Ask anything about your uploaded documents
              </p>

              {/* Suggested Questions */}
              <div className="flex flex-wrap gap-2 justify-center max-w-2xl mx-auto">
                {suggestedQuestions.map((question, index) => (
                  <button
                    key={index}
                    onClick={() => handleSuggestedQuestion(question)}
                    className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm text-gray-700 hover:border-blue-300 hover:bg-blue-50 transition"
                  >
                    {question}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <>
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${
                    msg.sender === 'user' ? 'justify-end' : 'justify-start'
                  }`}
                >
                  <div
                    className={`flex items-start gap-3 max-w-2xl ${
                      msg.sender === 'user' ? 'flex-row-reverse' : ''
                    }`}
                  >
                    {/* Avatar */}
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                        msg.sender === 'user'
                          ? 'bg-blue-600'
                          : 'bg-gradient-to-r from-purple-600 to-indigo-600'
                      }`}
                    >
                      {msg.sender === 'user' ? (
                        <User className="w-5 h-5 text-white" />
                      ) : (
                        <Bot className="w-5 h-5 text-white" />
                      )}
                    </div>

                    {/* Message Content */}
                    <div
                      className={`rounded-2xl px-4 py-3 shadow-sm ${
                        msg.sender === 'user'
                          ? 'bg-blue-600 text-white'
                          : 'bg-white border border-gray-200'
                      }`}
                    >
                      <p
                        className={`text-sm ${
                          msg.sender === 'user'
                            ? 'text-white'
                            : 'text-gray-900'
                        }`}
                      >
                        {msg.text}
                      </p>

                      {/* Sources */}
                      {msg.sources && msg.sources.length > 0 && (
                        <div className="mt-3 pt-3 border-t border-gray-200">
                          <p className="text-xs text-gray-500 mb-2 font-medium">
                            Sources:
                          </p>
                          <div className="space-y-1">
                            {msg.sources.map((source, idx) => (
                              <div
                                key={idx}
                                className="flex items-center gap-2 text-xs bg-gray-50 px-2 py-1 rounded"
                              >
                                <FileText className="w-3 h-3 text-gray-500" />
                                <span className="text-gray-700 flex-1">
                                  {source.document_name}
                                </span>
                                {source.similarity_score && (
                                  <span className="text-gray-500">
                                    {Math.round(source.similarity_score * 100)}%
                                  </span>
                                )}
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}

              {/* Loading indicator */}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="flex items-start gap-3 max-w-2xl">
                    <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 bg-gradient-to-r from-purple-600 to-indigo-600">
                      <Bot className="w-5 h-5 text-white" />
                    </div>
                    <div className="bg-white border border-gray-200 rounded-2xl px-4 py-3">
                      <div className="flex items-center gap-2">
                        <Loader2 className="w-4 h-4 animate-spin text-blue-600" />
                        <span className="text-sm text-gray-600">
                          Analyzing documents...
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <div ref={chatEndRef} />
            </>
          )}
        </div>

        {/* Input */}
        <div className="p-4 bg-white border-t border-gray-200">
          <div className="flex gap-2">
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={(e) =>
                e.key === 'Enter' && !isLoading && handleSendMessage()
              }
              placeholder="Ask a question about your documents..."
              className="flex-1 px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              disabled={isLoading}
            />
            <button
              onClick={handleSendMessage}
              disabled={isLoading || !inputMessage.trim()}
              className="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:from-blue-700 hover:to-indigo-700 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
