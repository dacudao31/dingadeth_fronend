import React from 'react';
import { ArrowBack } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const Back = ({ to, onClick }) => {
    const navigate = useNavigate();

    const handleClick = () => {
        if (onClick) {
            onClick();
        }
        if (to) {
            navigate(to);
        }
    };

    return (
        <div className='flex w-1/4 gap-2 items-center opacity-80 mt-5 cursor-pointer' onClick={handleClick}>
            <ArrowBack />
            <p>Back</p>
        </div>
    );
};

export default Back;
