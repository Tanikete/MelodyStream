import React from 'react'

const Button = () => {
  return (
    <>
     <div className='flex flex-row gap-4'>
          <div>
            <button noClick = {() => {}} className='bg-transperent text-neutral-300 font-medium py-2'>
              
              Sign up
            </button>
          </div>
          <div>
            <button noClick = {() => {}} className='bg-white px-6 py-2 rounded-full'>
              
              Login
            </button>
          </div>
        </div>
    
    </>
  )
}

export default Button