import React from 'react';
import { motion } from 'framer-motion';

interface LoadingStateProps {
  message?: string;
}

const LoadingState: React.FC<LoadingStateProps> = ({ message = 'Loading...' }) => {
  const dotVariants = {
    initial: { y: 0 },
    animate: { y: [-5, 0, -5] }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[200px]">
      <div className="flex space-x-2 mb-4">
        {[0, 1, 2].map((dot, index) => (
          <motion.div
            key={dot}
            className="w-3 h-3 bg-blue-600 rounded-full"
            variants={dotVariants}
            initial="initial"
            animate="animate"
            transition={{
              duration: 1.5,
              repeat: Infinity,
              delay: index * 0.2
            }}
          />
        ))}
      </div>
      <motion.p 
        className="text-gray-600"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {message}
      </motion.p>
    </div>
  );
};

export default LoadingState; 