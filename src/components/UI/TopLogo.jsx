import React from 'react'
import Logo from '/logo.png'

const TopLogo = () => {
  return (
    <div className='w-full flex items-center justify-center'>
      <img className='w-24' src={Logo} alt="logo" />
    </div>
  )
}

export default TopLogo
