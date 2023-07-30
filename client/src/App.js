import React, { useEffect, useState } from 'react'
import { useRef } from 'react';//to access a DOM element directly
import {uploadFile} from './service/api.js'
import './App.css'
import { FaRegCopy } from "react-icons/fa";

import imgLink from './image/luffy.jpg'
const App = () => {

  const [file,setFile]=useState('')
  const [revealProgressBar,setRevealProgressBar]=useState('none');
  const [downloadUrl, setDownloadUrl]=useState('')
  const [uploadProgress, setUploadProgress] = useState(0);
  const fileInputRef=useRef();
  const onClickUpload=()=>{
    // console.log(fileInputRef.current)
    fileInputRef.current.click(); //to <input> </input> access a DOM element directly
  }
  console.log(file)
  useEffect(() => {
    const getImage = async () => {
      if (file) {
        const data = new FormData();// formData is used to store the file content
        data.append("name", file.name);//file.name contain the file name
        data.append("file", file);// file is a useState variable which has the file content
        console.log(data);

        try {
          //revealing progress bar as upload going to start
          setRevealProgressBar('');
          // Call the uploadFile function to upload the file to the backend
          const response = await uploadFile(data, (progressEvent) => {
            // Handle progress event here if needed (optional)
            const progress = Math.round(
              (progressEvent.loaded / progressEvent.total) * 100
            );
            setUploadProgress(progress);
          });
          setUploadProgress(100); // Set progress to 100% after upload is complete
          setDownloadUrl(response.path);

          // Do something with the response from the server if needed
        } catch (error) {
          // Error handling (if any)
          console.log("Error during upload:", error);
        }
      }
    };
    getImage(); // Call the getImage function when the file state changes
  }, [file]);

  // for copy to clipbaord functionality
  const inputRef = useRef(null);

  const copyToClipboard = () => {
    // Select the input text
    inputRef.current.select();

    // Copy the selected text to the clipboard
    document.execCommand("copy");
  };
  
  // for copy to clipbaord functionality

  

  return (
    <div className="Container">
      <img src={imgLink} alt="sideimage"></img>
      <div className="wrapper">
        <h1>File Sharing Website</h1>
        <p>Upload and Share Download Link</p>
        <button
          className="button-77 buttonStyle"
          role="button"
          onClick={() => onClickUpload()}
        >
          Upload
        </button>
        <input
          type="file"
          ref={fileInputRef}
          style={{ display: "none" }}
          onChange={(e) => setFile(e.target.files[0])}
        />
        {/* Bootstrap Progress Bar */}
        <div
          className="progress"
          style={{
            width: "140px",
            height: "20px",
            display: revealProgressBar,
          }}
        >
          <div
            className="progress-bar custom-progress-bar"
            role="progressbar"
            style={{ width: `${uploadProgress}%` }}
            aria-valuenow={uploadProgress}
            aria-valuemin="0"
            aria-valuemax="100"
          >
            <span style={{ color: "black" }}>{uploadProgress}% Complete</span>
          </div>
        </div>
        {/* Bootstrap Progress Bar */}
        {/* <a href={downloadUrl} target='_blank'>{downloadUrl}</a> */}
        <div className="copy-text">
          <input
            type="text"
            className="text"
            ref={inputRef}
            value={downloadUrl}
            onChange={(e) => setDownloadUrl(e.target.value)}
          />
          <button onClick={copyToClipboard}>
            <FaRegCopy />
          </button>
        </div>
      </div>
    </div>
  );
}

export default App
