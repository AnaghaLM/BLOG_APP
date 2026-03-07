import React from "react";
import { Link } from "react-router-dom";
function BlogCard({ blog , deleteBlog}) {



    
  return (
    <div className="bg-green-100 border border-green-200 rounded-xl p-5 w-full">

      {/* Category + Date */}
      <div className="flex justify-between items-center mb-3">
        <span className="bg-green-200 text-green-800 text-xs px-3 py-1 rounded-full">
          {blog.category}
        </span>

        <span className="text-xs text-gray-600">
          {new Date(blog.createdAt).toDateString()}
        </span>
      </div>

      {/* Title */}
      <h2 className="text-lg font-semibold text-green-900 mb-2">
        {blog.title}
      </h2>

      {/* Content */}
      <p className="text-gray-700 text-sm mb-4">
        {blog.body}
      </p>

      {/* Buttons */}
      <div className="flex gap-3">
       <Link to={`/edit/${blog._id}`}>
  <button className="bg-green-500 text-white text-sm px-4 py-1 rounded-md">
    Edit
  </button>
</Link>

        <button className="bg-red-400 text-white text-sm px-4 py-1 rounded-md"
        onClick={()=>deleteBlog(blog._id)}>
          Delete
        </button>
      </div>

    </div>
  );
}

export default BlogCard;