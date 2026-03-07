import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import Register from "./pages/Register"
import Add from "./pages/Add"
import Edit from "./pages/Edit"



function App() {


  return (


    <BrowserRouter>

      <Routes>

        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register  register/>} />
        <Route path="/login" element={<Register />} />
        

        <Route path="/add" element={<Add />} />
        <Route path="/edit/:id" element={<Edit />} />

      </Routes>

    </BrowserRouter>

  )
}

export default App
