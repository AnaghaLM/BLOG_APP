import SERVER_URL from "./serverURL";
import commonAPI from "./commonAPI";



export const registerAPI=async(reqBody) => {
     return await commonAPI('POST', `${SERVER_URL}/register`,reqBody)
}

export const loginAPI= async (reqBody) => {
     return await commonAPI('POST', `${SERVER_URL}/login`, reqBody)
}




export const getBlogAPI = async (reqHeader) => {
  return await commonAPI( "GET", `${SERVER_URL}/getNotes`,{}, reqHeader );
   
};


export const deleteBlogAPI = async (id ,reqHeader) => {
     return await commonAPI('DELETE', `${SERVER_URL}/deleteNote/${id}`,{},reqHeader)
}




export const addBlogAPI=async(reqBody,reqHeader) => {
     return await commonAPI('POST', `${SERVER_URL}/addNote`,reqBody,reqHeader)
}



export const getSingleBlogAPI = async (id,reqHeader) => {
     return await commonAPI('GET', `${SERVER_URL}/getSingleBlog/${id}`,{},reqHeader)
}



export const updateBlogAPI = async (id,reqBody,reqHeader) => {
     return await commonAPI('PUT', `${SERVER_URL}/updateNotes/${id}`,reqBody,reqHeader)
}