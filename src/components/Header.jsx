import React from 'react';
import { Code, Sparkles, Github, Settings, Trophy, Zap, Brain, Cpu } from 'lucide-react';
import { motion } from 'framer-motion';

const Header = ({ onSettingsClick, analysis, theme }) => {
  const getScoreColor = (score) => {
    if (score >= 90) return 'text-green-400';
    if (score >= 80) return 'text-blue-400';
    if (score >= 70) return 'text-yellow-400';
    if (score >= 60) return 'text-orange-400';
    return 'text-red-400';
  };

  const isDarkTheme = theme === 'dark';

  return (
    <motion.header 
      className={`shadow-2xl border-b sticky top-0 z-50 transition-all duration-500 backdrop-blur-xl ${
        isDarkTheme 
          ? 'bg-gray-900/80 border-gray-700/50' 
          : 'bg-white/80 border-gray-200/50'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <motion.div 
            className="flex items-center space-x-4"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="relative">
              <motion.div 
                className="w-14 h-14 bg-gradient-to-r from-blue-500 via-purple-600 to-pink-600 rounded-2xl flex items-center justify-center shadow-lg"
                whileHover={{ 
                  scale: 1.1,
                  rotate: 5,
                  boxShadow: '0 20px 40px -12px rgba(139, 92, 246, 0.4)'
                }}
                whileTap={{ scale: 0.95 }}
                animate={{
                  boxShadow: [
                    '0 0 20px rgba(139, 92, 246, 0.3)',
                    '0 0 40px rgba(139, 92, 246, 0.5)',
                    '0 0 20px rgba(139, 92, 246, 0.3)'
                  ]
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Code className="w-8 h-8 text-white" />
              </motion.div>
              
              {/* Floating Icons Around Logo */}
              <motion.div
                className="absolute -top-2 -right-2"
                animate={{ 
                  rotate: 360,
                  scale: [1, 1.2, 1]
                }}
                transition={{ 
                  rotate: { duration: 4, repeat: Infinity, ease: "linear" },
                  scale: { duration: 2, repeat: Infinity }
                }}
              >
                <Brain className="w-5 h-5 text-green-400" />
              </motion.div>
              
              <motion.div
                className="absolute -bottom-2 -left-2"
                animate={{ 
                  y: [0, -5, 0],
                  opacity: [0.7, 1, 0.7]
                }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                <Cpu className="w-4 h-4 text-cyan-400" />
              </motion.div>
            </div>
            
            <div>
              <motion.h1 
                className="text-3xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                AI Code Reviewer
              </motion.h1>
              <motion.p 
                className={`text-sm ${
                  isDarkTheme ? 'text-gray-400' : 'text-gray-600'
                }`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                <span className="inline-flex items-center space-x-1">
                  <Sparkles className="w-4 h-4 text-yellow-400" />
                  <span>Powered by Gemini AI • Intelligent Analysis</span>
                </span>
              </motion.p>
            </div>
          </motion.div>
          
          <div className="flex items-center space-x-6">
            {/* Enhanced Score Display */}
            {analysis && (
              <motion.div 
                className={`hidden md:flex items-center space-x-4 px-6 py-3 rounded-2xl backdrop-blur-sm border ${
                  isDarkTheme 
                    ? 'bg-gray-800/50 border-gray-700/50' 
                    : 'bg-white/50 border-gray-200/50'
                }`}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: '0 10px 30px -10px rgba(139, 92, 246, 0.3)'
                }}
              >
                <motion.div
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                >
                  <Trophy className="w-6 h-6 text-yellow-500" />
                </motion.div>
                <div className="text-center">
                  <motion.div 
                    className={`text-2xl font-bold ${getScoreColor(analysis.score)}`}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 200 }}
                  >
                    {analysis.score}
                  </motion.div>
                  <div className={`text-xs ${
                    isDarkTheme ? 'text-gray-400' : 'text-gray-500'
                  }`}>Quality Score</div>
                </div>
              </motion.div>
            )}

            {/* AI Status Indicator */}
            <motion.div 
              className={`hidden md:flex items-center space-x-3 px-4 py-2 rounded-xl ${
                isDarkTheme ? 'bg-green-900/20' : 'bg-green-50'
              }`}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              whileHover={{ scale: 1.05 }}
            >
              <motion.div 
                className="w-3 h-3 bg-green-400 rounded-full"
                animate={{ 
                  scale: [1, 1.3, 1],
                  opacity: [1, 0.7, 1]
                }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <span className={`text-sm font-medium ${
                isDarkTheme ? 'text-green-400' : 'text-green-600'
              }`}>AI Online</span>
            </motion.div>
            
            {/* Action Buttons */}
            <motion.button 
              onClick={onSettingsClick}
              className={`p-3 rounded-xl transition-all duration-300 ${
                isDarkTheme 
                  ? 'text-gray-400 hover:text-gray-200 hover:bg-gray-700/50' 
                  : 'text-gray-600 hover:text-gray-800 hover:bg-gray-100/50'
              }`}
              whileHover={{ 
                scale: 1.1,
                rotate: 90,
                boxShadow: '0 10px 20px -5px rgba(139, 92, 246, 0.3)'
              }}
              whileTap={{ scale: 0.9 }}
            >
              <Settings className="w-6 h-6" />
            </motion.button>
            
            <motion.a 
              href="https://github.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className={`p-3 rounded-xl transition-all duration-300 ${
                isDarkTheme 
                  ? 'text-gray-400 hover:text-gray-200 hover:bg-gray-700/50' 
                  : 'text-gray-600 hover:text-gray-800 hover:bg-gray-100/50'
              }`}
              whileHover={{ 
                scale: 1.1,
                y: -2,
                boxShadow: '0 10px 20px -5px rgba(0, 0, 0, 0.3)'
              }}
              whileTap={{ scale: 0.9 }}
            >
              <Github className="w-6 h-6" />
            </motion.a>
          </div>
        </div>
      </div>
      
      {/* Animated Border */}
      <motion.div
        className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"
        initial={{ width: 0 }}
        animate={{ width: '100%' }}
        transition={{ duration: 1, delay: 0.5 }}
      />
    </motion.header>
  );
};

export default Header;