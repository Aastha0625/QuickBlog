import React, { useState } from 'react'
import { assets } from '../../assets/assets';
import { useAppContext } from '../../context/AppContext';
import toast from 'react-hot-toast';

const Comment_table_item = ({ comment, fetchComment }) => {
  const { blog, createdAt, _id } = comment;
  const [isApproving, setIsApproving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  
  const BlogDate = new Date(createdAt);
  const { axios } = useAppContext();

  const approveComment = async () => {
    if (isApproving) return; // Prevent double-click
    
    try {
      setIsApproving(true);
      const { data } = await axios.post('/api/admin/approve-comment', {
        id: _id
      });
      
      if (data.success) {
        toast.success("Comment approved successfully");
        // Add delay before refreshing to prevent race condition
        setTimeout(() => {
          fetchComment();
        }, 500);
      } else {
        toast.error(data.message || "Failed to approve comment");
      }
    } catch (error) {
      console.error("Error approving comment:", error);
      if (error.response?.status === 401) {
        toast.error("Session expired. Please login again.");
      } else {
        toast.error(error.response?.data?.message || "Failed to approve comment");
      }
    } finally {
      setIsApproving(false);
    }
  };

  const deleteComment = async () => {
    if (isDeleting) return; // Prevent double-click
    
    const confirm = window.confirm("Are you sure you want to delete this comment?");
    if (!confirm) return;

    try {
      setIsDeleting(true);
      const { data } = await axios.post('/api/admin/delete-comment', { id: _id });
      
      if (data.success) {
        toast.success("Comment deleted successfully");
        // Add delay before refreshing to prevent race condition
        setTimeout(() => {
          fetchComment();
        }, 500);
      } else {
        toast.error(data.message || "Failed to delete comment");
      }
    } catch (error) {
      console.error("Error deleting comment:", error);
      if (error.response?.status === 401) {
        toast.error("Session expired. Please login again.");
      } else {
        toast.error(error.response?.data?.message || "Failed to delete comment");
      }
    } finally {
      setIsDeleting(false);
    }
  };

  // Format date more reliably
  const formatDate = (date) => {
    try {
      return new Date(date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      });
    } catch (error) {
      return 'Invalid Date';
    }
  };

  // Truncate long content for better display
  const truncateText = (text, maxLength = 100) => {
    if (!text) return '';
    return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
  };

  return (
    <tr className='border-y border-gray-300'>
      <td className='px-6 py-4'>
        <div className='space-y-2'>
          <div>
            <b className='font-medium text-gray-600'>Blog</b>: {blog?.title || 'Unknown Blog'}
          </div>
          <div>
            <b className='font-medium text-gray-600'>Name</b>: {comment.name || 'Anonymous'}
          </div>
          <div>
            <b className='font-medium text-gray-600'>Comment</b>: 
            <span className='ml-1' title={comment.content}>
              {truncateText(comment.content)}
            </span>
          </div>
        </div>
      </td>

      <td className='px-6 py-4 max-sm:hidden'>
        {formatDate(createdAt)}
      </td>
      
      <td className='px-6 py-4'>
        <div className='inline-flex items-center gap-4'>
          {!comment.isApproved ? (
            <button
              onClick={approveComment}
              disabled={isApproving}
              className={`relative ${isApproving ? 'opacity-50 cursor-not-allowed' : 'hover:scale-110 cursor-pointer'} transition-all`}
              title="Approve comment"
            >
              <img 
                src={assets.tick_icon} 
                className='w-5' 
                alt="Approve"
              />
              {isApproving && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-3 h-3 border-2 border-green-600 border-t-transparent rounded-full animate-spin"></div>
                </div>
              )}
            </button>
          ) : (
            <p className='text-xs border border-green-300 bg-green-400 text-green-950 rounded-full px-3 py-1'>
              Approved
            </p>
          )}
          
          <button
            onClick={deleteComment}
            disabled={isDeleting}
            className={`relative ${isDeleting ? 'opacity-50 cursor-not-allowed' : 'hover:scale-110 cursor-pointer'} transition-all`}
            title="Delete comment"
          >
            <img 
              src={assets.bin_icon} 
              alt="Delete" 
              className='w-5'
            />
            {isDeleting && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-3 h-3 border-2 border-red-600 border-t-transparent rounded-full animate-spin"></div>
              </div>
            )}
          </button>
        </div>
      </td>
    </tr>
  );
};

export default Comment_table_item;