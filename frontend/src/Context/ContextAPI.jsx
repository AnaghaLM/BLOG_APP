import React from 'react'
import { createContext, useState } from "react"

export const AuthContext = createContext()
export default function ContextAPI({children}) {
  
 const [token,setToken] = useState(localStorage.getItem("token"))
 const [user,setUser] = useState( JSON.parse(localStorage.getItem("users")))
 


return(

<AuthContext.Provider value={{token,setToken,user,setUser}}>
{children}
</AuthContext.Provider>

)
  
}
