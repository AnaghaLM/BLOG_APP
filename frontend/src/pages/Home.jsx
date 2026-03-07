import React, { useState, useEffect, useContext } from "react";
import BlogCard from "../components/BlogCard";
import { Link, useNavigate } from "react-router-dom";
import { deleteBlogAPI, getBlogAPI } from "../services/allAPI";
import { AuthContext } from "../Context/ContextAPI";

function Home() {

  const { token } = useContext(AuthContext)

  const [category, setCategory] = useState("All")
  const [blogs, setBlogs] = useState([])
  const [loading, setLoading] = useState(true)

  const navigate = useNavigate()

  const fetchBlogs = async () => {

    if (!token) return

    try {

      const reqHeader = {
        Authorization: `Bearer ${token}`
      }

      const res = await getBlogAPI(reqHeader)

      if (res.status === 200) {
        setBlogs(res.data)
      }

      setLoading(false)

    } catch (err) {
      console.log(err)
      setLoading(false)
    }

  }

  useEffect(() => {

    if (token) {
      fetchBlogs()
    }

  }, [token])



  const deleteBlog = async (id) => {

    try {

      const reqHeader = {
        Authorization: `Bearer ${token}`
      }

      await deleteBlogAPI(id, reqHeader)

      fetchBlogs()

    } catch (error) {

      console.log(error)

    }

  }



  const filteredBlogs = blogs.filter(
    (blog) => category === "All" || blog.category === category
  )



  const handleLogout = () => {

    localStorage.removeItem("token")
    navigate("/login")

  }



  return (

    <div className="min-h-screen bg-green-50">

     
      <div className="bg-green-300 p-4 flex items-center justify-between flex-wrap gap-4">

        <h1 className="text-xl font-semibold text-green-900">
          Blog App
        </h1>

        {token ? (

          <div className="flex gap-3">

            <Link to="/add">
              <button className="bg-yellow-200 px-4 py-2 rounded-full font-medium">
                 Add
              </button>
            </Link>

            <button
              onClick={handleLogout}
              className="bg-red-300 px-4 py-2 rounded-full font-medium"
            >
              Logout
            </button>

          </div>

        ) : (

          <div className="flex gap-3">

            <Link to="/login">
              <button className="bg-white px-4 py-2 rounded-full">
                Login
              </button>
            </Link>

            <Link to="/register">
              <button className="bg-yellow-200 px-4 py-2 rounded-full">
                Register
              </button>
            </Link>

          </div>

        )}

      </div>



      
      <div className="flex justify-around bg-green-200 py-3 text-green-900 font-medium">

        <button
          onClick={() => setCategory("All")}
          className="px-4 py-1 rounded-full bg-green-100 hover:bg-green-300 transition"
        >
          All
        </button>

        <button
          onClick={() => setCategory("Productivity")}
          className="px-4 py-1 rounded-full bg-green-100 hover:bg-green-300 transition"
        >
          Productivity
        </button>

        <button
          onClick={() => setCategory("Health")}
          className="px-4 py-1 rounded-full bg-green-100 hover:bg-green-300 transition"
        >
          Health
        </button>

        <button
          onClick={() => setCategory("Work")}
          className="px-4 py-1 rounded-full bg-green-100 hover:bg-green-300 transition"
        >
          Work
        </button>

        <button
          onClick={() => setCategory("Personal")}
          className="px-4 py-1 rounded-full bg-green-100 hover:bg-green-300 transition"
        >
          Personal
        </button>

      </div>



      
      <div className="p-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">

        {token ? (

          loading ? (

            <p className="text-green-700 text-center col-span-3 animate-pulse">
              Loading blogs...
            </p>

          ) : filteredBlogs.length > 0 ? (

            filteredBlogs.map((blog) => (
              <BlogCard
                key={blog._id}
                blog={blog}
                deleteBlog={deleteBlog}
              />
            ))

          ) : (

            <p className="text-gray-600 text-center col-span-3">
              No blogs found
            </p>

          )

        ) : (

          <p className="text-center col-span-3 text-lg text-gray-700">
            Please login to view blogs
          </p>

        )}

      </div>

    </div>

  )

}

export default Home