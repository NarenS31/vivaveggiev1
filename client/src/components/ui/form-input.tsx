import React from 'react';
import { motion } from 'framer-motion';

interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  info?: string;
}

const FormInput: React.FC<FormInputProps> = ({
  label,
  error,
  info,
  id,
  className,
  ...props
}) => {
  return (
    <div className="mb-4">
      <label 
        htmlFor={id} 
        className="block text-sm font-medium text-gray-700 mb-1"
      >
        {label}
      </label>
      
      <input
        id={id}
        className={`w-full p-2 border ${error ? 'border-red-500 bg-red-50' : 'border-gray-300'} 
          rounded focus:ring-2 focus:ring-green-500 focus:outline-none ${className || ''}`}
        {...props}
      />
      
      {error && (
        <motion.p 
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-red-600 text-sm mt-1 font-medium bg-red-50 px-2 py-1 rounded border-l-2 border-red-500"
        >
          ⚠️ {error}
        </motion.p>
      )}
      
      {info && !error && (
        <p className="text-sm text-gray-600 mt-1">{info}</p>
      )}
    </div>
  );
};

export default FormInput;