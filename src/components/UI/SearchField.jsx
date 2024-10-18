import React from 'react'

const SearchField = ({...props}) => {
  return (
    <div>
        <input {...props} placeholder='Search'  className='w-full h-4 bg-secondary p-4 rounded-md transition ease-in-out focus:outline-none focus:ring focus:ring-gray-300'/>
    </div>
  )
}

export default SearchField
