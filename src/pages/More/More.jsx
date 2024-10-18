import React from 'react'
import Button from '../../components/UI/Button'
import Back from '../../components/UI/Back';
import Link from '../../components/UI/Link'
import { AdminPanelSettingsRounded, GroupsRounded } from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'
import { useUser } from '../../context/userProvider';

const More = () => {
  const navigate = useNavigate();
  const { user, removeUser } = useUser();

  const iconStyling = {
    fontSize: 40
  }

  const logoutHandler = () => {
    removeUser();
    navigate('/');
  }

  return (
    <main className="relative min-h-screen flex flex-col gap-4 overflow-hidden">
      <Back to={'/profile'}/>
      {user.type === 0 ? (
        <section className="flex flex-col gap-3">
          <h3 className="text-md-lg font-bold">
            Post
          </h3>
          <Link to={'/profile/admins'}>
            <Button variant="secondary">
              <div>
                <AdminPanelSettingsRounded sx={iconStyling} />
                <h3 className="font-normal">Manage Admins</h3>
              </div>
            </Button>
          </Link>
          <a href="https://app.ayrshare.com/">
            <Button variant="secondary">
              <div>
                <GroupsRounded sx={iconStyling} />
                <h3 className="font-normal">Manage Accounts</h3>
              </div>
            </Button>
          </a>
        </section>
      ) : (
        <section>
          <div className='w-full flex justify-center items-center'>
            <img src="/logo.png" className='w-1/2' />
          </div>
          <h1 className='font-bold text-lg'>About this App</h1>
          <p>Social Media Manager for Ding-Adeth’s Pasalubong Shop is an online platform to enhance the Pasalubong shop by spreading their brands name and products, and gain a lot of audience by using different social media platforms. The system will serve as a platform for the Ding-Adeth’s Pasalubong Shop integrating through various social media platforms. The manager will create a post and it will be posted on the system and also to the selected or chosen social media platform. Product and brand name would be posted on the selected social media. Instead of creating a post in every social media platform, in this system the manager will only create a single post and it will directly posted on which social media platform the manager desire to select.</p>
        </section>
      )}

      <Button 
        variant="default-outline" 
        className="absolute bottom-28 w-full"
        onClick={logoutHandler}
      > 
        Logout
      </Button>
      
    </main>
  )
}

export default More
