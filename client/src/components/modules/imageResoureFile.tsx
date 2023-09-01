import React, { useState } from 'react';

const ImageResourceFile = () => {
  const [selectedFile, setSelectedFile] = useState(null);

  // Function to handle file input change
  const handleFileChange = (e:any) => {
    const file = e.target.files[0];
    setSelectedFile(file);
  };

  // Function to save the selected file to the public folder
  const saveFileToPublicFolder = () => {
    if (selectedFile) {
      const formData = new FormData();
      formData.append('file', selectedFile);

      // Send a POST request to your server to save the file in the public folder
      fetch('/api/upload', {
        method: 'POST',
        body: formData,
      })
        .then((response) => response.json())
        .then((data) => {
          console.log('File saved successfully:', data);
        })
        .catch((error) => {
          console.error('Error saving file:', error);
        });
    }
  };

  return (
    <>
      <h1>React Image Upload</h1>
      <input type="file" accept="image/*" onChange={handleFileChange} />
      <button onClick={saveFileToPublicFolder}>Upload Image</button>
    </>
  );
};

export default ImageResourceFile;
