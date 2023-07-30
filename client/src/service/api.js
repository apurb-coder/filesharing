import axios from 'axios'

const URL = "https://filesharing-backend-s4z0.onrender.com";
export const uploadFile=async(data)=>{
    try{
        const response= await axios.post(`${URL}/upload`,data);
        return response.data;
    }catch(error){
        console.log('Encountered error while calling /upload endpoint',error)
    }
}
