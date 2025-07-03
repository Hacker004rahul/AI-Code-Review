import React from 'react';
import { motion } from 'framer-motion';
import { BarChart3, TrendingUp, Clock, Users, Shield, Zap } from 'lucide-react';

const CodeMetrics = ({ metrics, theme }) => {
  const isDarkTheme = theme === 'dark';

  const metricCards = [
    {
      title: 'Code Coverage',
      value: `${metrics.coverage || 85}%`,
      icon: Shield,
      color: 'text-green-500',
      bgColor: isDarkTheme ? 'bg-green-900/20' : 'bg-green-50',
      borderColor: 'border-green-500/30'
    },
    {
      title: 'Performance Score',
      value: `${metrics.performance || 92}`,
      icon: Zap,
      color: 'text-yellow-500',
      bgColor: isDarkTheme ? 'bg-yellow-900/20' : 'bg-yellow-50',
      borderColor: 'border-yellow-500/30'
    },
    {
      title: 'Technical Debt',
      value: `${metrics.techDebt || 12}h`,
      icon: Clock,
      color: 'text-orange-500',
      bgColor: isDarkTheme ? 'bg-orange-900/20' : 'bg-orange-50',
      borderColor: 'border-orange-500/30'
    },
    {
      title: 'Readability',
      value: `${metrics.readability || 88}%`,
      icon: Users,
      color: 'text-blue-500',
      bgColor: isDarkTheme ? 'bg-blue-900/20' : 'bg-blue-50',
      borderColor: 'border-blue-500/30'
    }
  ];

  return (
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
          <BarChart3 className="w-6 h-6 mr-3 text-purple-500" />
        </motion.div>
        <h3 className={`text-xl font-bold ${
          isDarkTheme ? 'text-gray-100' : 'text-gray-800'
        }`}>Advanced Metrics</h3>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {metricCards.map((metric, index) => (
          <motion.div
            key={metric.title}
            className={`p-4 rounded-xl border ${metric.bgColor} ${metric.borderColor}`}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.05, y: -2 }}
          >
            <div className="flex items-center justify-between mb-2">
              <metric.icon className={`w-5 h-5 ${metric.color}`} />
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity, delay: index * 0.3 }}
              >
                <TrendingUp className="w-4 h-4 text-gray-400" />
              </motion.div>
            </div>
            <div className={`text-2xl font-bold ${metric.color} mb-1`}>
              {metric.value}
            </div>
            <div className={`text-xs ${
              isDarkTheme ? 'text-gray-400' : 'text-gray-600'
            }`}>
              {metric.title}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Progress Bars */}
      <div className="mt-6 space-y-4">
        {[
          { label: 'Code Quality', value: 85, color: 'bg-green-500' },
          { label: 'Security', value: 92, color: 'bg-blue-500' },
          { label: 'Performance', value: 78, color: 'bg-yellow-500' },
          { label: 'Maintainability', value: 88, color: 'bg-purple-500' }
        ].map((item, index) => (
          <div key={item.label} className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className={isDarkTheme ? 'text-gray-300' : 'text-gray-700'}>
                {item.label}
              </span>
              <span className={isDarkTheme ? 'text-gray-400' : 'text-gray-500'}>
                {item.value}%
              </span>
            </div>
            <div className={`w-full h-2 rounded-full ${
              isDarkTheme ? 'bg-gray-700' : 'bg-gray-200'
            }`}>
              <motion.div
                className={`h-2 rounded-full ${item.color}`}
                initial={{ width: 0 }}
                animate={{ width: `${item.value}%` }}
                transition={{ duration: 1, delay: index * 0.2 }}
              />
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default CodeMetrics;