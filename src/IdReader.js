import React, { useState } from 'react';
import Tesseract from 'tesseract.js';
import Dropzone from 'react-dropzone';

export default function IdReader () {
  const [uploadedImage, setUploadedImage] = useState(null);
  const [idNumber, setIdNumber] = useState('');

  function handleImageUpload (acceptedFiles) {
    const imageFile = acceptedFiles[0];
    setUploadedImage(URL.createObjectURL(imageFile));

    Tesseract.recognize(
      imageFile,
      'eng',
      { logger: (info) => console.log(info) }
    ).then(({ data: { text } }) => {
      const idomnIndex = text.indexOf('IDOMN');
      if (idomnIndex !== -1) {
        const idSubstring = text.substring(idomnIndex + 5); // Skip 'IDOMN' and get the rest
        const idNumberMatch = idSubstring.match(/\d+/); // Match all consecutive numbers
        if (idNumberMatch) {
          const extractedIdNumber = idNumberMatch[0];
          setIdNumber(extractedIdNumber);
        }
      }
    });
  }


  return (
    <div>
      <Dropzone onDrop={handleImageUpload} accept="image/*">
        {({ getRootProps, getInputProps }) => (
          <div {...getRootProps()} style={dropzoneStyle}>
            <input {...getInputProps()} />
            <p>Drag & drop an ID photo here, or click to select one</p>
          </div>
        )}
      </Dropzone>

      {uploadedImage && (
        <div>
          <img src={uploadedImage} alt="Uploaded ID" style={imageStyle} />
          <div>
            <h3>ID Number</h3>
            <p>ID Number: {idNumber}</p>
          </div>
        </div>
      )}
    </div>
  );
}

// const IdReader = () => {
 

  // const handleImageUpload = (acceptedFiles) => {
  //   const imageFile = acceptedFiles[0];
  //   setUploadedImage(URL.createObjectURL(imageFile));

  //   Tesseract.recognize(
  //     imageFile,
  //     'eng',
  //     { logger: (info) => console.log(info) }
  //   ).then(({ data: { text } }) => {
  //     const idomnIndex = text.indexOf('IDOMN');
  //     if (idomnIndex !== -1) {
  //       const idSubstring = text.substring(idomnIndex + 5); // Skip 'IDOMN' and get the rest
  //       const idNumberMatch = idSubstring.match(/\d+/); // Match all consecutive numbers
  //       if (idNumberMatch) {
  //         const extractedIdNumber = idNumberMatch[0];
  //         setIdNumber(extractedIdNumber);
  //       }
  //     }
  //   });
  // };

// };

const dropzoneStyle = {
  border: '2px dashed #cccccc',
  borderRadius: '4px',
  padding: '20px',
  textAlign: 'center',
  cursor: 'pointer',
};

const imageStyle = {
  marginTop: '20px',
  maxWidth: '100%',
};

