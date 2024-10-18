import React from 'react'
import { motion } from "framer-motion"
import CircularProgress from '@mui/material/CircularProgress';

const Button = ({className, isLoading = false, children, variant = 'default',...props}) => {
  
  const baseStyle = 'w-full font-bold flex items-center justify-center rounded-md p-3 cursor-pointer focus:outline-none transition ease-in-out';
  
  const variantStyles = {
    default: 'bg-primary text-white hover:bg-[#B01313] focus:ring focus:ring-black',
    'default-outline': 'border-2 text-primary border-primary bg-transparent focus:ring focus:ring-primary',
    'red-outline': 'border-2 text-white border-[#E22C2C] bg-transparent focus:ring focus:ring-[#C81D1D]',
    secondary: 'bg-secondary text-black hover:bg-[#c0c0c0] focus:ring focus:ring-gray-400',
    black: 'bg-[#303030] text-white hover:bg-[#5E5E5E] focus:ring focus:ring-gray-400',
    red: 'bg-[#E22C2C] text-white hover:bg-[#C81D1D] focus:ring focus:ring-[#E22C2C]',
    warning: 'bg-red-400 text-white hover:bg-[#ea6a6a] focus:ring focus:ring-red-300',
    disabled: 'bg-secondary text-gray-300 disabled',
  };
  
  const combinedClasses = `${baseStyle} ${variantStyles[variant]} ${className}`

  return (
    <div>
      <motion.button 
        whileTap={{ scale: 0.9 }}
        className={combinedClasses} {...props}>
        {isLoading ? (
          <CircularProgress size="20px" sx={{color: 'white'}}/>
        ) : (children)}
      </motion.button>
    </div>
  )
}

export default Button
