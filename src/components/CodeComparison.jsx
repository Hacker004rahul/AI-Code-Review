import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GitCompare, ArrowRight, Copy, Check, Sparkles, Download, RefreshCw } from 'lucide-react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark, oneLight } from 'react-syntax-highlighter/dist/esm/styles/prism';
import toast from 'react-hot-toast';

const CodeComparison = ({ originalCode, improvedCode, language, theme, onApplyFix }) => {
  const [copiedSide, setCopiedSide] = useState(null);
  const [showDiff, setShowDiff] = useState(false);
  const isDarkTheme = theme === 'dark';

  const copyToClipboard = async (code, side) => {
    try {
      await navigator.clipboard.writeText(code);
      setCopiedSide(side);
      toast.success(`${side === 'original' ? 'Original' : 'Improved'} code copied!`);
      setTimeout(() => setCopiedSide(null), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
      toast.error('Failed to copy code');
    }
  };

  const downloadCode = (code, filename) => {
    const element = document.createElement('a');
    const file = new Blob([code], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = filename;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    toast.success('Code downloaded!');
  };

  const getLanguageExtension = () => {
    const extensions = {
      javascript: 'js',
      typescript: 'ts',
      python: 'py',
      java: 'java',
      cpp: 'cpp',
      c: 'c',
      go: 'go',
      rust: 'rs'
    };
    return extensions[language] || 'txt';
  };

  const calculateImprovement = () => {
    const originalLines = originalCode.split('\n').length;
    const improvedLines = improvedCode.split('\n').length;
    const improvement = Math.abs(improvedLines - originalLines);
    return {
      linesChanged: improvement,
      percentChange: originalLines > 0 ? Math.round((improvement / originalLines) * 100) : 0
    };
  };

  const improvements = calculateImprovement();

  return (
    <motion.div
      className={`rounded-2xl shadow-2xl border backdrop-blur-xl transition-all duration-500 ${
        isDarkTheme 
          ? 'bg-gray-800/80 border-gray-700/50' 
          : 'bg-white/80 border-gray-200/50'
      }`}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ y: -2 }}
    >
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <motion.h3 
            className="text-xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent flex items-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <GitCompare className="w-6 h-6 mr-3 text-green-500" />
            AI Code Improvement
          </motion.h3>
          
          <div className="flex items-center space-x-3">
            <motion.button
              onClick={() => setShowDiff(!showDiff)}
              className={`px-4 py-2 rounded-lg transition-all flex items-center space-x-2 ${
                isDarkTheme 
                  ? 'bg-gray-700 hover:bg-gray-600 text-gray-300' 
                  : 'bg-gray-100 hover:bg-gray-200 text-gray-600'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <RefreshCw className="w-4 h-4" />
              <span>{showDiff ? 'Side by Side' : 'Show Diff'}</span>
            </motion.button>
            
            <motion.button
              onClick={() => onApplyFix(improvedCode)}
              className="px-4 py-2 bg-gradient-to-r from-green-500 to-blue-500 text-white rounded-lg hover:from-green-600 hover:to-blue-600 transition-all flex items-center space-x-2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Sparkles className="w-4 h-4" />
              <span>Apply Fix</span>
            </motion.button>
          </div>
        </div>

        {/* Improvement Stats */}
        <motion.div 
          className={`mb-6 p-4 rounded-xl border ${
            isDarkTheme 
              ? 'bg-blue-900/20 border-blue-700/30' 
              : 'bg-blue-50 border-blue-200'
          }`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center space-x-4">
              <div className={`text-center ${
                isDarkTheme ? 'text-blue-300' : 'text-blue-700'
              }`}>
                <div className="font-bold text-lg">{improvements.linesChanged}</div>
                <div className="text-xs">Lines Changed</div>
              </div>
              <div className={`text-center ${
                isDarkTheme ? 'text-green-300' : 'text-green-700'
              }`}>
                <div className="font-bold text-lg">{improvements.percentChange}%</div>
                <div className="text-xs">Improvement</div>
              </div>
              <div className={`text-center ${
                isDarkTheme ? 'text-purple-300' : 'text-purple-700'
              }`}>
                <div className="font-bold text-lg">{language.toUpperCase()}</div>
                <div className="text-xs">Language</div>
              </div>
            </div>
            <div className={`text-xs ${
              isDarkTheme ? 'text-gray-400' : 'text-gray-600'
            }`}>
              ✨ AI-powered improvements applied
            </div>
          </div>
        </motion.div>

        {!showDiff ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Original Code */}
            <motion.div
              className={`rounded-xl border ${
                isDarkTheme ? 'border-red-500/30 bg-red-900/10' : 'border-red-300 bg-red-50'
              }`}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <div className="p-4 border-b border-red-500/30">
                <div className="flex items-center justify-between">
                  <h4 className="font-semibold text-red-600 flex items-center">
                    <span className="mr-2">📝</span>
                    Original Code
                  </h4>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => copyToClipboard(originalCode, 'original')}
                      className="p-2 hover:bg-red-100 rounded-lg transition-colors"
                      title="Copy original code"
                    >
                      {copiedSide === 'original' ? 
                        <Check className="w-4 h-4 text-green-500" /> : 
                        <Copy className="w-4 h-4 text-red-500" />
                      }
                    </button>
                    <button
                      onClick={() => downloadCode(originalCode, `original.${getLanguageExtension()}`)}
                      className="p-2 hover:bg-red-100 rounded-lg transition-colors"
                      title="Download original code"
                    >
                      <Download className="w-4 h-4 text-red-500" />
                    </button>
                  </div>
                </div>
              </div>
              <div className="p-4 max-h-96 overflow-auto">
                <SyntaxHighlighter
                  language={language}
                  style={isDarkTheme ? atomDark : oneLight}
                  customStyle={{
                    background: 'transparent',
                    padding: 0,
                    margin: 0,
                    fontSize: '14px'
                  }}
                  showLineNumbers={true}
                  lineNumberStyle={{
                    minWidth: '3em',
                    paddingRight: '1em',
                    color: isDarkTheme ? '#6b7280' : '#9ca3af'
                  }}
                >
                  {originalCode}
                </SyntaxHighlighter>
              </div>
            </motion.div>

            {/* Arrow - Hidden on mobile */}
            <div className="hidden lg:flex items-center justify-center">
              <motion.div
                animate={{ x: [0, 10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="flex flex-col items-center space-y-2"
              >
                <ArrowRight className="w-8 h-8 text-blue-500" />
                <span className={`text-xs font-medium ${
                  isDarkTheme ? 'text-gray-400' : 'text-gray-600'
                }`}>AI Improved</span>
              </motion.div>
            </div>

            {/* Improved Code */}
            <motion.div
              className={`rounded-xl border ${
                isDarkTheme ? 'border-green-500/30 bg-green-900/10' : 'border-green-300 bg-green-50'
              }`}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <div className="p-4 border-b border-green-500/30">
                <div className="flex items-center justify-between">
                  <h4 className="font-semibold text-green-600 flex items-center">
                    <span className="mr-2">✨</span>
                    AI Improved Code
                  </h4>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => copyToClipboard(improvedCode, 'improved')}
                      className="p-2 hover:bg-green-100 rounded-lg transition-colors"
                      title="Copy improved code"
                    >
                      {copiedSide === 'improved' ? 
                        <Check className="w-4 h-4 text-green-500" /> : 
                        <Copy className="w-4 h-4 text-green-500" />
                      }
                    </button>
                    <button
                      onClick={() => downloadCode(improvedCode, `improved.${getLanguageExtension()}`)}
                      className="p-2 hover:bg-green-100 rounded-lg transition-colors"
                      title="Download improved code"
                    >
                      <Download className="w-4 h-4 text-green-500" />
                    </button>
                  </div>
                </div>
              </div>
              <div className="p-4 max-h-96 overflow-auto">
                <SyntaxHighlighter
                  language={language}
                  style={isDarkTheme ? atomDark : oneLight}
                  customStyle={{
                    background: 'transparent',
                    padding: 0,
                    margin: 0,
                    fontSize: '14px'
                  }}
                  showLineNumbers={true}
                  lineNumberStyle={{
                    minWidth: '3em',
                    paddingRight: '1em',
                    color: isDarkTheme ? '#6b7280' : '#9ca3af'
                  }}
                >
                  {improvedCode}
                </SyntaxHighlighter>
              </div>
            </motion.div>
          </div>
        ) : (
          /* Diff View */
          <motion.div
            className={`rounded-xl border ${
              isDarkTheme ? 'border-gray-600 bg-gray-900/50' : 'border-gray-300 bg-gray-50'
            }`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <div className="p-4 border-b">
              <h4 className={`font-semibold ${
                isDarkTheme ? 'text-gray-200' : 'text-gray-800'
              }`}>Code Diff View</h4>
            </div>
            <div className="p-4 max-h-96 overflow-auto">
              <div className="space-y-2 font-mono text-sm">
                {originalCode.split('\n').map((line, index) => {
                  const improvedLine = improvedCode.split('\n')[index];
                  const isChanged = line !== improvedLine;
                  
                  return (
                    <div key={index} className="grid grid-cols-2 gap-4">
                      <div className={`p-2 rounded ${
                        isChanged 
                          ? isDarkTheme ? 'bg-red-900/30' : 'bg-red-100' 
                          : isDarkTheme ? 'bg-gray-800/30' : 'bg-gray-100'
                      }`}>
                        <span className={`text-xs ${
                          isDarkTheme ? 'text-gray-400' : 'text-gray-500'
                        }`}>
                          {index + 1}:
                        </span> {line}
                      </div>
                      <div className={`p-2 rounded ${
                        isChanged 
                          ? isDarkTheme ? 'bg-green-900/30' : 'bg-green-100' 
                          : isDarkTheme ? 'bg-gray-800/30' : 'bg-gray-100'
                      }`}>
                        <span className={`text-xs ${
                          isDarkTheme ? 'text-gray-400' : 'text-gray-500'
                        }`}>
                          {index + 1}:
                        </span> {improvedLine || ''}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </motion.div>
        )}

        {/* Improvement Notes */}
        <motion.div 
          className={`mt-6 p-4 rounded-xl border ${
            isDarkTheme 
              ? 'bg-purple-900/20 border-purple-700/30' 
              : 'bg-purple-50 border-purple-200'
          }`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <h5 className={`font-semibold mb-2 ${
            isDarkTheme ? 'text-purple-300' : 'text-purple-700'
          }`}>🚀 AI Improvements Applied:</h5>
          <ul className={`text-sm space-y-1 ${
            isDarkTheme ? 'text-purple-200' : 'text-purple-600'
          }`}>
            {language === 'javascript' && (
              <>
                <li>• Replaced `var` with `const` for better scoping</li>
                <li>• Used strict equality (`===`) instead of loose equality</li>
                <li>• Added error handling with try-catch blocks</li>
                <li>• Modernized array iteration patterns</li>
              </>
            )}
            {language === 'python' && (
              <>
                <li>• Added type hints for better code documentation</li>
                <li>• Replaced bare `except` with specific exception handling</li>
                <li>• Added docstrings for function documentation</li>
                <li>• Used `enumerate()` instead of `range(len())`</li>
              </>
            )}
            {language === 'java' && (
              <>
                <li>• Added proper access modifiers</li>
                <li>• Included @Override annotations where appropriate</li>
                <li>• Suggested StringBuilder for string operations</li>
              </>
            )}
            <li>• Added helpful comments for code clarity</li>
            <li>• Applied language-specific best practices</li>
          </ul>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default CodeComparison;