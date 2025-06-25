import React from 'react'

const NewsLetter = () => {
  return (
    <div className='flex flex-col items-center justify-center text-center space-y-2 my-32'>
        <h1 className='md:text-4xl text-2xl font-semibold'>Never Miss A Blog!</h1>
        <p className='md:text-lg text-gray-500 pb-8'>Subscribe to get the latest blogs, new tech, and exclusive content</p>
        <form className='flex items-center justify-between max-w-2xl w-full md:h-13
        h-12'>
            <input type="text" placeholder='Enter your email id' required 
            className='border border-gray-300 rounded-md h-full border-r-0
            outline-none w-full rounded-r-none px-3 text-gray-500'/>
            <button type='submit'
            className='md:px-12 px-8 h-full text-white bg-primary/100 hover:bg-right 
            transition-all cursor-pointer rounded-md rounded-l-none'>Subscribe</button>
        </form>
    </div>
  )
}

export default NewsLetter