import React, { useState, useEffect } from 'react'
import { comments_data } from '../../assets/assets'
import Comment_table_item from '../../components/admin/Comment_table_item'
import { useAppContext } from '../../context/AppContext'
import toast from 'react-hot-toast'

const Comments = () => {

  const [ comments , setComment ] = useState([])
  const [ filter, seFilter] = useState('Not approved')

  const {axios} = useAppContext();
  const fetchComments = async ()=>{
    try {
      const {data} = await axios.get('/api/admin/comments')
      if(data.success) {
        setComment(data.comments)
      } else {
        toast.error("Failed to fetch comments:", data.message);
      }
    } catch (error) {
      toast.error("Error fetching comments:", error.message);
    }
  }

  useEffect(() =>{
    fetchComments()
  },[])



  return (
    <div className='flex-1 pt-5 px-5 sm:pt-12 sm:pl-16 bg-blue-50/50'>
      <div className='flex justify-between items-center max-w-3xl'>
        <h1 className='text-lg'>Comments</h1>
        <div className='flex gap-4'>
          <button onClick={() => seFilter('Approved')} className={`shadow-custom-sm border rounded-full px-4 py-1
            cursor-pointer text-s ${filter === 'Approved' ? 'text-primary' : 'text-gray-700' }`}>
              Approved</button>
          <button onClick={()=> seFilter('Not Approved')} className={`shadow-custom-sm border rounded-full px-4 py-1
            cursor-pointer text-s ${filter === 'Not Approved' ? 'text-primary' : 'text-gray-700' }`}>
             Not Approved</button>
        </div>
      </div>
      <div className='relative h-4/5 max-w-3xl overflow-x-auto mt-4 bg-white shadow rounded-lg scrollbar-hide'>
            <table className='w-full text-m text-gray-500'>
              <thead className='text-s text-gray-700 text-left uppercase'>
                <tr>
                  <th scope='col' className='px-6 py-3'>Blog Title & Comment</th>
                  <th scope='col' className='px-6 py-3 max-sm:hidden'>Date</th>
                  <th scope='col' className='px-6 py-3'>Action</th>
                </tr>
              </thead>
              <tbody>
                {comments.filter((comment) => {
                  if (filter === "Approved") return comment.isApproved === true;
                  return comment.isApproved === false;
                }).map((comment,index) => <Comment_table_item key={comment._id}
              comment={comment} index={index+1} fetchComments={fetchComments}/>)}
              </tbody>
            </table>
      </div>
      
    </div>
  )
}

export default Comments