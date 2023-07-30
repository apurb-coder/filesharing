import axios from 'axios'

const URL = process.env.REACT_APP_BACKEND_URL;
export const uploadFile=async(data)=>{
    try{
        const response= await axios.post(`${URL}/upload`,data);
        return response.data;
    }catch(error){
        console.log('Encountered error while calling /upload endpoint',error)
    }
}
