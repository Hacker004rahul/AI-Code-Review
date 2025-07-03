import React from 'react';
import { ChevronDown } from 'lucide-react';
import { motion } from 'framer-motion';

const languages = [
  { value: 'javascript', label: 'JavaScript', icon: '🟨', color: 'bg-yellow-100 text-yellow-800' },
  { value: 'typescript', label: 'TypeScript', icon: '🔷', color: 'bg-blue-100 text-blue-800' },
  { value: 'python', label: 'Python', icon: '🐍', color: 'bg-green-100 text-green-800' },
  { value: 'java', label: 'Java', icon: '☕', color: 'bg-orange-100 text-orange-800' },
  { value: 'csharp', label: 'C#', icon: '🔷', color: 'bg-purple-100 text-purple-800' },
  { value: 'cpp', label: 'C++', icon: '⚡', color: 'bg-red-100 text-red-800' },
  { value: 'go', label: 'Go', icon: '🐹', color: 'bg-cyan-100 text-cyan-800' },
  { value: 'rust', label: 'Rust', icon: '🦀', color: 'bg-orange-100 text-orange-800' },
];

const LanguageSelector = ({ language, onLanguageChange, theme }) => {
  const currentLanguage = languages.find(lang => lang.value === language);
  const isDarkTheme = theme === 'dark';

  return (
    <motion.div 
      className="relative"
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <select
        value={language}
        onChange={(e) => onLanguageChange(e.target.value)}
        className={`appearance-none border rounded-lg px-4 py-2 pr-10 text-sm font-medium cursor-pointer transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
          isDarkTheme 
            ? 'bg-gray-700 border-gray-600 text-gray-200 hover:border-blue-400' 
            : 'bg-white border-gray-300 text-gray-700 hover:border-blue-500'
        }`}
      >
        {languages.map((lang) => (
          <option key={lang.value} value={lang.value}>
            {lang.icon} {lang.label}
          </option>
        ))}
      </select>
      <ChevronDown className={`absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 pointer-events-none ${
        isDarkTheme ? 'text-gray-400' : 'text-gray-400'
      }`} />
      
      {/* Language indicator */}
      {currentLanguage && (
        <motion.div 
          className={`absolute -top-2 -right-2 px-2 py-1 rounded-full text-xs font-medium ${
            isDarkTheme ? 'bg-gray-600 text-gray-200' : currentLanguage.color
          }`}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.2 }}
        >
          {currentLanguage.icon}
        </motion.div>
      )}
    </motion.div>
  );
};

export default LanguageSelector;