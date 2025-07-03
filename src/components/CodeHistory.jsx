import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { History, Clock, GitBranch, RotateCcw, Trash2 } from 'lucide-react';

const CodeHistory = ({ theme }) => {
  const [history, setHistory] = useState([
    {
      id: 1,
      timestamp: new Date(Date.now() - 1000 * 60 * 5),
      language: 'javascript',
      score: 85,
      preview: 'function fibonacci(n) {\n  if (n <= 1) return n;...',
      changes: ['Fixed variable declarations', 'Added error handling']
    },
    {
      id: 2,
      timestamp: new Date(Date.now() - 1000 * 60 * 15),
      language: 'python',
      score: 92,
      preview: 'def binary_search(arr, target):\n    left, right = 0...',
      changes: ['Optimized algorithm', 'Added type hints']
    },
    {
      id: 3,
      timestamp: new Date(Date.now() - 1000 * 60 * 30),
      language: 'javascript',
      score: 78,
      preview: 'const users = [\n  { name: "John", age: 25 }...',
      changes: ['Modernized syntax', 'Improved readability']
    }
  ]);

  const isDarkTheme = theme === 'dark';

  const restoreVersion = (id) => {
    console.log('Restoring version:', id);
  };

  const deleteVersion = (id) => {
    setHistory(prev => prev.filter(item => item.id !== id));
  };

  const getScoreColor = (score) => {
    if (score >= 90) return 'text-green-500';
    if (score >= 80) return 'text-blue-500';
    if (score >= 70) return 'text-yellow-500';
    return 'text-red-500';
  };

  return (
    <motion.div
      className={`rounded-2xl shadow-2xl p-6 border backdrop-blur-xl transition-all duration-500 ${
        isDarkTheme 
          ? 'bg-gray-800/80 border-gray-700/50' 
          : 'bg-white/80 border-gray-200/50'
      }`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -2 }}
    >
      <div className="flex items-center mb-6">
        <motion.div
          animate={{ rotate: [0, -10, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <History className="w-6 h-6 mr-3 text-blue-500" />
        </motion.div>
        <h3 className={`text-xl font-bold ${
          isDarkTheme ? 'text-gray-100' : 'text-gray-800'
        }`}>Code History</h3>
      </div>

      <div className="space-y-4 max-h-96 overflow-y-auto">
        <AnimatePresence>
          {history.map((item, index) => (
            <motion.div
              key={item.id}
              className={`p-4 rounded-xl border backdrop-blur-sm ${
                isDarkTheme 
                  ? 'bg-gray-700/50 border-gray-600' 
                  : 'bg-gray-50/50 border-gray-200'
              }`}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.02, x: 4 }}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <div className={`w-3 h-3 rounded-full ${
                    item.language === 'javascript' ? 'bg-yellow-400' :
                    item.language === 'python' ? 'bg-green-400' :
                    'bg-blue-400'
                  }`} />
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className={`font-medium ${
                        isDarkTheme ? 'text-gray-200' : 'text-gray-800'
                      }`}>
                        {item.language.toUpperCase()}
                      </span>
                      <span className={`text-lg font-bold ${getScoreColor(item.score)}`}>
                        {item.score}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2 text-xs text-gray-500">
                      <Clock className="w-3 h-3" />
                      <span>{item.timestamp.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <motion.button
                    onClick={() => restoreVersion(item.id)}
                    className="p-2 text-blue-500 hover:bg-blue-100 rounded-lg transition-colors"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <RotateCcw className="w-4 h-4" />
                  </motion.button>
                  <motion.button
                    onClick={() => deleteVersion(item.id)}
                    className="p-2 text-red-500 hover:bg-red-100 rounded-lg transition-colors"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Trash2 className="w-4 h-4" />
                  </motion.button>
                </div>
              </div>

              <div className={`p-3 rounded-lg font-mono text-xs mb-3 ${
                isDarkTheme ? 'bg-gray-800' : 'bg-gray-100'
              }`}>
                <code className={isDarkTheme ? 'text-gray-300' : 'text-gray-700'}>
                  {item.preview}
                </code>
              </div>

              <div className="flex flex-wrap gap-2">
                {item.changes.map((change, changeIndex) => (
                  <motion.span
                    key={changeIndex}
                    className={`px-2 py-1 rounded-full text-xs ${
                      isDarkTheme 
                        ? 'bg-blue-900/30 text-blue-300' 
                        : 'bg-blue-100 text-blue-700'
                    }`}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2 + changeIndex * 0.1 }}
                  >
                    <GitBranch className="w-3 h-3 inline mr-1" />
                    {change}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default CodeHistory;