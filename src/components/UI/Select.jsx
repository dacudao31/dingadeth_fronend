import React, { useState } from 'react';

const Select = ({ options, defaultValue = '', onChange, ...props }) => {
    const [selectedValue, setSelectedValue] = useState(defaultValue);

    const handleSelectChange = (event) => {
        const value = event.target.value;
        setSelectedValue(value);
        if (onChange) {
            onChange(value);
        }
    };

    return (
        <div {...props}>
            <select value={selectedValue} onChange={handleSelectChange} className='p-2 border rounded'>
                <option value='' disabled>
                    Select an option
                </option>
                {options.map((option, index) => (
                    <option key={index} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default Select;
