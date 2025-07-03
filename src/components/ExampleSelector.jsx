import React, { useState } from 'react';
import { ChevronDown, Code2, Play } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { codeExamples } from '../utils/codeExamples';

const ExampleSelector = ({ language, onExampleSelect, theme }) => {
  const [isOpen, setIsOpen] = useState(false);
  const examples = codeExamples[language] || [];
  const isDarkTheme = theme === 'dark';

  return (
    <div className="relative">
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center space-x-2 px-4 py-2 border rounded-lg text-sm font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
          isDarkTheme 
            ? 'bg-gray-700 border-gray-600 text-gray-200 hover:border-blue-400' 
            : 'bg-white border-gray-300 text-gray-700 hover:border-blue-500'
        }`}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <Code2 className="w-4 h-4" />
        <span className="hidden sm:inline">Examples</span>
        <span className="sm:hidden">Ex</span>
        <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className={`absolute top-full left-0 mt-2 w-80 sm:w-96 border rounded-lg shadow-xl z-[60] ${
              isDarkTheme 
                ? 'bg-gray-800 border-gray-700' 
                : 'bg-white border-gray-200'
            }`}
            style={{ 
              maxWidth: 'calc(100vw - 2rem)',
              left: 'auto',
              right: '0'
            }}
          >
            <div className="p-2">
              <div className={`text-xs font-medium px-3 py-2 border-b ${
                isDarkTheme 
                  ? 'text-gray-400 border-gray-700' 
                  : 'text-gray-500 border-gray-100'
              }`}>
                {language.toUpperCase()} Examples
              </div>
              <div className="max-h-64 sm:max-h-80 overflow-y-auto custom-scrollbar">
                {examples.map((example, index) => (
                  <motion.button
                    key={index}
                    onClick={() => {
                      onExampleSelect(example);
                      setIsOpen(false);
                    }}
                    className={`w-full text-left p-3 rounded-lg transition-colors group ${
                      isDarkTheme ? 'hover:bg-gray-700' : 'hover:bg-gray-50'
                    }`}
                    whileHover={{ x: 4 }}
                  >
                    <div className="flex items-start space-x-3">
                      <div className={`flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center transition-colors ${
                        isDarkTheme 
                          ? 'bg-blue-900/50 group-hover:bg-blue-800/50' 
                          : 'bg-blue-100 group-hover:bg-blue-200'
                      }`}>
                        <Play className="w-4 h-4 text-blue-600" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className={`font-medium text-sm ${
                          isDarkTheme ? 'text-gray-200' : 'text-gray-800'
                        }`}>{example.title}</div>
                        <div className={`text-xs mt-1 line-clamp-2 ${
                          isDarkTheme ? 'text-gray-400' : 'text-gray-500'
                        }`}>{example.description}</div>
                        <div className={`text-xs mt-1 ${
                          isDarkTheme ? 'text-gray-500' : 'text-gray-400'
                        }`}>
                          {example.difficulty} • {example.code.split('\n').length} lines
                        </div>
                      </div>
                    </div>
                  </motion.button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-[55]" 
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  );
};

export default ExampleSelector;