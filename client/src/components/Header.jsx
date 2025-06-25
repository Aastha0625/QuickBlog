import React from 'react'
import { assets } from '../assets/assets.js'

const Header = () => {
  return (
    <div className='mx-8 sm:mx-16 xl:mx-24 relative'>
        <div className='text-center mt-20 mb-8 '>
            <div className='inline-flex items-center justify-center top-0.5 bottom-1 gap-4 px-6 py-1.5 mb- border border-primary/40 bg-primary/10 rounded-full text-m text-primary'>
                <p>New : AI feature integrated</p>
                <img src={assets.star_icon} alt="" className='w-2.5' />
            </div>
            <h1 className='text-4xl sm:text-7xl font-semibold sm:leading-[5rem] text-gray-700'>
                Your own <span className='text-primary'>blogging</span> <br />platform</h1>

                <p className=" my-6 sm:my-8 mt-6 max-w-2xl m-auto text-center text-gray-600 text-base sm:text-lg">
                This is your space to think out loud, to share what matters, and to write without filters. 
                Whether it's one word or a thousand, your story starts right here.
                </p>

            <form className='flex justify-between max-w-lg max-sm:scale-75 mx-auto border border-gray-300 bg-white rounded overflow-hidden'>
                <input type="text" placeholder='Search for blogs' required
                className='w-full pl-4 outline-none'/>
                 <button type='submit' className='bg-primary text-white px-8 py-2 m-1.5 rounded hover:scale-105 transition-all 
                cursor-pointer'>Search</button>
            </form>
        </div>
        <img src={assets.gradientBackground} alt="" className='absolute -top-16 sm:-top-32 -z-10 opacity-50 w-full pointer-events-none select-none' />
    </div>
  )
}

export default Header