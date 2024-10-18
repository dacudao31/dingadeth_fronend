import { useState } from 'react'
import { Outlet } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useUser } from './context/userProvider';

import { VisibilityOutlined, VisibilityOff, MoreHoriz} from '@mui/icons-material';

const Layout = () => {
    const [visible, setVisible] = useState(false);
    const navigate = useNavigate();
    const { user } = useUser();
    const key = localStorage.getItem('key');

    return (
        <main className='min-w-xl mx-auto px-4'>
            {/* <div className='w-full flex items-center justify-center'>
                <img src="/logo.png" alt="ding-adeth-logo" className='w-1/4'/>
            </div> */}
            <header className='desktop:px-5 mx-auto flex items-center justify-between pt-5 mb-5'>
                <div>
                    <h3 className='font-bold desktop:text-lg phone:text-md-lg'>Good Morning, {user.name}</h3>
                </div>
                <div onClick={() => navigate('more')} className='w-10 h-10 bg-grey rounded-lg flex items-center justify-center cursor-pointer hover:bg-gray-300 transition ease-in-out focus:ring focus:outline-none' tabIndex={0}> 
                    <MoreHoriz />
                </div>
            </header>
            <div className='max-w-2xl mx-auto'>
                <Outlet />
            </div>
        </main>
    )
}

export default Layout
