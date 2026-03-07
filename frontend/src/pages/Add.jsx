import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addBlogAPI } from "../services/allAPI";

function Add() {

  const [blogData, setBlogData] = useState({
    title: "",
    category: "",
    body: ""
  });

  const navigate = useNavigate()

  const handleAdd = async (e) => {
    e.preventDefault()

    const { title, body, category } = blogData

    if (!title || !body || !category) {
      alert("Fill all fields")
      return
    }

    try {

      const token = localStorage.getItem("token")

      const reqHeader = {
        Authorization: `Bearer ${token}`
      }

      const res = await addBlogAPI(blogData, reqHeader)

      if (res.status === 201) {
        alert("Blog Added")
        navigate("/")
      }

    } catch (err) {
      console.log(err)
    }
  }

  const handleReset = () => {
    setBlogData({
      title: "",
      category: "",
      body: ""
    })
  }

  return (
    <div className="min-h-screen bg-pink-100 flex items-center justify-center p-6">

      <div className="bg-pink-200 shadow-lg rounded-xl p-8 w-full max-w-lg">

        
        <button
          onClick={() => navigate("/")}
          className="mb-4 text-pink-700 font-medium"
        >
           Back
        </button>

        <h2 className="text-2xl font-semibold text-pink-900 mb-6 text-center">
          Add New Blog
        </h2>

        <form className="flex flex-col gap-4">

         
          <input
            type="text"
            placeholder="Blog Title"
            value={blogData.title}
            onChange={(e) =>
              setBlogData({ ...blogData, title: e.target.value })
            }
            className="p-3 rounded-lg bg-pink-50 border border-pink-300 outline-none"
          />

         
          <select
            value={blogData.category}
            onChange={(e) =>
              setBlogData({ ...blogData, category: e.target.value })
            }
            className="p-3 rounded-lg bg-pink-50 border border-pink-300 outline-none"
          >
            <option value="">Select Category</option>
            <option value="Productivity">Productivity</option>
            <option value="Health">Health</option>
            <option value="Work">Work</option>
            <option value="Personal">Personal</option>
          </select>

          
          <textarea
            placeholder="Write your blog..."
            rows="5"
            value={blogData.body}
            onChange={(e) =>
              setBlogData({ ...blogData, body: e.target.value })
            }
            className="p-3 rounded-lg bg-pink-50 border border-pink-300 outline-none"
          ></textarea>

         
          <div className="flex gap-3 mt-4">

            <button
              type="submit"
              className="bg-pink-500 text-white px-4 py-2 rounded-lg"
              onClick={handleAdd}
            >
              Add Blog
            </button>

            <button
              type="button"
              className="bg-gray-300 px-4 py-2 rounded-lg"
              onClick={handleReset}
            >
              Reset
            </button>

          </div>

        </form>

      </div>

    </div>
  );
}

export default Add;