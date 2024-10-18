import React from 'react';

const IconButton = ({ className = '', children, variant = 'default', icon, ...props }) => {
  const baseStyle = 'w-full font-bold justify-center rounded-md p-3 flex items-center gap-5 cursor-pointer focus:outline-none transition ease-in-out';

  const variantStyles = {
    default: 'bg-primary text-white hover:bg-[#B01313] focus:ring focus:ring-red-300',
    'default-outline': 'border-2 text-primary border-primary bg-transparent hover:bg-primary hover:text-white focus:ring focus:ring-green-300',
    secondary: 'bg-secondary hover:bg-[#cccccc] focus:ring focus:ring-gray-500'
  };

  const combinedClasses = `${baseStyle} ${variantStyles[variant]}`;

  return (
    <button className={combinedClasses} {...props}>
      {React.cloneElement(icon, { className: 'w-8 h-8 sm:w-5 sm:h-5 md:w-6 md:h-6' })}
      {children}
    </button>
  );
};

export default IconButton;
