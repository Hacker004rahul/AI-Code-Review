import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Settings, Zap, Eye, Clock, Shield, Palette, Sun, Moon } from 'lucide-react';

const SettingsPanel = ({ settings, onSettingsChange, onClose }) => {
  const updateSetting = (key, value) => {
    onSettingsChange({ ...settings, [key]: value });
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ duration: 0.2 }}
          className={`rounded-xl shadow-2xl w-full max-w-md ${
            settings.theme === 'dark' 
              ? 'bg-gray-800 text-white' 
              : 'bg-white text-gray-800'
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className={`flex items-center justify-between p-6 border-b ${
            settings.theme === 'dark' ? 'border-gray-700' : 'border-gray-200'
          }`}>
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <Settings className="w-5 h-5 text-white" />
              </div>
              <h2 className="text-xl font-semibold">Settings</h2>
            </div>
            <button
              onClick={onClose}
              className={`p-2 rounded-lg transition-colors ${
                settings.theme === 'dark' 
                  ? 'text-gray-400 hover:text-gray-200 hover:bg-gray-700' 
                  : 'text-gray-400 hover:text-gray-600 hover:bg-gray-100'
              }`}
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Settings Content */}
          <div className="p-6 space-y-6">
            {/* Theme Selection */}
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Palette className="w-5 h-5 text-purple-500" />
                <div>
                  <div className="font-medium">Theme</div>
                  <div className={`text-sm ${
                    settings.theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                  }`}>Choose your preferred theme</div>
                </div>
              </div>
              <div className="ml-8">
                <div className="flex space-x-2">
                  <button
                    onClick={() => updateSetting('theme', 'light')}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-lg border transition-all ${
                      settings.theme === 'light'
                        ? 'border-blue-500 bg-blue-50 text-blue-700'
                        : settings.theme === 'dark'
                        ? 'border-gray-600 bg-gray-700 text-gray-300 hover:bg-gray-600'
                        : 'border-gray-300 bg-gray-50 text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <Sun className="w-4 h-4" />
                    <span>Light</span>
                  </button>
                  <button
                    onClick={() => updateSetting('theme', 'dark')}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-lg border transition-all ${
                      settings.theme === 'dark'
                        ? 'border-blue-500 bg-blue-900 text-blue-300'
                        : 'border-gray-300 bg-gray-50 text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <Moon className="w-4 h-4" />
                    <span>Dark</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Auto Analysis */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Zap className="w-5 h-5 text-yellow-500" />
                <div>
                  <div className="font-medium">Auto Analysis</div>
                  <div className={`text-sm ${
                    settings.theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                  }`}>Automatically analyze code as you type</div>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.autoAnalyze}
                  onChange={(e) => updateSetting('autoAnalyze', e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>

            {/* Analysis Delay */}
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Clock className="w-5 h-5 text-blue-500" />
                <div>
                  <div className="font-medium">Analysis Delay</div>
                  <div className={`text-sm ${
                    settings.theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                  }`}>Delay before auto-analysis starts</div>
                </div>
              </div>
              <div className="ml-8">
                <input
                  type="range"
                  min="500"
                  max="3000"
                  step="250"
                  value={settings.analysisDelay}
                  onChange={(e) => updateSetting('analysisDelay', parseInt(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                />
                <div className={`flex justify-between text-xs mt-1 ${
                  settings.theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                }`}>
                  <span>0.5s</span>
                  <span>{settings.analysisDelay / 1000}s</span>
                  <span>3s</span>
                </div>
              </div>
            </div>

            {/* Strict Mode */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Shield className="w-5 h-5 text-red-500" />
                <div>
                  <div className="font-medium">Strict Mode</div>
                  <div className={`text-sm ${
                    settings.theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                  }`}>Enable stricter code analysis rules</div>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.strictMode}
                  onChange={(e) => updateSetting('strictMode', e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-red-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-red-600"></div>
              </label>
            </div>

            {/* Show Line Numbers */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Eye className="w-5 h-5 text-green-500" />
                <div>
                  <div className="font-medium">Line Numbers</div>
                  <div className={`text-sm ${
                    settings.theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                  }`}>Show line numbers in code editor</div>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.showLineNumbers}
                  onChange={(e) => updateSetting('showLineNumbers', e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
              </label>
            </div>
          </div>

          {/* Footer */}
          <div className={`px-6 py-4 rounded-b-xl ${
            settings.theme === 'dark' ? 'bg-gray-700' : 'bg-gray-50'
          }`}>
            <div className="flex justify-end space-x-3">
              <button
                onClick={onClose}
                className={`px-4 py-2 transition-colors ${
                  settings.theme === 'dark' 
                    ? 'text-gray-300 hover:text-white' 
                    : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                Cancel
              </button>
              <button
                onClick={onClose}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Save Changes
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default SettingsPanel;