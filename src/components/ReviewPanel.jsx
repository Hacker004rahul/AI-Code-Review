import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, CheckCircle, Info, Zap, Clock, Target, Lightbulb, Copy, Check, Wifi, WifiOff, Brain, Sparkles, Star } from 'lucide-react';
import { useState } from 'react';
import toast from 'react-hot-toast';

const ReviewPanel = ({ analysis, isAnalyzing, language, onFixIssue, theme }) => {
  const [copiedIndex, setCopiedIndex] = useState(null);
  const isDarkTheme = theme === 'dark';

  const copyToClipboard = async (text, index) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedIndex(index);
      toast.success('Copied to clipboard!');
      setTimeout(() => setCopiedIndex(null), 2000);
    } catch (err) {
      toast.error('Failed to copy');
    }
  };

  if (isAnalyzing) {
    return (
      <motion.div 
        className={`rounded-2xl shadow-2xl p-8 border backdrop-blur-xl transition-all duration-500 ${
          isDarkTheme 
            ? 'bg-gray-800/80 border-gray-700/50 shadow-purple-500/10' 
            : 'bg-white/80 border-gray-200/50 shadow-purple-500/10'
        }`}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        whileHover={{ y: -2 }}
      >
        <div className="flex items-center justify-center h-80">
          <div className="text-center">
            {/* Enhanced Loading Animation */}
            <motion.div className="relative mb-8">
              <motion.div 
                className="w-20 h-20 border-4 border-purple-200 border-t-purple-600 rounded-full mx-auto"
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              />
              <motion.div 
                className="absolute inset-0 w-20 h-20 border-4 border-transparent border-r-blue-600 rounded-full mx-auto"
                animate={{ rotate: -360 }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
              />
              <motion.div
                className="absolute inset-4 w-12 h-12 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full mx-auto flex items-center justify-center"
                animate={{ 
                  scale: [1, 1.1, 1],
                  opacity: [0.8, 1, 0.8]
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Brain className="w-6 h-6 text-white" />
              </motion.div>
            </motion.div>

            <motion.div className="flex items-center justify-center space-x-3 mb-4">
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <Wifi className="w-6 h-6 text-green-500" />
              </motion.div>
              <motion.span 
                className={`text-xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent`}
                animate={{ opacity: [0.7, 1, 0.7] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                AI Analyzing Code...
              </motion.span>
            </motion.div>
            
            <motion.p 
              className={`text-sm ${
                isDarkTheme ? 'text-gray-400' : 'text-gray-500'
              }`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              Gemini AI is performing deep code analysis
            </motion.p>
            
            {/* Floating Analysis Indicators */}
            <div className="flex justify-center space-x-4 mt-6">
              {['Syntax', 'Performance', 'Security', 'Quality'].map((item, index) => (
                <motion.div
                  key={item}
                  className={`px-3 py-1 rounded-full text-xs ${
                    isDarkTheme ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-600'
                  }`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 + index * 0.1 }}
                >
                  {item}
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    );
  }

  if (!analysis) {
    return (
      <motion.div 
        className={`rounded-2xl shadow-2xl p-8 border backdrop-blur-xl transition-all duration-500 ${
          isDarkTheme 
            ? 'bg-gray-800/80 border-gray-700/50 shadow-blue-500/10' 
            : 'bg-white/80 border-gray-200/50 shadow-blue-500/10'
        }`}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        whileHover={{ y: -2 }}
      >
        <div className="flex items-center justify-center h-80">
          <div className="text-center">
            <motion.div 
              className="relative w-20 h-20 mx-auto mb-6"
              whileHover={{ scale: 1.1 }}
            >
              <motion.div 
                className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-xl"
                animate={{
                  boxShadow: [
                    '0 0 20px rgba(59, 130, 246, 0.3)',
                    '0 0 40px rgba(139, 92, 246, 0.5)',
                    '0 0 20px rgba(59, 130, 246, 0.3)'
                  ]
                }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                <Target className="w-10 h-10 text-white" />
              </motion.div>
              
              {/* Floating Sparkles */}
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute"
                  style={{
                    top: `${20 + i * 15}%`,
                    left: `${80 + i * 10}%`,
                  }}
                  animate={{
                    y: [0, -10, 0],
                    opacity: [0.5, 1, 0.5],
                    scale: [0.8, 1.2, 0.8],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: i * 0.3,
                  }}
                >
                  <Sparkles className="w-4 h-4 text-yellow-400" />
                </motion.div>
              ))}
            </motion.div>
            
            <motion.p 
              className={`text-xl font-bold mb-2 ${
                isDarkTheme ? 'text-gray-200' : 'text-gray-700'
              }`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              Ready for AI Analysis
            </motion.p>
            <motion.p 
              className={`text-sm ${
                isDarkTheme ? 'text-gray-400' : 'text-gray-500'
              }`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              Enter code to get intelligent analysis from Gemini AI
            </motion.p>
          </div>
        </div>
      </motion.div>
    );
  }

  const getIssueIcon = (severity) => {
    switch (severity) {
      case 'error':
        return <AlertTriangle className="w-5 h-5 text-red-500" />;
      case 'warning':
        return <AlertTriangle className="w-5 h-5 text-yellow-500" />;
      case 'info':
        return <Info className="w-5 h-5 text-blue-500" />;
      default:
        return <CheckCircle className="w-5 h-5 text-green-500" />;
    }
  };

  const getSeverityColor = (severity) => {
    if (isDarkTheme) {
      switch (severity) {
        case 'error':
          return 'border-l-red-500 bg-red-900/20';
        case 'warning':
          return 'border-l-yellow-500 bg-yellow-900/20';
        case 'info':
          return 'border-l-blue-500 bg-blue-900/20';
        default:
          return 'border-l-green-500 bg-green-900/20';
      }
    } else {
      switch (severity) {
        case 'error':
          return 'border-l-red-500 bg-red-50';
        case 'warning':
          return 'border-l-yellow-500 bg-yellow-50';
        case 'info':
          return 'border-l-blue-500 bg-blue-50';
        default:
          return 'border-l-green-500 bg-green-50';
      }
    }
  };

  const getScoreColor = (score) => {
    if (score >= 90) return 'text-green-500';
    if (score >= 80) return 'text-blue-500';
    if (score >= 70) return 'text-yellow-500';
    if (score >= 60) return 'text-orange-500';
    return 'text-red-500';
  };

  const getScoreLabel = (score) => {
    if (score >= 90) return 'Excellent';
    if (score >= 80) return 'Good';
    if (score >= 70) return 'Fair';
    if (score >= 60) return 'Needs Work';
    return 'Poor';
  };

  return (
    <motion.div 
      className="space-y-6"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Enhanced Overall Score */}
      <motion.div 
        className={`rounded-2xl shadow-2xl p-8 border backdrop-blur-xl transition-all duration-500 ${
          isDarkTheme 
            ? 'bg-gray-800/80 border-gray-700/50 shadow-purple-500/10' 
            : 'bg-white/80 border-gray-200/50 shadow-purple-500/10'
        }`}
        whileHover={{ 
          y: -4,
          boxShadow: isDarkTheme 
            ? '0 25px 50px -12px rgba(139, 92, 246, 0.25)' 
            : '0 25px 50px -12px rgba(139, 92, 246, 0.25)'
        }}
        transition={{ duration: 0.2 }}
      >
        <div className="flex items-center justify-between mb-8">
          <motion.h2 
            className={`text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            🤖 AI Code Quality Score
          </motion.h2>
          <div className="flex items-center space-x-3">
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              {analysis.fallback ? (
                <WifiOff className="w-6 h-6 text-gray-500" />
              ) : (
                <Wifi className="w-6 h-6 text-green-500" />
              )}
            </motion.div>
            <span className={`text-sm font-medium ${
              isDarkTheme ? 'text-gray-400' : 'text-gray-600'
            }`}>{analysis.fallback ? 'Local Analysis' : 'Gemini AI'}</span>
          </div>
        </div>
        
        <div className="flex items-center space-x-8">
          <div className="relative">
            <motion.div 
              className="w-32 h-32"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 36 36">
                <path
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke={isDarkTheme ? "#374151" : "#e5e7eb"}
                  strokeWidth="3"
                />
                <motion.path
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke={analysis.score >= 90 ? "#10b981" : analysis.score >= 80 ? "#3b82f6" : analysis.score >= 70 ? "#f59e0b" : analysis.score >= 60 ? "#f97316" : "#ef4444"}
                  strokeWidth="3"
                  strokeDasharray={`${analysis.score}, 100`}
                  initial={{ strokeDasharray: "0, 100" }}
                  animate={{ strokeDasharray: `${analysis.score}, 100` }}
                  transition={{ duration: 1.5, delay: 0.5 }}
                  filter="drop-shadow(0 0 6px rgba(139, 92, 246, 0.4))"
                />
              </svg>
            </motion.div>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <motion.span 
                className={`text-3xl font-bold ${getScoreColor(analysis.score)}`}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: 0.8 }}
              >
                {analysis.score}
              </motion.span>
              <motion.span 
                className={`text-sm font-medium ${getScoreColor(analysis.score)}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
              >
                {getScoreLabel(analysis.score)}
              </motion.span>
            </div>
          </div>
          
          <div className="flex-1">
            <div className="grid grid-cols-3 gap-6">
              {[
                { label: 'Errors', count: analysis.issues.filter(i => i.severity === 'error').length, color: 'text-red-500', icon: AlertTriangle },
                { label: 'Warnings', count: analysis.issues.filter(i => i.severity === 'warning').length, color: 'text-yellow-500', icon: AlertTriangle },
                { label: 'Info', count: analysis.issues.filter(i => i.severity === 'info').length, color: 'text-blue-500', icon: Info }
              ].map((item, index) => (
                <motion.div 
                  key={item.label}
                  className="text-center"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.3 + index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                >
                  <motion.div 
                    className="flex items-center justify-center mb-2"
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 2, repeat: Infinity, delay: index * 0.5 }}
                  >
                    <item.icon className={`w-6 h-6 ${item.color}`} />
                  </motion.div>
                  <div className={`text-4xl font-bold ${item.color}`}>{item.count}</div>
                  <div className={`text-sm ${
                    isDarkTheme ? 'text-gray-400' : 'text-gray-600'
                  }`}>{item.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Enhanced Issues and Suggestions */}
      <motion.div 
        className={`rounded-2xl shadow-2xl p-8 border backdrop-blur-xl transition-all duration-500 ${
          isDarkTheme 
            ? 'bg-gray-800/80 border-gray-700/50 shadow-yellow-500/10' 
            : 'bg-white/80 border-gray-200/50 shadow-yellow-500/10'
        }`}
        whileHover={{ y: -2 }}
        transition={{ duration: 0.2 }}
      >
        <motion.h3 
          className={`text-xl font-bold mb-6 flex items-center ${
            isDarkTheme ? 'text-gray-100' : 'text-gray-800'
          }`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <motion.div
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Lightbulb className="w-6 h-6 mr-3 text-yellow-500" />
          </motion.div>
          AI-Detected Issues & Suggestions
        </motion.h3>
        
        <AnimatePresence>
          {analysis.issues.length === 0 ? (
            <motion.div 
              className="text-center py-12"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div
                animate={{ 
                  scale: [1, 1.1, 1],
                  rotate: [0, 5, -5, 0]
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <CheckCircle className="w-20 h-20 text-green-500 mx-auto mb-4" />
              </motion.div>
              <p className={`text-xl font-bold mb-2 ${
                isDarkTheme ? 'text-gray-200' : 'text-gray-700'
              }`}>Excellent! No issues found by AI.</p>
              <p className={`text-sm ${
                isDarkTheme ? 'text-gray-400' : 'text-gray-500'
              }`}>Your code follows best practices</p>
            </motion.div>
          ) : (
            <div className="space-y-4 max-h-96 overflow-y-auto custom-scrollbar">
              {analysis.issues.map((issue, index) => (
                <motion.div
                  key={index}
                  className={`border-l-4 p-6 rounded-r-xl backdrop-blur-sm ${getSeverityColor(issue.severity)}`}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  whileHover={{ scale: 1.02, x: 4 }}
                >
                  <div className="flex items-start space-x-4">
                    <motion.div
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ duration: 2, repeat: Infinity, delay: index * 0.2 }}
                    >
                      {getIssueIcon(issue.severity)}
                    </motion.div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className={`font-bold text-lg ${
                          isDarkTheme ? 'text-gray-200' : 'text-gray-800'
                        }`}>{issue.title}</h4>
                        <div className="flex items-center space-x-3">
                          {issue.line && (
                            <span className={`text-xs px-3 py-1 rounded-full font-medium ${
                              isDarkTheme 
                                ? 'bg-gray-700 text-gray-300' 
                                : 'bg-gray-200 text-gray-600'
                            }`}>
                              Line {issue.line}
                            </span>
                          )}
                          {issue.fixCode && (
                            <motion.button
                              onClick={() => copyToClipboard(issue.fixCode, index)}
                              className="text-xs bg-gradient-to-r from-blue-500 to-purple-600 text-white px-3 py-1 rounded-full hover:from-blue-600 hover:to-purple-700 transition-all flex items-center space-x-1 font-medium"
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                            >
                              {copiedIndex === index ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                              <span>{copiedIndex === index ? 'Copied' : 'Copy Fix'}</span>
                            </motion.button>
                          )}
                        </div>
                      </div>
                      <p className={`text-sm mb-3 ${
                        isDarkTheme ? 'text-gray-400' : 'text-gray-600'
                      }`}>{issue.description}</p>
                      {issue.suggestion && (
                        <motion.div 
                          className={`p-4 rounded-lg text-sm border backdrop-blur-sm ${
                            isDarkTheme 
                              ? 'bg-gray-700/50 border-gray-600' 
                              : 'bg-white/70 border-gray-200'
                          }`}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.2 }}
                        >
                          <strong className={`flex items-center ${isDarkTheme ? 'text-gray-300' : 'text-gray-700'}`}>
                            <Brain className="w-4 h-4 mr-2 text-purple-500" />
                            AI Suggestion:
                          </strong> 
                          <span className={`ml-1 ${
                            isDarkTheme ? 'text-gray-400' : 'text-gray-600'
                          }`}>{issue.suggestion}</span>
                        </motion.div>
                      )}
                      {issue.fixCode && (
                        <motion.div 
                          className="mt-3 bg-gray-900 text-green-400 p-3 rounded-lg text-xs font-mono overflow-x-auto border border-gray-700"
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          transition={{ delay: 0.3 }}
                        >
                          {issue.fixCode}
                        </motion.div>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Enhanced Performance Metrics */}
      <motion.div 
        className={`rounded-2xl shadow-2xl p-8 border backdrop-blur-xl transition-all duration-500 ${
          isDarkTheme 
            ? 'bg-gray-800/80 border-gray-700/50 shadow-blue-500/10' 
            : 'bg-white/80 border-gray-200/50 shadow-blue-500/10'
        }`}
        whileHover={{ y: -2 }}
        transition={{ duration: 0.2 }}
      >
        <motion.h3 
          className={`text-xl font-bold mb-6 flex items-center ${
            isDarkTheme ? 'text-gray-100' : 'text-gray-800'
          }`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <motion.div
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          >
            <Zap className="w-6 h-6 mr-3 text-blue-500" />
          </motion.div>
          Performance Insights
        </motion.h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <motion.div 
            className={`p-6 rounded-xl border backdrop-blur-sm ${
              isDarkTheme 
                ? 'bg-blue-900/20 border-blue-700' 
                : 'bg-gradient-to-r from-blue-50 to-blue-100 border-blue-200'
            }`}
            whileHover={{ scale: 1.02, y: -2 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <div className="flex items-center space-x-3 mb-3">
              <Clock className="w-6 h-6 text-blue-600" />
              <span className={`font-bold ${
                isDarkTheme ? 'text-blue-300' : 'text-blue-800'
              }`}>Complexity</span>
            </div>
            <div className="text-3xl font-bold text-blue-600 mb-1">{analysis.complexity}</div>
            <div className={`text-sm ${
              isDarkTheme ? 'text-blue-400' : 'text-blue-600'
            }`}>Cyclomatic complexity</div>
          </motion.div>
          
          <motion.div 
            className={`p-6 rounded-xl border backdrop-blur-sm ${
              isDarkTheme 
                ? 'bg-green-900/20 border-green-700' 
                : 'bg-gradient-to-r from-green-50 to-green-100 border-green-200'
            }`}
            whileHover={{ scale: 1.02, y: -2 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <div className="flex items-center space-x-3 mb-3">
              <Target className="w-6 h-6 text-green-600" />
              <span className={`font-bold ${
                isDarkTheme ? 'text-green-300' : 'text-green-800'
              }`}>Maintainability</span>
            </div>
            <div className="text-3xl font-bold text-green-600 mb-1">{analysis.maintainability}%</div>
            <div className={`text-sm ${
              isDarkTheme ? 'text-green-400' : 'text-green-600'
            }`}>Maintainability index</div>
          </motion.div>
        </div>

        {/* Additional Metrics */}
        {analysis.metrics && (
          <motion.div 
            className="grid grid-cols-2 md:grid-cols-4 gap-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            {Object.entries(analysis.metrics).map(([key, value], index) => (
              <motion.div 
                key={key} 
                className={`text-center p-4 rounded-xl backdrop-blur-sm ${
                  isDarkTheme ? 'bg-gray-700/50' : 'bg-gray-50/50'
                }`}
                whileHover={{ scale: 1.05, y: -2 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 + index * 0.1 }}
              >
                <div className={`text-2xl font-bold ${
                  isDarkTheme ? 'text-gray-200' : 'text-gray-700'
                }`}>{value}</div>
                <div className={`text-xs capitalize ${
                  isDarkTheme ? 'text-gray-400' : 'text-gray-500'
                }`}>{key.replace(/([A-Z])/g, ' $1')}</div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </motion.div>

      {/* AI Suggestions */}
      {analysis.suggestions && analysis.suggestions.length > 0 && (
        <motion.div 
          className={`rounded-2xl shadow-2xl p-8 border backdrop-blur-xl transition-all duration-500 ${
            isDarkTheme 
              ? 'bg-gray-800/80 border-gray-700/50 shadow-purple-500/10' 
              : 'bg-white/80 border-gray-200/50 shadow-purple-500/10'
          }`}
          whileHover={{ y: -2 }}
          transition={{ duration: 0.2 }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <motion.h3 
            className={`text-xl font-bold mb-6 flex items-center ${
              isDarkTheme ? 'text-gray-100' : 'text-gray-800'
            }`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
          >
            <motion.div
              animate={{ 
                scale: [1, 1.2, 1],
                rotate: [0, 10, -10, 0]
              }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <Star className="w-6 h-6 mr-3 text-purple-500" />
            </motion.div>
            AI Recommendations
          </motion.h3>
          
          <div className="space-y-3">
            {analysis.suggestions.map((suggestion, index) => (
              <motion.div
                key={index}
                className={`p-4 rounded-xl border-l-4 border-purple-500 backdrop-blur-sm ${
                  isDarkTheme 
                    ? 'bg-purple-900/20' 
                    : 'bg-purple-50'
                }`}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.8 + index * 0.1 }}
                whileHover={{ scale: 1.02, x: 4 }}
              >
                <div className={`text-sm flex items-start ${
                  isDarkTheme ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  <motion.div
                    animate={{ rotate: [0, 360] }}
                    transition={{ duration: 4, repeat: Infinity, delay: index * 0.5 }}
                    className="mr-2 mt-0.5"
                  >
                    <Sparkles className="w-4 h-4 text-purple-500" />
                  </motion.div>
                  {suggestion}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default ReviewPanel;