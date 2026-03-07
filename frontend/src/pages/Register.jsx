
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { registerAPI, loginAPI} from "../services/allAPI";
import { useContext } from "react";
import { AuthContext } from "../Context/ContextAPI";

function Register({ register }) {
 
  const { setToken, setUser } = useContext(AuthContext)
  const [viewPasswordStatus, setViewPasswordStatus] = useState(false);

  const [userInput, setUserInput] = useState({
    name: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    const { name, email, password } = userInput;

    if (!name || !email || !password) {
      alert("Please fill the form completely");
      return;
    }

    try {

      const res = await registerAPI(userInput);
      console.log(res);

      if (res.status === 200 || res.status === 201) {
        alert("Registration successful. Please login");
        navigate("/login");

        setUserInput({
          name: "",
          email: "",
          password: "",
        });
      }

      else if (res.status === 409) {
        alert(res.response.data);
      }

      else {
        alert("Something went wrong");
      }

    } catch (err) {
      console.log(err);
      alert("Server error");
    }
  };


  const handleLogin = async (e) => {
    e.preventDefault();

    const { email, password } = userInput;

    if (!email || !password) {
      alert("Please fill the form completely");
      return;
    }

    try {

      const res = await loginAPI({ email, password });

      if (res.status === 200) {

        alert("Logged in successfully");

        localStorage.setItem("users", JSON.stringify(res.data.users));
        localStorage.setItem("token", res.data.token);
        setToken(res.data.token)
        setUser(res.data.users)
        navigate("/");

      }

      else if (res.status === 401) {
        alert(res.response.data);
        setUserInput({ name: "", email: "", password: "" });
      }

      else if (res.status === 404) {
        alert(res.response.data);
        setUserInput({ name: "", email: "", password: "" });
      }

    } catch (err) {
      console.log(err);
      alert("Invalid email or password");
    }

  };


  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-r from-purple-100 via-pink-100 to-blue-100 px-4">

      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-sm">

       
        <div className="flex justify-center mb-4">
          <div className="bg-purple-200 w-16 h-16 flex items-center justify-center rounded-full">
            <FontAwesomeIcon icon={faUser} className="text-purple-700 text-xl" />
          </div>
        </div>

        
        <h2 className="text-center text-2xl font-bold text-purple-600 mb-6">
          {register ? "Create Account" : "Welcome Back"}
        </h2>

       
        <form
          className="space-y-4"
          onSubmit={register ? handleRegister : handleLogin}
        >

          {register && (
            <input
              type="text"
              placeholder="Full Name"
              value={userInput.name}
              onChange={(e) =>
                setUserInput({ ...userInput, name: e.target.value })
              }
              className="w-full p-3 border border-purple-200 rounded-lg bg-purple-50 focus:outline-none focus:ring-2 focus:ring-purple-300"
            />
          )}

          <input
            type="email"
            placeholder="Email Address"
            value={userInput.email}
            onChange={(e) =>
              setUserInput({ ...userInput, email: e.target.value })
            }
            className="w-full p-3 border border-purple-200 rounded-lg bg-purple-50 focus:outline-none focus:ring-2 focus:ring-purple-300"
          />

        
          <div className="flex items-center border border-purple-200 rounded-lg bg-purple-50">

            <input
              type={viewPasswordStatus ? "text" : "password"}
              placeholder="Password"
              value={userInput.password}
              onChange={(e) =>
                setUserInput({ ...userInput, password: e.target.value })
              }
              className="flex-1 p-3 bg-transparent outline-none"
            />

            <button
              type="button"
              className="px-3 text-gray-500"
              onClick={() => setViewPasswordStatus(!viewPasswordStatus)}
            >
              <FontAwesomeIcon
                icon={viewPasswordStatus ? faEyeSlash : faEye}
              />
            </button>

          </div>

         
          <button
            type="submit"
            className="w-full bg-purple-400 hover:bg-purple-500 text-white p-3 rounded-lg transition"
          >
            {register ? "Register" : "Login"}
          </button>

        </form>

        
        <p className="text-center text-sm mt-4">
          {register ? "Already have an account?" : "New here?"}{" "}
          <Link
            to={register ? "/login" : "/register"}
            className="text-purple-600 font-medium"
          >
            {register ? "Login" : "Register"}
          </Link>
        </p>

      </div>

    </div>
  );
}

export default Register;

