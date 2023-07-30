import axios from "axios";

const URL = process.env.REACT_APP_BACKEND_URL;

export const uploadFile = async (data, onUploadProgress) => {
  try {
    const startTime = Date.now(); // Record the start time
    const response = await axios.post(`${URL}/upload`, data, {
      onUploadProgress, // Pass the onUploadProgress function to Axios
    });
    const endTime = Date.now(); // Record the end time
    const uploadTime = endTime - startTime; // Calculate the total upload time
    console.log("File upload time:", uploadTime, "ms");
    return response.data;
  } catch (error) {
    console.log("Encountered error while calling /upload endpoint", error);
  }
};
