import React from 'react'
import { useNavigate } from 'react-router-dom'

const Link = ({ children, to, ...props }) => {
    const navigate = useNavigate();
    return (
        <div>
            <a {...props} onClick={() => navigate(to)} className='text-primary hover:underline focus:underline cursor-pointer'>{children}</a>
        </div>
  )
}

export default Link
