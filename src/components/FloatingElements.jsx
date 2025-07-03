import React from 'react';
import { motion } from 'framer-motion';
import { Code, Zap, Star, Sparkles, Brain, Cpu, Database, Globe } from 'lucide-react';

const FloatingElements = ({ theme }) => {
  const isDarkTheme = theme === 'dark';
  
  const icons = [
    { Icon: Code, color: 'text-blue-400', delay: 0 },
    { Icon: Zap, color: 'text-yellow-400', delay: 0.5 },
    { Icon: Star, color: 'text-purple-400', delay: 1 },
    { Icon: Sparkles, color: 'text-pink-400', delay: 1.5 },
    { Icon: Brain, color: 'text-green-400', delay: 2 },
    { Icon: Cpu, color: 'text-cyan-400', delay: 2.5 },
    { Icon: Database, color: 'text-indigo-400', delay: 3 },
    { Icon: Globe, color: 'text-orange-400', delay: 3.5 },
  ];

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Floating Icons */}
      {icons.map(({ Icon, color, delay }, index) => (
        <motion.div
          key={index}
          className={`absolute ${color} opacity-20`}
          initial={{ 
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            scale: 0,
            rotate: 0
          }}
          animate={{
            y: [0, -30, 0],
            x: [0, Math.random() * 100 - 50, 0],
            scale: [0.5, 1, 0.5],
            rotate: [0, 360, 0],
          }}
          transition={{
            duration: 8 + Math.random() * 4,
            repeat: Infinity,
            delay: delay,
            ease: "easeInOut"
          }}
          style={{
            left: `${10 + (index * 12)}%`,
            top: `${10 + (index * 8)}%`,
          }}
        >
          <Icon size={24 + Math.random() * 16} />
        </motion.div>
      ))}

      {/* Floating Particles */}
      {Array.from({ length: 20 }).map((_, index) => (
        <motion.div
          key={`particle-${index}`}
          className={`absolute w-1 h-1 rounded-full ${
            isDarkTheme ? 'bg-white' : 'bg-gray-400'
          } opacity-30`}
          initial={{
            x: Math.random() * window.innerWidth,
            y: window.innerHeight + 10,
          }}
          animate={{
            y: -10,
            x: Math.random() * window.innerWidth,
          }}
          transition={{
            duration: 10 + Math.random() * 10,
            repeat: Infinity,
            delay: Math.random() * 5,
            ease: "linear"
          }}
        />
      ))}

      {/* Geometric Shapes */}
      {Array.from({ length: 8 }).map((_, index) => (
        <motion.div
          key={`shape-${index}`}
          className={`absolute border-2 ${
            isDarkTheme ? 'border-purple-500/20' : 'border-blue-500/20'
          } opacity-30`}
          style={{
            width: 40 + Math.random() * 60,
            height: 40 + Math.random() * 60,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            borderRadius: Math.random() > 0.5 ? '50%' : '0%',
          }}
          animate={{
            rotate: [0, 360],
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.3, 0.1],
          }}
          transition={{
            duration: 15 + Math.random() * 10,
            repeat: Infinity,
            delay: Math.random() * 5,
            ease: "easeInOut"
          }}
        />
      ))}

      {/* Code Snippets Floating */}
      {['{ }', '< />', '( )', '[ ]', '===', '=>', '&&', '||'].map((snippet, index) => (
        <motion.div
          key={`snippet-${index}`}
          className={`absolute text-xs font-mono ${
            isDarkTheme ? 'text-gray-500' : 'text-gray-400'
          } opacity-20 select-none`}
          initial={{
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            scale: 0,
          }}
          animate={{
            y: [0, -50, 0],
            scale: [0.8, 1.2, 0.8],
            opacity: [0.1, 0.3, 0.1],
          }}
          transition={{
            duration: 12 + Math.random() * 6,
            repeat: Infinity,
            delay: Math.random() * 8,
            ease: "easeInOut"
          }}
          style={{
            left: `${5 + (index * 11)}%`,
            top: `${15 + (index * 9)}%`,
          }}
        >
          {snippet}
        </motion.div>
      ))}

      {/* Glowing Dots */}
      {Array.from({ length: 15 }).map((_, index) => (
        <motion.div
          key={`dot-${index}`}
          className="absolute w-2 h-2 rounded-full bg-gradient-to-r from-blue-400 to-purple-600 opacity-40"
          initial={{
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
          }}
          animate={{
            scale: [1, 2, 1],
            opacity: [0.2, 0.6, 0.2],
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            repeat: Infinity,
            delay: Math.random() * 3,
            ease: "easeInOut"
          }}
        />
      ))}
    </div>
  );
};

export default FloatingElements;