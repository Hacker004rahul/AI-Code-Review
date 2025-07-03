import React, { useState, useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import Header from './components/Header';
import CodeEditor from './components/CodeEditor';
import ReviewPanel from './components/ReviewPanel';
import LanguageSelector from './components/LanguageSelector';
import SettingsPanel from './components/SettingsPanel';
import ExampleSelector from './components/ExampleSelector';
import DSASelector from './components/DSASelector';
import FloatingElements from './components/FloatingElements.jsx';
import FeaturePanel from './components/FeaturePanel';
import { analyzeCode } from './utils/codeAnalyzer';
import { codeExamples } from './utils/codeExamples';
import { dsaExamples } from './utils/dsaExamples.js';
import { motion } from 'framer-motion';

function App() {
  const [code, setCode] = useState('');
  const [language, setLanguage] = useState('javascript');
  const [analysis, setAnalysis] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [settings, setSettings] = useState({
    autoAnalyze: true,
    analysisDelay: 1000,
    strictMode: false,
    showLineNumbers: true,
    theme: 'dark'
  });
  const [showSettings, setShowSettings] = useState(false);
  const [activeTab, setActiveTab] = useState('examples');

  const handleAnalyze = async () => {
    if (!code.trim()) {
      setAnalysis(null);
      return;
    }
    
    setIsAnalyzing(true);
    try {
      const result = await analyzeCode(code, language, settings);
      setAnalysis(result);
    } catch (error) {
      console.error('Analysis failed:', error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleLanguageChange = (newLanguage) => {
    setLanguage(newLanguage);
    setAnalysis(null);
  };

  const handleExampleSelect = (example) => {
    setCode(example.code);
    setLanguage(example.language);
    setAnalysis(null);
  };

  const handleClearCode = () => {
    setCode('');
    setAnalysis(null);
  };

  useEffect(() => {
    if (!settings.autoAnalyze || !code.trim()) {
      if (!code.trim()) {
        setAnalysis(null);
      }
      return;
    }
    
    const timer = setTimeout(() => {
      handleAnalyze();
    }, settings.analysisDelay);

    return () => clearTimeout(timer);
  }, [code, language, settings.autoAnalyze, settings.analysisDelay, settings.strictMode]);

  const isDarkTheme = settings.theme === 'dark';

  return (
    <div className={`min-h-screen relative overflow-hidden transition-all duration-700 ${
      isDarkTheme 
        ? 'bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900' 
        : 'bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50'
    }`}>
      {/* Animated Background Elements */}
      <FloatingElements theme={settings.theme} />
      
      {/* Animated Grid Background */}
      <div className={`absolute inset-0 opacity-20 ${
        isDarkTheme ? 'bg-grid-white/[0.05]' : 'bg-grid-black/[0.05]'
      }`} />
      
      {/* Gradient Orbs */}
      <motion.div 
        className="absolute top-20 left-20 w-72 h-72 bg-gradient-to-r from-blue-400 to-purple-600 rounded-full mix-blend-multiply filter blur-xl opacity-30"
        animate={{
          x: [0, 100, 0],
          y: [0, -50, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      <motion.div 
        className="absolute top-40 right-20 w-96 h-96 bg-gradient-to-r from-purple-400 to-pink-600 rounded-full mix-blend-multiply filter blur-xl opacity-30"
        animate={{
          x: [0, -80, 0],
          y: [0, 60, 0],
          scale: [1, 0.8, 1],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      <motion.div 
        className="absolute bottom-20 left-1/2 w-80 h-80 bg-gradient-to-r from-cyan-400 to-blue-600 rounded-full mix-blend-multiply filter blur-xl opacity-30"
        animate={{
          x: [0, 120, 0],
          y: [0, -40, 0],
          rotate: [0, 180, 360],
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      <Toaster 
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: isDarkTheme ? '#1f2937' : '#ffffff',
            color: isDarkTheme ? '#f9fafb' : '#111827',
            border: isDarkTheme ? '1px solid #374151' : '1px solid #e5e7eb',
            borderRadius: '12px',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
          },
        }}
      />
      
      <Header 
        onSettingsClick={() => setShowSettings(true)}
        analysis={analysis}
        theme={settings.theme}
      />
      
      <main className="container mx-auto px-4 py-8 relative z-10">
        {/* New Layout: Vertical Examples Sidebar + Horizontal Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Sidebar - Vertical Examples & Categories */}
          <motion.div 
            className="lg:col-span-3 space-y-6"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Language Selector */}
            <motion.div 
              className={`rounded-2xl shadow-2xl p-6 border backdrop-blur-xl transition-all duration-500 ${
                isDarkTheme 
                  ? 'bg-gray-800/80 border-gray-700/50 shadow-purple-500/10' 
                  : 'bg-white/80 border-gray-200/50 shadow-purple-500/10'
              }`}
              whileHover={{ y: -2 }}
            >
              <h3 className={`text-lg font-bold mb-4 ${
                isDarkTheme ? 'text-gray-100' : 'text-gray-800'
              }`}>🚀 Language & Examples</h3>
              
              <div className="space-y-4">
                <LanguageSelector 
                  language={language} 
                  onLanguageChange={handleLanguageChange}
                  theme={settings.theme}
                />
                
                {/* Tab Selector - Vertical */}
                <div className="space-y-2">
                  <motion.button
                    onClick={() => setActiveTab('examples')}
                    className={`w-full px-4 py-3 rounded-lg text-sm font-medium transition-all duration-300 flex items-center space-x-3 ${
                      activeTab === 'examples' 
                        ? isDarkTheme
                          ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                          : 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg'
                        : isDarkTheme
                          ? 'text-gray-300 hover:text-gray-100 hover:bg-gray-700/50'
                          : 'text-gray-600 hover:text-gray-800 hover:bg-gray-100/50'
                    }`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <span className="text-lg">📝</span>
                    <span>Code Examples</span>
                  </motion.button>
                  
                  <motion.button
                    onClick={() => setActiveTab('dsa')}
                    className={`w-full px-4 py-3 rounded-lg text-sm font-medium transition-all duration-300 flex items-center space-x-3 ${
                      activeTab === 'dsa' 
                        ? isDarkTheme
                          ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg'
                          : 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg'
                        : isDarkTheme
                          ? 'text-gray-300 hover:text-gray-100 hover:bg-gray-700/50'
                          : 'text-gray-600 hover:text-gray-800 hover:bg-gray-100/50'
                    }`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <span className="text-lg">🧠</span>
                    <span>DSA Problems</span>
                  </motion.button>
                </div>
              </div>
            </motion.div>

            {/* Examples List - Vertical */}
            <motion.div 
              className={`rounded-2xl shadow-2xl border backdrop-blur-xl transition-all duration-500 ${
                isDarkTheme 
                  ? 'bg-gray-800/80 border-gray-700/50 shadow-blue-500/10' 
                  : 'bg-white/80 border-gray-200/50 shadow-blue-500/10'
              }`}
              whileHover={{ y: -2 }}
            >
              <div className="p-6">
                <h4 className={`text-lg font-bold mb-4 ${
                  isDarkTheme ? 'text-gray-100' : 'text-gray-800'
                }`}>
                  {activeTab === 'examples' ? '📝 Examples' : '🧠 DSA Problems'}
                </h4>
                
                <div className="space-y-3 max-h-96 overflow-y-auto custom-scrollbar">
                  {activeTab === 'examples' ? (
                    (codeExamples[language] || []).map((example, index) => (
                      <motion.button
                        key={index}
                        onClick={() => handleExampleSelect(example)}
                        className={`w-full text-left p-4 rounded-lg border transition-all duration-300 ${
                          isDarkTheme 
                            ? 'border-gray-600 hover:border-blue-500 hover:bg-gray-700/50' 
                            : 'border-gray-200 hover:border-blue-500 hover:bg-blue-50'
                        }`}
                        whileHover={{ scale: 1.02, x: 4 }}
                        whileTap={{ scale: 0.98 }}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <h5 className={`font-semibold text-sm ${
                              isDarkTheme ? 'text-gray-200' : 'text-gray-800'
                            }`}>{example.title}</h5>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                              example.difficulty === 'Beginner' ? 'bg-green-100 text-green-700' :
                              example.difficulty === 'Intermediate' ? 'bg-yellow-100 text-yellow-700' :
                              'bg-red-100 text-red-700'
                            }`}>
                              {example.difficulty}
                            </span>
                          </div>
                          <p className={`text-xs ${
                            isDarkTheme ? 'text-gray-400' : 'text-gray-600'
                          }`}>{example.description}</p>
                          <div className={`text-xs ${
                            isDarkTheme ? 'text-gray-500' : 'text-gray-500'
                          }`}>
                            {example.code.split('\n').length} lines
                          </div>
                        </div>
                      </motion.button>
                    ))
                  ) : (
                    (dsaExamples[language] || []).map((example, index) => (
                      <motion.button
                        key={index}
                        onClick={() => handleExampleSelect(example)}
                        className={`w-full text-left p-4 rounded-lg border transition-all duration-300 ${
                          isDarkTheme 
                            ? 'border-gray-600 hover:border-purple-500 hover:bg-gray-700/50' 
                            : 'border-gray-200 hover:border-purple-500 hover:bg-purple-50'
                        }`}
                        whileHover={{ scale: 1.02, x: 4 }}
                        whileTap={{ scale: 0.98 }}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <h5 className={`font-semibold text-sm ${
                              isDarkTheme ? 'text-gray-200' : 'text-gray-800'
                            }`}>{example.title}</h5>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                              example.difficulty === 'Easy' ? 'bg-green-100 text-green-700' :
                              example.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-700' :
                              'bg-red-100 text-red-700'
                            }`}>
                              {example.difficulty}
                            </span>
                          </div>
                          <p className={`text-xs ${
                            isDarkTheme ? 'text-gray-400' : 'text-gray-600'
                          }`}>{example.description}</p>
                          <div className={`text-xs ${
                            isDarkTheme ? 'text-gray-500' : 'text-gray-500'
                          }`}>
                            {example.category} • {example.code.split('\n').length} lines
                          </div>
                          {example.timeComplexity && (
                            <div className="text-xs text-blue-600">
                              Time: {example.timeComplexity}
                            </div>
                          )}
                        </div>
                      </motion.button>
                    ))
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Content - Horizontal Layout for Code Editor and Analysis */}
          <div className="lg:col-span-9 space-y-8">
            
            {/* Action Buttons */}
            <motion.div 
              className={`rounded-2xl shadow-2xl p-6 border backdrop-blur-xl transition-all duration-500 ${
                isDarkTheme 
                  ? 'bg-gray-800/80 border-gray-700/50 shadow-purple-500/10' 
                  : 'bg-white/80 border-gray-200/50 shadow-purple-500/10'
              }`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ y: -2 }}
            >
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
                <div className={`text-lg font-bold ${
                  isDarkTheme ? 'text-gray-100' : 'text-gray-800'
                }`}>
                  🤖 AI Code Analysis
                </div>
                
                <div className="flex flex-col sm:flex-row gap-3">
                  <motion.button
                    onClick={handleAnalyze}
                    disabled={isAnalyzing || !code.trim()}
                    className="relative px-8 py-3 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white rounded-xl 
                             hover:from-blue-700 hover:via-purple-700 hover:to-pink-700 disabled:opacity-50 disabled:cursor-not-allowed 
                             transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-xl shadow-purple-500/25
                             font-semibold text-sm overflow-hidden"
                    whileHover={{ 
                      boxShadow: '0 20px 40px -12px rgba(139, 92, 246, 0.4)',
                      y: -2
                    }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent"
                      animate={{
                        x: isAnalyzing ? ['-100%', '100%'] : '-100%',
                      }}
                      transition={{
                        duration: 1.5,
                        repeat: isAnalyzing ? Infinity : 0,
                        ease: "easeInOut"
                      }}
                    />
                    <span className="relative z-10">
                      {isAnalyzing ? 'AI Analyzing...' : '🤖 Analyze with AI'}
                    </span>
                  </motion.button>
                  
                  <motion.button
                    onClick={handleClearCode}
                    className={`px-6 py-3 border-2 rounded-xl transition-all duration-300 font-medium ${
                      isDarkTheme 
                        ? 'text-gray-300 hover:text-gray-100 border-gray-600 hover:border-red-500 hover:bg-red-500/10' 
                        : 'text-gray-600 hover:text-gray-800 border-gray-300 hover:border-red-500 hover:bg-red-50'
                    }`}
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Clear Code
                  </motion.button>
                </div>
              </div>
            </motion.div>

            {/* Horizontal Layout: Code Editor + Review Panel */}
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
              {/* Code Editor */}
              <motion.div 
                className="space-y-6"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <motion.div 
                  className={`rounded-2xl shadow-2xl p-6 border backdrop-blur-xl transition-all duration-500 ${
                    isDarkTheme 
                      ? 'bg-gray-800/80 border-gray-700/50 shadow-blue-500/10' 
                      : 'bg-white/80 border-gray-200/50 shadow-blue-500/10'
                  }`}
                  whileHover={{ y: -2 }}
                >
                  <div className="flex items-center justify-between mb-6">
                    <h2 className={`text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent`}>
                      🚀 AI Code Editor
                    </h2>
                    <div className={`flex items-center space-x-3 text-sm ${
                      isDarkTheme ? 'text-gray-400' : 'text-gray-500'
                    }`}>
                      <div className="flex items-center space-x-1">
                        <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                        <span>{code.split('\n').length} lines</span>
                      </div>
                      <span>•</span>
                      <span>{code.length} chars</span>
                    </div>
                  </div>
                  
                  <CodeEditor 
                    code={code}
                    language={language}
                    onChange={setCode}
                    settings={settings}
                  />
                </motion.div>
              </motion.div>

              {/* Review Panel */}
              <motion.div 
                className="space-y-6"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <ReviewPanel 
                  analysis={analysis}
                  isAnalyzing={isAnalyzing}
                  language={language}
                  onFixIssue={(fixedCode) => setCode(fixedCode)}
                  theme={settings.theme}
                />
              </motion.div>
            </div>

            {/* AI Features Panel - Horizontal */}
            <FeaturePanel
              code={code}
              language={language}
              analysis={analysis}
              theme={settings.theme}
              onCodeChange={setCode}
            />
          </div>
        </div>
      </main>

      {/* Settings Panel */}
      {showSettings && (
        <SettingsPanel
          settings={settings}
          onSettingsChange={setSettings}
          onClose={() => setShowSettings(false)}
        />
      )}

      {/* Custom Styles */}
      <style>{`
        .bg-grid-white\\/\\[0\\.05\\] {
          background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32' width='32' height='32' fill='none' stroke='rgb(255 255 255 / 0.05)'%3e%3cpath d='m0 .5h32m-32 32v-32'/%3e%3c/svg%3e");
        }
        .bg-grid-black\\/\\[0\\.05\\] {
          background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32' width='32' height='32' fill='none' stroke='rgb(0 0 0 / 0.05)'%3e%3cpath d='m0 .5h32m-32 32v-32'/%3e%3c/svg%3e");
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }
        
        @keyframes pulse-glow {
          0%, 100% { box-shadow: 0 0 20px rgba(139, 92, 246, 0.3); }
          50% { box-shadow: 0 0 40px rgba(139, 92, 246, 0.6); }
        }
        
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        
        .animate-pulse-glow {
          animation: pulse-glow 2s ease-in-out infinite;
        }

        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }

        .custom-scrollbar::-webkit-scrollbar-track {
          background: ${isDarkTheme ? '#374151' : '#f1f5f9'};
          border-radius: 3px;
        }

        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: ${isDarkTheme ? 'linear-gradient(45deg, #6b7280, #9ca3af)' : 'linear-gradient(45deg, #cbd5e1, #94a3b8)'};
          border-radius: 3px;
        }

        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: ${isDarkTheme ? 'linear-gradient(45deg, #9ca3af, #d1d5db)' : 'linear-gradient(45deg, #94a3b8, #64748b)'};
        }
      `}</style>
    </div>
  );
}

export default App;