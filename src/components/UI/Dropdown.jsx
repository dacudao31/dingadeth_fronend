import React, { useState, forwardRef } from 'react';

const Dropdown = forwardRef(({ title, options, variant = 'default', className, ...props }, ref) => {
    const [selectedOption, setSelectedOption] = useState("Select Your Barangay");

    const baseStyle = 'w-full h-10 bg-secondary text-black px-3 py-2 rounded-md transition ease-in-out focus:outline-none cursor-pointer';

    const variantStyles = {
        default: 'focus:ring focus:ring-gray-300',
        alert: 'ring ring-red-400'
    };

    const combinedClasses = `${baseStyle} ${variantStyles[variant]} ${className}`;

    const handleSelectChange = (event) => {
        setSelectedOption(event.target.value);
    };

    return (
        <div>
            <h1 className='text-sm font-bold'>{title}</h1>
            <select 
            {...props} 
            ref={ref} 
            value={selectedOption} 
            onChange={handleSelectChange} 
            className={combinedClasses}
            >
                <option disabled value="Select Your Barangay">Select Your Barangay</option>
                {options.map((option, index) => (
                    <option key={index} value={option}>{option}</option>
                ))}
            </select>
        </div>
    );
});

export default Dropdown;
