import React, { useEffect, useState } from 'react'
import { useRef } from 'react';//to access a DOM element directly
import {uploadFile} from './service/api.js'
import './App.css'
import { FaRegCopy } from "react-icons/fa";

import imgLink from './image/luffy.jpg'
const App = () => {

  const [file,setFile]=useState('')
  const [downloadUrl, setDownloadUrl]=useState('')
  const fileInputRef=useRef();
  const onClickUpload=()=>{
    // console.log(fileInputRef.current)
    fileInputRef.current.click(); //to <input> </input> access a DOM element directly
  }
  console.log(file)
  useEffect(() => {
    const getImage = async () => {
      if (file) {
        const data = new FormData();
        data.append("name", file.name);
        data.append("file", file);

        try {
          // Call the uploadFile function to upload the file to the backend
          const response = await uploadFile(data);
          setDownloadUrl(response.path)
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
    <div className="container">
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