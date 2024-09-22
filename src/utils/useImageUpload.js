// import { useState } from 'react';

// const useImageUpload = () => {
//   const [imageURL, setImageURL] = useState('');

//   const handleUpload = (result) => {
//     setImageURL(result.info.secure_url);
//   };

//   return { imageURL, handleUpload };
// };

// export default useImageUpload;
"use client"
import { useState } from "react";

const useImageUpload = () => {
  const [imageFile, setImageFile] = useState(null);
  const [imageURL, setImageURL] = useState("");
  const handleUpload = (result) => {
    setImageFile(result.info.secure_url);
    setImageURL(result.info.secure_url);
  };

  const removeImage = () => {
    setImageFile(null);
  };

  return { imageFile,imageURL, handleUpload, removeImage };
};

export default useImageUpload;
