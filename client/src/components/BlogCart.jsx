import React from 'react'
import { blog_data } from '../assets/assets';
import { useNavigate } from 'react-router-dom';

const BlogCart = ({blog}) => {

    const {title,description,category,image,_id} = blog;
    const navigate = useNavigate();
  return (
    <div onClick={() => navigate(`/blog/${_id}`)}
    className="w-full rounded-lg overflow-hidden shadow hover:scale-105
     hover:shadow-primary/25 transition duration-300 cursor-pointer bg-white">
    <img src={image} alt={title} className="aspect-video w-full object-cover" />
    <span
    className="ml-5 mt-4 inline-block rounded-full bg-primary/20 px-3 py-1 text-sm text-primary"
    >{category}
    </span>
    <div className="p-5">
        <h5 className="mb-2 text-lg font-semibold text-gray-900">{title}</h5>
             <p className='mb-3 text-s text-gray-600' dangerouslySetInnerHTML={{"__html":
                description.slice(0,80)
             }}></p>
        </div>
    </div>
  )
}

export default BlogCart