import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  MessageCircle, 
  BarChart3, 
  History, 
  GitCompare, 
  Sparkles,
  X,
  ChevronRight
} from 'lucide-react';
import AIChat from './AIChat';
import CodeMetrics from './CodeMetrics';
import CodeHistory from './CodeHistory';
import CodeComparison from './CodeComparison';

const FeaturePanel = ({ code, language, analysis, theme, onCodeChange }) => {
  const [activeFeature, setActiveFeature] = useState(null);
  const [showChat, setShowChat] = useState(false);
  const isDarkTheme = theme === 'dark';

  const features = [
    {
      id: 'chat',
      title: 'CodeGenie Chat',
      description: 'Chat with your AI coding assistant',
      icon: MessageCircle,
      color: 'text-blue-500',
      bgColor: isDarkTheme ? 'bg-blue-900/20' : 'bg-blue-50',
      action: () => setShowChat(true)
    },
    {
      id: 'metrics',
      title: 'Advanced Metrics',
      description: 'Detailed code analysis',
      icon: BarChart3,
      color: 'text-purple-500',
      bgColor: isDarkTheme ? 'bg-purple-900/20' : 'bg-purple-50',
      action: () => setActiveFeature('metrics')
    },
    {
      id: 'history',
      title: 'Code History',
      description: 'View previous versions',
      icon: History,
      color: 'text-green-500',
      bgColor: isDarkTheme ? 'bg-green-900/20' : 'bg-green-50',
      action: () => setActiveFeature('history')
    },
    {
      id: 'comparison',
      title: 'Code Comparison',
      description: 'Before vs After improvements',
      icon: GitCompare,
      color: 'text-orange-500',
      bgColor: isDarkTheme ? 'bg-orange-900/20' : 'bg-orange-50',
      action: () => setActiveFeature('comparison')
    }
  ];

  const generateImprovedCode = (originalCode) => {
    if (!originalCode || !originalCode.trim()) {
      return '// No code to improve';
    }

    // Enhanced code improvement logic based on language
    let improvedCode = originalCode;

    if (language === 'javascript') {
      // Replace var with const/let
      improvedCode = improvedCode.replace(/var\s+(\w+)\s*=/g, 'const $1 =');
      
      // Replace == with ===
      improvedCode = improvedCode.replace(/([^=!])==/g, '$1===');
      improvedCode = improvedCode.replace(/([^=!])!=/g, '$1!==');
      
      // Add error handling to functions
      if (improvedCode.includes('function') && !improvedCode.includes('try')) {
        improvedCode = improvedCode.replace(
          /(function\s+\w+\([^)]*\)\s*{)/,
          '$1\n  try {'
        );
        improvedCode += '\n  } catch (error) {\n    console.error("Error:", error);\n  }';
      }
      
      // Modernize array iteration
      improvedCode = improvedCode.replace(
        /for\s*\(\s*var\s+(\w+)\s*=\s*0;\s*\1\s*<\s*(\w+)\.length;\s*\1\+\+\s*\)/g,
        'for (const [$1, item] of $2.entries())'
      );
      
      // Add JSDoc comments
      if (improvedCode.includes('function') && !improvedCode.includes('/**')) {
        improvedCode = improvedCode.replace(
          /(function\s+\w+)/,
          '/**\n * Improved function with better practices\n */\n$1'
        );
      }
    } else if (language === 'python') {
      // Add type hints
      improvedCode = improvedCode.replace(
        /def\s+(\w+)\s*\(([^)]*)\):/g,
        'def $1($2) -> None:'
      );
      
      // Replace bare except with specific exceptions
      improvedCode = improvedCode.replace(/except\s*:/g, 'except Exception as e:');
      
      // Add docstrings
      if (improvedCode.includes('def ') && !improvedCode.includes('"""')) {
        improvedCode = improvedCode.replace(
          /(def\s+\w+[^:]*:)/,
          '$1\n    """Improved function with better practices."""'
        );
      }
      
      // Use list comprehensions
      improvedCode = improvedCode.replace(
        /for\s+(\w+)\s+in\s+range\s*\(\s*len\s*\((\w+)\)\s*\):/g,
        'for $1, item in enumerate($2):'
      );
    } else if (language === 'java') {
      // Add proper access modifiers
      improvedCode = improvedCode.replace(
        /class\s+(\w+)/g,
        'public class $1'
      );
      
      // Add @Override annotations
      improvedCode = improvedCode.replace(
        /(public\s+\w+\s+toString\s*\([^)]*\))/g,
        '@Override\n    $1'
      );
      
      // Use StringBuilder for string concatenation
      if (improvedCode.includes('String') && improvedCode.includes('+')) {
        improvedCode = '// Consider using StringBuilder for better performance\n' + improvedCode;
      }
    }

    // Add general improvements
    if (!improvedCode.includes('//') && !improvedCode.includes('/*')) {
      improvedCode = '// Improved code with better practices\n' + improvedCode;
    }

    return improvedCode;
  };

  return (
    <>
      {/* Feature Buttons */}
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
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          >
            <Sparkles className="w-6 h-6 mr-3 text-yellow-500" />
          </motion.div>
          <h3 className={`text-xl font-bold ${
            isDarkTheme ? 'text-gray-100' : 'text-gray-800'
          }`}>AI Features</h3>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {features.map((feature, index) => (
            <motion.button
              key={feature.id}
              onClick={feature.action}
              className={`p-4 rounded-xl border transition-all duration-300 ${
                feature.bgColor
              } ${
                isDarkTheme ? 'border-gray-600 hover:border-gray-500' : 'border-gray-200 hover:border-gray-300'
              }`}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="flex flex-col items-center text-center space-y-3">
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity, delay: index * 0.3 }}
                >
                  <feature.icon className={`w-8 h-8 ${feature.color}`} />
                </motion.div>
                <div>
                  <h4 className={`font-semibold ${
                    isDarkTheme ? 'text-gray-200' : 'text-gray-800'
                  }`}>{feature.title}</h4>
                  <p className={`text-xs ${
                    isDarkTheme ? 'text-gray-400' : 'text-gray-600'
                  }`}>{feature.description}</p>
                </div>
                <ChevronRight className={`w-4 h-4 ${feature.color}`} />
              </div>
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* Feature Content */}
      <AnimatePresence>
        {activeFeature && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mb-6"
          >
            <div className="relative">
              <motion.button
                onClick={() => setActiveFeature(null)}
                className={`absolute top-4 right-4 z-10 p-2 rounded-lg transition-colors ${
                  isDarkTheme 
                    ? 'bg-gray-700 hover:bg-gray-600 text-gray-300' 
                    : 'bg-gray-100 hover:bg-gray-200 text-gray-600'
                }`}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <X className="w-5 h-5" />
              </motion.button>

              {activeFeature === 'metrics' && (
                <CodeMetrics 
                  metrics={analysis?.metrics || {}} 
                  theme={theme} 
                />
              )}

              {activeFeature === 'history' && (
                <CodeHistory theme={theme} />
              )}

              {activeFeature === 'comparison' && (
                <div>
                  {code && code.trim() ? (
                    <CodeComparison
                      originalCode={code}
                      improvedCode={generateImprovedCode(code)}
                      language={language}
                      theme={theme}
                      onApplyFix={onCodeChange}
                    />
                  ) : (
                    <motion.div
                      className={`rounded-2xl shadow-2xl border backdrop-blur-xl p-8 text-center ${
                        isDarkTheme 
                          ? 'bg-gray-800/80 border-gray-700/50' 
                          : 'bg-white/80 border-gray-200/50'
                      }`}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                    >
                      <GitCompare className={`w-16 h-16 mx-auto mb-4 ${
                        isDarkTheme ? 'text-gray-500' : 'text-gray-400'
                      }`} />
                      <h3 className={`text-xl font-bold mb-2 ${
                        isDarkTheme ? 'text-gray-200' : 'text-gray-700'
                      }`}>No Code to Compare</h3>
                      <p className={`text-sm ${
                        isDarkTheme ? 'text-gray-400' : 'text-gray-500'
                      }`}>
                        Please enter some code in the editor to see before/after comparison
                      </p>
                    </motion.div>
                  )}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* CodeGenie Chat */}
      <AIChat
        isOpen={showChat}
        onClose={() => setShowChat(false)}
        code={code}
        language={language}
        theme={theme}
      />
    </>
  );
};

export default FeaturePanel;