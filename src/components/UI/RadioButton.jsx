import React, { useState } from 'react';
import { motion } from 'framer-motion';

const RadioButton = ({ value, checked, onChange, children, className, variant = 'secondary' }) => {
  const [isFocused, setIsFocused] = useState(false);

  const baseStyle = 'w-full font-bold rounded-md p-2 cursor-pointer focus:outline-none transition ease-in-out';

  const variantStyles = {
    primary: 'bg-primary text-white font-bold hover:bg-[#B01313] focus:ring focus:ring-black',
    secondary: 'bg-secondary text-black hover:bg-[#c0c0c0] font-normal focus:text-normal focus:ring focus:ring-gray-400',
  };

  const combinedClasses = `${baseStyle} ${variantStyles[checked || isFocused ? 'primary' : 'secondary']} ${className}`;

  return (
    <motion.label
      whileTap={{ scale: 0.9 }}
      className={`flex items-center justify-center ${combinedClasses}`}
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
    >
      <input
        type="radio"
        value={value}
        checked={checked}
        onChange={onChange}
        className="hidden"
      />
      {children}
    </motion.label>
  );
};

export default RadioButton;
