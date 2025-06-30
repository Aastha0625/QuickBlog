import React from 'react'
import {assets} from '../../assets/assets'
import {Outlet, useNavigate} from 'react-router-dom';
import Sidebar from '../../components/admin/Sidebar';

const Layout = () => {

  const navigate = useNavigate();
  const logout = () =>{
    navigate('/');
  }

  return (
    <>
    <div className='flex items-center justify-between py-2 h-[75px] px-4 sm:px-12 
    border-b border-gray-300'>
      <img src={assets.logo} alt="" className='w-32 sm:-w-40 cursor-pointer' 
      onClick={() => navigate('/')}/>
      <button className='flex items-center gap-2 rounded-full bg-primary
       text-white 
        text-sm cursor-pointer px-10 py-2.5' onClick={logout}>Logout</button>
    </div>
    <div className='flex h-[calc(100vh-70px)]'>
      <Sidebar/>
      <Outlet/>
    </div>
    </>  )
}

export default Layout