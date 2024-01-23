import React, { useState } from 'react';
import Tesseract from 'tesseract.js';
import Dropzone from 'react-dropzone';

export default function IdReader () {
  const [uploadedImage, setUploadedImage] = useState(null);
  const [idNumber, setIdNumber] = useState('');
  const [name, setName] = useState('');

function handleImageUpload (acceptedFiles) {
  const imageFile = acceptedFiles[0];
  setUploadedImage(URL.createObjectURL(imageFile));

  Tesseract.recognize(
    imageFile,
    'eng',
    { logger: (info) => console.log(info) }
  ).then(({ data: { text } }) => {
    const lines = text.split('\n');
    const id = lines[lines.length - 4 ]
    const idNumberMatch = id.match(/\d+/); // Match all consecutive number
    setIdNumber(idNumberMatch[0]);
    
    //needs to be done so for demo purposes since the name 
    const nameLine = lines[ lines.length - 2 ];  
    const nameComponents = nameLine.replace(/<+/g, ' ').split('<');
    const fullName = nameComponents.filter(component => component.trim() !== '').join(' ');
    setName(fullName);
  });
}

  const bkgImg = "https://mdbcdn.b-cdn.net/img/Photos/new-templates/search-box/img4.webp";

  return (

    <>
      <section class="vh-100 bg-image"
  style={{backgroundImage: `${bkgImg}`}}>
  <div class="mask d-flex align-items-center h-100 gradient-custom-3">
    <div class="container h-100">
      <div class="row d-flex justify-content-center align-items-center h-100">
        <div class="col-12 col-md-9 col-lg-7 col-xl-6">
          <div class="card" style={{borderRadius: "15px"}}>
            <div class="card-body p-5">
              <h2 class="text-uppercase text-center mb-5">Submit a Request</h2>

              <form>
                
                <div class="form-outline mb-4">
                  <Dropzone onDrop={handleImageUpload} accept="image/*">
                    {({ getRootProps, getInputProps }) => (
                      <div {...getRootProps()} style={dropzoneStyle}>
                        <input {...getInputProps()} />
                        <p>Drag & drop an ID photo here, or click to select one</p>
                      </div>
                    )}
                  </Dropzone>
                </div>

                {uploadedImage && (
                  <div className="form-outline mb-4">
                  <img src={uploadedImage} alt="Uploaded ID" style={imageStyle} />
                  </div>
                )}
                <div class="form-outline mb-4">
                  <label class="form-label" for="">Civil ID</label>
                  <input type="text" class="form-control form-control-md" value={idNumber} disabled/>
                </div>

                <div class="form-outline mb-4">
                  <label class="form-label" for="">Full Name</label>
                  <input type="text" class="form-control form-control-md" value={name} disabled/>
                </div>

                <div class="form-outline mb-4">
                  <label class="form-label" for="form3Example4cdg">Customer Type</label>
                  <select id="" class="form-control form-control-md">
                    <option value="1">Type 1</option>
                    <option value="1">Type 2</option>
                    <option value="1">Type 3</option>
                  </select>
                </div>
{/* 
                <div class="form-check d-flex justify-content-center mb-5">
                  <input class="form-check-input me-2" type="checkbox" value="" id="form2Example3cg" />
                  <label class="form-check-label" for="form2Example3g">
                    I agree all statements in <a href="#!" class="text-body"><u>Terms of service</u></a>
                  </label>
                </div> */}

                <div class="d-flex justify-content-center">
                  <button type="button"
                    class="btn btn-success btn-block btn-lg gradient-custom-4 text-body">Register</button>
                </div>
              </form>

            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

{/* Old Working Code */}

{/* <div className="container mt-4">
      <Dropzone onDrop={handleImageUpload} accept="image/*">
        {({ getRootProps, getInputProps }) => (
          <div {...getRootProps()} style={dropzoneStyle}>
            <input {...getInputProps()} />
            <p>Drag & drop an ID photo here, or click to select one</p>
          </div>
        )}
      </Dropzone>
      
      <h3 className="mt-4">ID Number</h3>
            <p>ID Number: {idNumber}</p>
            <input type="text" value={idNumber} disabled placeholder='Automatically Populated'/>

            <h3 className="mt-4">Full Name</h3>
            <input type="text" disabled placeholder='Automatically Populated'/>

      {uploadedImage && (
        <div className="mt-4">
          <img src={uploadedImage} alt="Uploaded ID" style={imageStyle} />
          <div>
          </div>
          
        </div>
      )}
    </div> */}

    </>

  );
}

// const IdReader = () => {
 

  // const handleImageUpload = (acceptedFiles) => {
  //   const imageFile = acceptedFiles[0];
  //   setUploadedImage(URL.createObjectURL(imageFile));

  //   Tesseract.recognize(
  //     imageFile,
  //     'eng',
  //     { logger: (info) => console.log(info) }
  //   ).then(({ data: { text } }) => {
  //     const idomnIndex = text.indexOf('IDOMN');
  //     if (idomnIndex !== -1) {
  //       const idSubstring = text.substring(idomnIndex + 5); // Skip 'IDOMN' and get the rest
  //       const idNumberMatch = idSubstring.match(/\d+/); // Match all consecutive numbers
  //       if (idNumberMatch) {
  //         const extractedIdNumber = idNumberMatch[0];
  //         setIdNumber(extractedIdNumber);
  //       }
  //     }
  //   });
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