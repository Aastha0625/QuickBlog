import React, { useEffect, useState } from 'react'
import {assets, dashboard_data} from '../../assets/assets'
import Blog_table_item from '../../components/admin/Blog_table_item'
import { useAppContext } from '../../context/AppContext'
import toast from 'react-hot-toast'

const Dashboard = () => {

  const [dashData , setDashData] = useState({
    blogs : 0,
    comments : 0,
    drafts : 0,
    recentBlogs : [],
  })

  const [loading, setLoading] = useState(true);
  
const token = localStorage.getItem("token");
console.log("Dashboard token:", token);

  const {axios} = useAppContext();  
  const fetchDash = async () => {
  try {
    setLoading(true)
    const {data} = await axios.get('/api/admin/dashboard')
    console.log("API Response:", data);
    
    if(data.success) {
      // Handle both possible property names
      const dashboardData = data.dashboardData || data.dashData;
      setDashData({
        ...dashboardData,
        recentBlogs: dashboardData.recentBlogs || []
      });
    } else {
      toast.error(data.message);
    }
  } catch (error) {
    console.error("Dashboard fetch error:", error);
    toast.error('Failed to fetch dashboard data');
  } finally {
    setLoading(false)
  }
}
  useEffect(()=>{
    fetchDash();
  },[])

  return (
    <div className='flex-1 p-4 md:p-10 bg-blue-50/50'>
      <div className='flex flex-wrap gap-4'>
        <div className='flex items-center gap-4 bg-white p-4 min-w-58 rounded
        shadow cursor-pointer hover:scale-105 transition-all'>
          <img src={assets.dashboard_icon_1} alt="" />
        <div>
          <p className='text-xl font-semibold text-gray-600'>{dashData.blogs}</p>
          <p className='text-gray-400 font-light'>Blogs</p>
        </div>
        </div>

        <div className='flex items-center gap-4 bg-white p-4 min-w-58 rounded
        shadow cursor-pointer hover:scale-105 transition-all'>
          <img src={assets.dashboard_icon_2} alt="" />
        <div>
          <p className='text-xl font-semibold text-gray-600'>{dashData.comments}</p>
          <p className='text-gray-400 font-light'>Comments</p>
        </div>
        </div>

        <div className='flex items-center gap-4 bg-white p-4 min-w-58 rounded
        shadow cursor-pointer hover:scale-105 transition-all'>
          <img src={assets.dashboard_icon_3} alt="" />
        <div>
          <p className='text-xl font-semibold text-gray-600'>{dashData.drafts}</p>
          <p className='text-gray-400 font-light'>Drafts</p>
        </div>
        </div>
      </div>

      <div>
        <div className='flex items-center gap-3 mt-6 text-gray-600'>
        <img src={assets.dashboard_icon_4} alt="" />
        <p>Latest Blogs</p>
        </div>

        <div className='relative max-w-4xl overflow-x-auto shadow rounded-lg
        scrollbar-hide bg-white'>
          <table className='w-full text-sm text-gray-500'>
            <thead className='text-s text-gray-600 text-left uppercase'>
              <tr>
                <th scope='col' className='px-2 py-4 xl:px-6'> # </th>
                <th scope='col' className='px-2 py-4'> Blog title </th>
                <th scope='col' className='px-2 py-4 max:sm-hidden'> Date </th>
                <th scope='col' className='px-2 py-4 max:sm-hidden'> Status </th>
                <th scope='col' className='px-2 py-4'> Actions </th>
              </tr>
            </thead>
            <tbody>
              {dashData.recentBlogs.map((blog,index) => {
                return <Blog_table_item key={blog._id} blog={blog}
                fetchBlogs={fetchDash} index={index + 1}/>
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default Dashboard