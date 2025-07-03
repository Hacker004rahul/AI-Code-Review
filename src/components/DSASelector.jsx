import React, { useState } from 'react';
import { ChevronDown, Brain, Trophy, Zap, Target } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { dsaExamples } from '../utils/dsaExamples.js';

const DSASelector = ({ language, onExampleSelect, theme }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const isDarkTheme = theme === 'dark';
  
  const examples = dsaExamples[language] || [];
  
  const categories = [
    { value: 'all', label: 'All Problems', icon: Brain },
    { value: 'arrays', label: 'Arrays & Strings', icon: Target },
    { value: 'linkedlist', label: 'Linked Lists', icon: Zap },
    { value: 'trees', label: 'Trees & Graphs', icon: Trophy },
    { value: 'sorting', label: 'Sorting & Searching', icon: Target },
    { value: 'dp', label: 'Dynamic Programming', icon: Brain },
    { value: 'greedy', label: 'Greedy Algorithms', icon: Zap },
    { value: 'backtracking', label: 'Backtracking', icon: Trophy }
  ];

  const filteredExamples = selectedCategory === 'all' 
    ? examples 
    : examples.filter(ex => ex.category === selectedCategory);

  const getDifficultyColor = (difficulty) => {
    switch (difficulty.toLowerCase()) {
      case 'easy': return 'text-green-600 bg-green-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      case 'hard': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getDifficultyIcon = (difficulty) => {
    switch (difficulty.toLowerCase()) {
      case 'easy': return '🟢';
      case 'medium': return '🟡';
      case 'hard': return '🔴';
      default: return '⚪';
    }
  };

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
        <Brain className="w-4 h-4" />
        <span className="hidden sm:inline">DSA Problems</span>
        <span className="sm:hidden">DSA</span>
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
            <div className="p-4">
              {/* Category Filter */}
              <div className="mb-4">
                <label className={`block text-xs font-medium mb-2 ${
                  isDarkTheme ? 'text-gray-400' : 'text-gray-500'
                }`}>Category</label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className={`w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    isDarkTheme 
                      ? 'bg-gray-700 border-gray-600 text-gray-200' 
                      : 'bg-white border-gray-200 text-gray-700'
                  }`}
                >
                  {categories.map(cat => (
                    <option key={cat.value} value={cat.value}>{cat.label}</option>
                  ))}
                </select>
              </div>

              <div className={`text-xs font-medium px-3 py-2 border-b ${
                isDarkTheme 
                  ? 'text-gray-400 border-gray-700' 
                  : 'text-gray-500 border-gray-100'
              }`}>
                {language.toUpperCase()} DSA Problems ({filteredExamples.length})
              </div>
              
              <div className="max-h-64 sm:max-h-80 overflow-y-auto custom-scrollbar">
                {filteredExamples.length === 0 ? (
                  <div className="p-4 text-center">
                    <Brain className={`w-8 h-8 mx-auto mb-2 opacity-50 ${
                      isDarkTheme ? 'text-gray-500' : 'text-gray-400'
                    }`} />
                    <p className={`text-sm ${
                      isDarkTheme ? 'text-gray-400' : 'text-gray-500'
                    }`}>No problems available for this category</p>
                  </div>
                ) : (
                  filteredExamples.map((example, index) => (
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
                            ? 'bg-purple-900/50 group-hover:bg-purple-800/50' 
                            : 'bg-gradient-to-r from-purple-100 to-blue-100 group-hover:from-purple-200 group-hover:to-blue-200'
                        }`}>
                          <span className="text-sm">{getDifficultyIcon(example.difficulty)}</span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-1">
                            <div className={`font-medium text-sm truncate pr-2 ${
                              isDarkTheme ? 'text-gray-200' : 'text-gray-800'
                            }`}>{example.title}</div>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium flex-shrink-0 ${getDifficultyColor(example.difficulty)}`}>
                              {example.difficulty}
                            </span>
                          </div>
                          <div className={`text-xs mb-2 line-clamp-2 ${
                            isDarkTheme ? 'text-gray-400' : 'text-gray-500'
                          }`}>{example.description}</div>
                          <div className={`flex items-center justify-between text-xs ${
                            isDarkTheme ? 'text-gray-500' : 'text-gray-400'
                          }`}>
                            <span className="capitalize">{example.category}</span>
                            <span>{example.code.split('\n').length} lines</span>
                          </div>
                          {example.timeComplexity && (
                            <div className="mt-1 text-xs text-blue-600 truncate">
                              Time: {example.timeComplexity} | Space: {example.spaceComplexity}
                            </div>
                          )}
                        </div>
                      </div>
                    </motion.button>
                  ))
                )}
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

export default DSASelector;