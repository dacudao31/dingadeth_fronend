import React from 'react'
import { useNavigate } from 'react-router-dom'

// import TopLogo from '../../components/UI/TopLogo'
import Button from '../../components/UI/Button'

const SplashScreen = () => {
  const navigate = useNavigate();

  return (
      <main className='max-w-lg mx-auto justify-center p-5 flex flex-col h-screen items-center w-full  gap-5 '>
          <img className='desktop:w-80 phone:w-52' src='/logo.png' />
          <div className='text-center flex flex-col gap-5'>
              <h1 className='desktop:text-lg phone:text-md-lg font-bold'>Ding & Adeth’s<br/>Social Media Manager</h1>
              <p className='desktop:text-md desktop:p-5'>Experience the convenience of creating and managing all your social media posts in one app. Simplify your workflow and take control of your online presence with ease.</p>
              <Button onClick={() => navigate('/login')}>Get Started!</Button>
          </div>
      </main>
  )
}

export default SplashScreen
