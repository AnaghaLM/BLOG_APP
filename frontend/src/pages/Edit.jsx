import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getSingleBlogAPI ,updateBlogAPI} from "../services/allAPI";

export default function Edit() {

  const navigate = useNavigate()
  const { id } = useParams()

  const [blogData, setBlogData] = useState({
    title: "",
    category: "",
    body: ""
  })



  const getSingleBlog = async () => {

        try {

            const token = localStorage.getItem("token")

    const reqHeader = {
      "Authorization": `Bearer ${token}`
    }

            const res = await getSingleBlogAPI(id, reqHeader)
            console.log(res.data)
            setBlogData(res.data)

        } catch (error) {

            console.log(error)

        }

    }





const handleUpdate = async (e) => {

        e.preventDefault()

        const { title, body, category } = blogData
        if (!title || !body || !category) {
            alert("Fill all fields")
            return
        }

        try {

            const token = localStorage.getItem("token")

            const reqHeader = {
                "Authorization": `Bearer ${token}`
            }

            const res = await updateBlogAPI(id,blogData,reqHeader)

            if (res.status === 200) {
                alert("Blog Updated")
                navigate("/")
            }

        } catch (error) {

            console.log(error)

        }

    }
    
  const handleReset = () => {
    setBlogData({
      title: "",
      category: "",
      body: ""
    })
  }


  useEffect(() => {
   
  getSingleBlog()
  
  }, [ ])
  

  return (

    <div className="min-h-screen bg-blue-100 flex items-center justify-center p-6">

      <div className="bg-blue-200 shadow-lg rounded-xl p-8 w-full max-w-lg">

        
        <button
          onClick={() => navigate("/")}
          className="mb-4 text-blue-800 font-medium hover:underline"
        >
           Back
        </button>

        <h2 className="text-2xl font-semibold text-blue-900 mb-6 text-center">
          Edit Blog
        </h2>

        <form className="flex flex-col gap-4">

          
          <input
            type="text"
            placeholder="Blog Title"
            value={blogData.title}
            onChange={(e)=>setBlogData({...blogData,title:e.target.value})}
            className="p-3 rounded-lg bg-blue-50 border border-blue-300 outline-none"
          />

          
          <select
            value={blogData.category}
            onChange={(e)=>setBlogData({...blogData,category:e.target.value})}
            className="p-3 rounded-lg bg-blue-50 border border-blue-300 outline-none"
          >

            <option value="">Select Category</option>
            <option value="Productivity">Productivity</option>
            <option value="Health">Health</option>
            <option value="Work">Work</option>
            <option value="Personal">Personal</option>

          </select>

         
          <textarea
            rows="5"
            placeholder="Write your blog..."
            value={blogData.body}
            onChange={(e)=>setBlogData({...blogData,body:e.target.value})}
            className="p-3 rounded-lg bg-blue-50 border border-blue-300 outline-none"
          ></textarea>

       
          <div className="flex gap-3 mt-4">

            <button
              onClick={handleUpdate}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg"
            >
              Update Blog
            </button>

            <button
              type="button"
              onClick={handleReset}
              className="bg-gray-300 px-4 py-2 rounded-lg"
            >
              Reset
            </button>

          </div>

        </form>

      </div>

    </div>
  )
}