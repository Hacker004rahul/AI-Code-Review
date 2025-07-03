import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, Send, Bot, User, Sparkles, X, Minimize2, Maximize2 } from 'lucide-react';
import { GoogleGenerativeAI } from '@google/generative-ai';

const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const genAI = GEMINI_API_KEY ? new GoogleGenerativeAI(GEMINI_API_KEY) : null;

const AIChat = ({ isOpen, onClose, code, language, theme }) => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'bot',
      content: "Hi! I'm CodeGenie 🧞‍♂️, your magical coding assistant powered by Gemini AI. Ask me anything about your code or programming in general!",
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  const isDarkTheme = theme === 'dark';

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && !isMinimized && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen, isMinimized]);

  const generateAIResponse = async (question, code, language) => {
    if (!genAI || !GEMINI_API_KEY) {
      return "I'm sorry, but I need a Gemini API key to provide intelligent responses. Please configure your API key in the .env file to unlock my full magical powers! 🧞‍♂️✨";
    }

    try {
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
      
      let prompt = `You are CodeGenie, an expert programming assistant and code reviewer. You're helpful, knowledgeable, friendly, and magical! You can help users with anything they ask, and you can also chat with them. Always maintain a friendly, encouraging tone and occasionally use genie/magic-themed emojis (🧞‍♂️, ✨, 🪄, 💫) but don't overdo it.

User's question: "${question}"

Context:
- Current programming language: ${language}
- User has code in the editor: ${code ? 'Yes' : 'No'}

${code ? `Current code:
\`\`\`${language}
${code}
\`\`\`

` : ''}

Instructions:
1. If the question is about the current code, analyze it and provide specific advice
2. If it's a general programming question, provide helpful explanations with examples
3. If it's about code review, focus on best practices, performance, and security
4. If it's a casual conversation, be friendly but try to relate it back to programming
5. Keep responses concise but informative (max 200 words)
6. Use markdown formatting for code examples
7. Be encouraging and supportive
8. Be always friendly and talk like a helpful coding genie
9. Occasionally use magic/genie themed language but keep it professional

Respond naturally and helpfully as CodeGenie:`;

      const result = await model.generateContent(prompt);
      const response = await result.response;
      return response.text();
    } catch (error) {
      console.error('Gemini API error:', error);
      return "Oops! My magic lamp seems to be having connection issues right now 🧞‍♂️💫 Please try again in a moment!";
    }
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage = {
      id: Date.now(),
      type: 'user',
      content: inputMessage,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    const currentMessage = inputMessage;
    setInputMessage('');
    setIsTyping(true);

    try {
      const aiResponse = await generateAIResponse(currentMessage, code, language);
      
      const botResponse = {
        id: Date.now() + 1,
        type: 'bot',
        content: aiResponse,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, botResponse]);
    } catch (error) {
      const errorResponse = {
        id: Date.now() + 1,
        type: 'bot',
        content: "Sorry, I encountered an error while processing your request. Even genies have off days! 🧞‍♂️ Please try again!",
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorResponse]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const clearChat = () => {
    setMessages([
      {
        id: 1,
        type: 'bot',
        content: "Chat cleared! ✨ How can CodeGenie help you with your code or programming questions?",
        timestamp: new Date()
      }
    ]);
  };

  const handleQuickAction = (action) => {
    if (!code && (action.includes("this code") || action.includes("bugs") || action.includes("performance"))) {
      setInputMessage(`${action} (Note: No code is currently in the editor)`);
    } else {
      setInputMessage(action);
    }
  };

  if (!isOpen) return null;

  return (
    <motion.div
      className="fixed inset-0 bg-black/50 z-50 flex items-end justify-end p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose} // Click backdrop to close
    >
      <motion.div
        className={`w-96 rounded-2xl shadow-2xl border backdrop-blur-xl overflow-hidden ${
          isDarkTheme 
            ? 'bg-gray-800/95 border-gray-700' 
            : 'bg-white/95 border-gray-200'
        } ${isMinimized ? 'h-16' : 'h-[600px]'}`}
        initial={{ x: 400, y: 100, scale: 0.8 }}
        animate={{ x: 0, y: 0, scale: 1 }}
        exit={{ x: 400, y: 100, scale: 0.8 }}
        transition={{ type: "spring", damping: 25, stiffness: 200 }}
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
      >
        {/* Enhanced Header with CodeGenie Branding */}
        <div className={`p-4 border-b flex items-center justify-between ${
          isDarkTheme ? 'border-gray-700 bg-gray-800/50' : 'border-gray-200 bg-gray-50/50'
        }`}>
          <div className="flex items-center space-x-3">
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="relative"
            >
              <div className="w-10 h-10 bg-gradient-to-r from-purple-500 via-blue-500 to-cyan-500 rounded-full flex items-center justify-center shadow-lg">
                <span className="text-lg">🧞‍♂️</span>
              </div>
              <motion.div
                className={`absolute -top-1 -right-1 w-4 h-4 rounded-full border-2 border-white ${
                  GEMINI_API_KEY ? 'bg-green-400' : 'bg-red-400'
                }`}
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
            </motion.div>
            <div>
              <h3 className={`font-bold ${
                isDarkTheme ? 'text-gray-100' : 'text-gray-800'
              }`}>CodeGenie ✨</h3>
              <p className={`text-xs ${
                isDarkTheme ? 'text-gray-400' : 'text-gray-500'
              }`}>
                {isTyping ? 'Casting magic...' : GEMINI_API_KEY ? 'Ready to help!' : 'API Key Needed'}
              </p>
            </div>
          </div>
          
          {/* Header Controls with Enhanced Close Button */}
          <div className="flex items-center space-x-1">
            <motion.button
              onClick={clearChat}
              className={`px-3 py-1.5 rounded-lg transition-all text-xs font-medium ${
                isDarkTheme 
                  ? 'hover:bg-gray-700 text-gray-400 hover:text-gray-200' 
                  : 'hover:bg-gray-100 text-gray-600 hover:text-gray-800'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              title="Clear chat"
            >
              Clear
            </motion.button>
            
            <motion.button
              onClick={() => setIsMinimized(!isMinimized)}
              className={`p-2 rounded-lg transition-all ${
                isDarkTheme 
                  ? 'hover:bg-gray-700 text-gray-400 hover:text-gray-200' 
                  : 'hover:bg-gray-100 text-gray-600 hover:text-gray-800'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              title={isMinimized ? "Maximize" : "Minimize"}
            >
              {isMinimized ? <Maximize2 className="w-4 h-4" /> : <Minimize2 className="w-4 h-4" />}
            </motion.button>
            
            {/* Enhanced Close Button - More Prominent */}
            <motion.button
              onClick={onClose}
              className={`p-2 rounded-lg transition-all border-2 ${
                isDarkTheme 
                  ? 'border-red-500/30 bg-red-500/10 hover:bg-red-500/20 text-red-400 hover:text-red-300 hover:border-red-400' 
                  : 'border-red-300 bg-red-50 hover:bg-red-100 text-red-600 hover:text-red-700 hover:border-red-400'
              }`}
              whileHover={{ 
                scale: 1.1,
                boxShadow: isDarkTheme 
                  ? '0 0 20px rgba(239, 68, 68, 0.3)' 
                  : '0 0 20px rgba(239, 68, 68, 0.2)'
              }}
              whileTap={{ scale: 0.9 }}
              title="Close CodeGenie"
            >
              <X className="w-5 h-5" />
            </motion.button>
          </div>
        </div>

        {/* Messages Container - Only show when not minimized */}
        <AnimatePresence>
          {!isMinimized && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="flex flex-col h-full"
            >
              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4 max-h-[450px] custom-scrollbar">
                <AnimatePresence>
                  {messages.map((message) => (
                    <motion.div
                      key={message.id}
                      className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                      initial={{ opacity: 0, y: 20, scale: 0.8 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -20, scale: 0.8 }}
                      transition={{ type: "spring", damping: 20, stiffness: 200 }}
                    >
                      <div className={`flex items-start space-x-2 max-w-[85%] ${
                        message.type === 'user' ? 'flex-row-reverse space-x-reverse' : ''
                      }`}>
                        <motion.div 
                          className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                            message.type === 'user' 
                              ? 'bg-gradient-to-r from-blue-500 to-blue-600' 
                              : 'bg-gradient-to-r from-purple-500 via-blue-500 to-cyan-500'
                          }`}
                          whileHover={{ scale: 1.1 }}
                        >
                          {message.type === 'user' ? 
                            <User className="w-4 h-4 text-white" /> : 
                            <span className="text-sm">🧞‍♂️</span>
                          }
                        </motion.div>
                        <motion.div 
                          className={`p-3 rounded-2xl shadow-sm ${
                            message.type === 'user'
                              ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white'
                              : isDarkTheme
                                ? 'bg-gray-700/80 text-gray-100 border border-gray-600'
                                : 'bg-gray-100 text-gray-800 border border-gray-200'
                          }`}
                          whileHover={{ scale: 1.02 }}
                        >
                          <div className="text-sm leading-relaxed whitespace-pre-wrap">
                            {message.content}
                          </div>
                          <p className={`text-xs mt-2 opacity-70`}>
                            {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </p>
                        </motion.div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>

                {/* Enhanced Typing Indicator */}
                {isTyping && (
                  <motion.div
                    className="flex justify-start"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                  >
                    <div className="flex items-center space-x-2">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 via-blue-500 to-cyan-500 flex items-center justify-center">
                        <span className="text-sm">🧞‍♂️</span>
                      </div>
                      <div className={`p-3 rounded-2xl ${
                        isDarkTheme ? 'bg-gray-700/80 border border-gray-600' : 'bg-gray-100 border border-gray-200'
                      }`}>
                        <div className="flex space-x-1 items-center">
                          <span className="text-xs text-purple-500 mr-2">✨</span>
                          {[0, 1, 2].map((i) => (
                            <motion.div
                              key={i}
                              className="w-2 h-2 bg-purple-500 rounded-full"
                              animate={{ 
                                scale: [1, 1.5, 1],
                                opacity: [0.5, 1, 0.5]
                              }}
                              transition={{ 
                                duration: 1.2, 
                                repeat: Infinity, 
                                delay: i * 0.2,
                                ease: "easeInOut"
                              }}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Enhanced Input */}
              <div className={`p-4 border-t ${
                isDarkTheme ? 'border-gray-700 bg-gray-800/30' : 'border-gray-200 bg-gray-50/30'
              }`}>
                <div className="flex space-x-3">
                  <div className="flex-1 relative">
                    <textarea
                      ref={inputRef}
                      value={inputMessage}
                      onChange={(e) => setInputMessage(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder="Ask CodeGenie anything about programming... 🧞‍♂️✨"
                      rows={1}
                      className={`w-full p-3 pr-12 rounded-xl border resize-none focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all ${
                        isDarkTheme 
                          ? 'bg-gray-700/50 border-gray-600 text-gray-100 placeholder-gray-400' 
                          : 'bg-white border-gray-300 text-gray-800 placeholder-gray-500'
                      }`}
                      style={{ minHeight: '44px', maxHeight: '120px' }}
                      onInput={(e) => {
                        e.target.style.height = 'auto';
                        e.target.style.height = Math.min(e.target.scrollHeight, 120) + 'px';
                      }}
                    />
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-xs text-gray-400">
                      {inputMessage.length}/500
                    </div>
                  </div>
                  <motion.button
                    onClick={handleSendMessage}
                    disabled={!inputMessage.trim() || isTyping}
                    className="p-3 bg-gradient-to-r from-purple-500 via-blue-500 to-cyan-500 text-white rounded-xl disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg"
                    whileHover={{ scale: 1.05, boxShadow: "0 10px 20px rgba(139, 92, 246, 0.3)" }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Send className="w-5 h-5" />
                  </motion.button>
                </div>
                
                {/* Enhanced Quick Actions */}
                <div className="flex flex-wrap gap-2 mt-3">
                  {[
                    code ? "Explain this code" : "How to write clean code?",
                    code ? "Find bugs" : "Best practices for " + language,
                    code ? "Optimize performance" : "Learn " + language,
                    "Code review tips"
                  ].map((action, index) => (
                    <motion.button
                      key={action}
                      onClick={() => handleQuickAction(action)}
                      className={`px-3 py-1 rounded-full text-xs transition-all ${
                        isDarkTheme 
                          ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' 
                          : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
                      }`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      {action}
                    </motion.button>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
};

export default AIChat;