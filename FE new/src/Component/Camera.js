import Webcam from "react-webcam";
import React, { useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom";
import {saveAs} from "file-saver";
import { addImages } from "../api/apiService";



const Camera = () => {

    const webcamRef = React.useRef(null);
    const [imgSrc, setImgSrc] = React.useState(null);
    const [images, updateImages] = React.useState([]);

// useEffect( () => {
//   console.log("images", images);
  
// }, [images]);
  
    const capture = React.useCallback(() => {
      const imageSrc = webcamRef.current.getScreenshot();
      //setImgSrc(imageSrc);
      images.push(imageSrc);

      if (images.length == 2) {
        console.log("sending")
        addImages(images).then((res) => {
          console.log(res);
          updateImages([]);
        }).catch((e)=>{
          console.log("posting images failed : ",e );
        })
      }
    
      //updateImages(imgs);
      //console.log(images);

    // Send image to backend
    // if (imgSrc) {
    //   const formData = new FormData();
    //   formData.append("image", imgSrc.replace("data:image/jpeg;base64,", ""));
    //   fetch("http://localhost:5000/", {
    //     method: "POST",
    //     body: formData,
    //   })
    //     .then((response) => {
    //       if (!response.ok) {
    //         throw new Error("Network response was not ok");
    //       }
    //       console.log("Image sent to backend successfully!");
    //     })
    //     .catch((error) => {
    //       console.error("Error sending image to backend:", error);
    //     });
    // }

      //console.log(imageSrc)
      // saveAs(imageSrc, "image");
      setTimeout(() => {
        capture();
      }, 1000);

    }, [webcamRef, setImgSrc]);
  
    return (
      <>
      <div >
      <Webcam
          audio={false}
          ref={webcamRef}
          screenshotFormat="image/jpeg"
        />
      </div>
       
        <button onClick={capture}>Capture photo</button>
        {imgSrc && (
        <img
          src={imgSrc}
        />
      )}
      </>
    );
  };
  
  export default Camera;
