import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import Prism from 'prismjs';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-python';
import 'prismjs/components/prism-java';
import 'prismjs/components/prism-csharp';
import 'prismjs/components/prism-c';
import 'prismjs/components/prism-cpp';
import 'prismjs/components/prism-typescript';
import 'prismjs/components/prism-jsx';
import 'prismjs/components/prism-go';
import 'prismjs/components/prism-rust';

const CodeEditor = ({ code, language, onChange, settings }) => {
  const textareaRef = useRef(null);
  const highlightRef = useRef(null);
  const lineNumbersRef = useRef(null);
  const containerRef = useRef(null);
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    if (highlightRef.current) {
      try {
        Prism.highlightElement(highlightRef.current);
      } catch (error) {
        console.warn('Prism highlighting failed:', error);
      }
    }
  }, [code, language]);

  const handleScroll = (e) => {
    const scrollTop = e.target.scrollTop;
    const scrollLeft = e.target.scrollLeft;
    
    if (highlightRef.current) {
      highlightRef.current.scrollTop = scrollTop;
      highlightRef.current.scrollLeft = scrollLeft;
    }
    if (lineNumbersRef.current) {
      lineNumbersRef.current.scrollTop = scrollTop;
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Tab') {
      e.preventDefault();
      const start = e.target.selectionStart;
      const end = e.target.selectionEnd;
      const newValue = code.substring(0, start) + '  ' + code.substring(end);
      onChange(newValue);
      
      setTimeout(() => {
        if (textareaRef.current) {
          textareaRef.current.selectionStart = textareaRef.current.selectionEnd = start + 2;
        }
      }, 0);
    }
  };

  const handleInput = (e) => {
    onChange(e.target.value);
  };

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  const getFileExtension = () => {
    const extensions = {
      javascript: 'js',
      typescript: 'ts',
      python: 'py',
      java: 'java',
      csharp: 'cs',
      cpp: 'cpp',
      c: 'c',
      go: 'go',
      rust: 'rs'
    };
    return extensions[language] || 'txt';
  };

  const lineCount = Math.max(1, code.split('\n').length);
  const lineNumbers = Array.from({ length: lineCount }, (_, i) => i + 1);

  const isDarkTheme = settings.theme === 'dark';

  return (
    <motion.div 
      className="relative"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div 
        ref={containerRef}
        className={`relative border rounded-lg overflow-hidden transition-all duration-200 ${
          isDarkTheme 
            ? `bg-gray-900 ${isFocused ? 'border-blue-400 ring-2 ring-blue-400/30' : 'border-gray-600'}`
            : `bg-gray-50 ${isFocused ? 'border-blue-500 ring-2 ring-blue-200' : 'border-gray-300'}`
        }`}
      >
        {/* Editor Header */}
        <div className={`flex items-center justify-between px-4 py-3 border-b ${
          isDarkTheme 
            ? 'bg-gradient-to-r from-gray-800 to-gray-700 border-gray-600' 
            : 'bg-gradient-to-r from-gray-100 to-gray-200 border-gray-300'
        }`}>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-red-400 rounded-full"></div>
            <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
            <div className="w-3 h-3 bg-green-400 rounded-full"></div>
          </div>
          <div className={`text-xs font-mono px-2 py-1 rounded ${
            isDarkTheme 
              ? 'bg-gray-800 text-gray-300' 
              : 'bg-white text-gray-600'
          }`}>
            main.{getFileExtension()}
          </div>
        </div>
        
        <div className="relative flex min-h-[320px]">
          {/* Line Numbers */}
          {settings.showLineNumbers && (
            <div 
              ref={lineNumbersRef}
              className={`flex-shrink-0 w-12 border-r overflow-hidden select-none ${
                isDarkTheme 
                  ? 'bg-gray-800 border-gray-600' 
                  : 'bg-gray-100 border-gray-200'
              }`}
            >
              <div className={`p-4 font-mono text-xs leading-6 ${
                isDarkTheme ? 'text-gray-400' : 'text-gray-500'
              }`}>
                {lineNumbers.map(num => (
                  <div key={num} className="text-right h-6 flex items-center justify-end">
                    {num}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Code Area Container */}
          <div className="relative flex-1 overflow-hidden">
            {/* Input Textarea */}
            <textarea
              ref={textareaRef}
              value={code}
              onChange={handleInput}
              onScroll={handleScroll}
              onKeyDown={handleKeyDown}
              onFocus={handleFocus}
              onBlur={handleBlur}
              className={`absolute inset-0 w-full h-full p-4 font-mono text-sm resize-none outline-none z-20 overflow-auto ${
                isDarkTheme 
                  ? 'bg-gray-900 text-gray-100 caret-gray-100' 
                  : 'bg-white text-gray-900 caret-gray-900'
              }`}
              style={{ 
                lineHeight: '1.5',
                whiteSpace: 'pre-wrap',
                wordWrap: 'break-word',
                fontFamily: "'Monaco', 'Menlo', 'Ubuntu Mono', 'Consolas', 'Courier New', monospace",
                color: isDarkTheme ? '#f9fafb' : '#111827'
              }}
              spellCheck="false"
              placeholder={!code ? "Paste your code here or select an example..." : ""}
              autoComplete="off"
              autoCorrect="off"
              autoCapitalize="off"
            />

            {/* Syntax Highlighted Background */}
            <pre
              ref={highlightRef}
              className={`absolute inset-0 p-4 font-mono text-sm overflow-auto pointer-events-none z-10 ${
                isDarkTheme ? 'bg-gray-900' : 'bg-white'
              }`}
              style={{ 
                margin: 0,
                lineHeight: '1.5',
                whiteSpace: 'pre-wrap',
                wordWrap: 'break-word',
                opacity: code ? 0.3 : 0,
                fontFamily: "'Monaco', 'Menlo', 'Ubuntu Mono', 'Consolas', 'Courier New', monospace"
              }}
              aria-hidden="true"
            >
              <code className={`language-${language} ${isDarkTheme ? 'dark-theme' : ''}`}>
                {code || ' '}
              </code>
            </pre>
          </div>
        </div>

        {/* Editor Footer */}
        <div className={`px-4 py-2 border-t flex justify-between items-center text-xs ${
          isDarkTheme 
            ? 'bg-gray-800 border-gray-600 text-gray-400' 
            : 'bg-gray-50 border-gray-200 text-gray-500'
        }`}>
          <div className="flex items-center space-x-4">
            <span>Language: <span className="font-medium">{language}</span></span>
            <span>Encoding: UTF-8</span>
            {isFocused && <span className="text-blue-500">● Editing</span>}
          </div>
          <div className="flex items-center space-x-4">
            <span>Lines: {lineCount}</span>
            <span>Characters: {code.length}</span>
            <span>Words: {code.trim() ? code.trim().split(/\s+/).length : 0}</span>
          </div>
        </div>
      </div>

      {/* Enhanced Custom Styles */}
      <style>{`
        /* Ensure textarea is always visible with proper colors */
        textarea {
          background-color: ${isDarkTheme ? '#111827' : '#ffffff'} !important;
          color: ${isDarkTheme ? '#f9fafb' : '#111827'} !important;
          font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', 'Consolas', 'Courier New', monospace !important;
          font-variant-ligatures: none;
          font-feature-settings: normal;
        }

        /* Placeholder styling */
        textarea::placeholder {
          color: ${isDarkTheme ? '#6b7280' : '#9ca3af'} !important;
          opacity: 1;
        }

        /* Dark theme syntax highlighting */
        ${isDarkTheme ? `
          .dark-theme .token.comment,
          .dark-theme .token.prolog,
          .dark-theme .token.doctype,
          .dark-theme .token.cdata {
            color: #6b7280;
          }

          .dark-theme .token.punctuation {
            color: #d1d5db;
          }

          .dark-theme .token.property,
          .dark-theme .token.tag,
          .dark-theme .token.boolean,
          .dark-theme .token.number,
          .dark-theme .token.constant,
          .dark-theme .token.symbol,
          .dark-theme .token.deleted {
            color: #f87171;
          }

          .dark-theme .token.selector,
          .dark-theme .token.attr-name,
          .dark-theme .token.string,
          .dark-theme .token.char,
          .dark-theme .token.builtin,
          .dark-theme .token.inserted {
            color: #34d399;
          }

          .dark-theme .token.operator,
          .dark-theme .token.entity,
          .dark-theme .token.url,
          .dark-theme .language-css .token.string,
          .dark-theme .style .token.string {
            color: #fbbf24;
          }

          .dark-theme .token.atrule,
          .dark-theme .token.attr-value,
          .dark-theme .token.keyword {
            color: #a78bfa;
            font-weight: 600;
          }

          .dark-theme .token.function,
          .dark-theme .token.class-name {
            color: #60a5fa;
            font-weight: 600;
          }

          .dark-theme .token.regex,
          .dark-theme .token.important,
          .dark-theme .token.variable {
            color: #f87171;
          }
        ` : ''}

        /* Custom scrollbar */
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
          height: 8px;
        }

        .custom-scrollbar::-webkit-scrollbar-track {
          background: ${isDarkTheme ? '#374151' : '#f1f5f9'};
          border-radius: 4px;
        }

        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: ${isDarkTheme ? 'linear-gradient(45deg, #6b7280, #9ca3af)' : 'linear-gradient(45deg, #cbd5e1, #94a3b8)'};
          border-radius: 4px;
        }

        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: ${isDarkTheme ? 'linear-gradient(45deg, #9ca3af, #d1d5db)' : 'linear-gradient(45deg, #94a3b8, #64748b)'};
        }

        /* Fix for mobile devices */
        @media (max-width: 768px) {
          textarea {
            font-size: 16px;
          }
        }
      `}</style>
    </motion.div>
  );
};

export default CodeEditor;