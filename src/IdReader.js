import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Tesseract from "tesseract.js";
import Dropzone from "react-dropzone";


const primary ="#cccccc";
const white = "#ffff"
const secondary = "#be5504";
const bgUrl = "https://images.unsplash.com/photo-1528731708534-816fe59f90cb?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8bWluaW1hbCUyMGJhY2tncm91bmR8ZW58MHx8MHx8fDA%3D";


export default function IdReader() {
  const [uploadedImage, setUploadedImage] = useState(null);
  const [idNumber, setIdNumber] = useState("");
  const [name, setName] = useState("");
  const [cusType, setCusType] = useState(null);
  const navigate = useNavigate(); // Using useNavigate

  function handleImageUpload(acceptedFiles) {
    const imageFile = acceptedFiles[0];
    setUploadedImage(URL.createObjectURL(imageFile));

    Tesseract.recognize(imageFile, "eng", {
      logger: (info) => console.log(info),
    }).then(({ data: { text } }) => {
      const lines = text.split("\n");

      // Extract ID number from the fourth-to-last line
      const idLine = lines[lines.length - 4];
      const idNumberMatch = idLine.match(/\d+/); // Match all consecutive numbers
      if (idNumberMatch) {
        const extractedIdNumber = idNumberMatch[0];
        setIdNumber(extractedIdNumber);
      }

      // Extract full name from the last line and replace "<" with " "
      const lastLine = lines[lines.length - 2];
      const cleanedFullName = lastLine.replace(/<+/g, " ").trim();

      console.log("Cleaned Name" + cleanedFullName);
      setName(cleanedFullName);
    });
  }

  function handleCusTypeChange(e) {
    setCusType(e.target.value);
  }

  function handleGenerateQRCode() {
    navigate("/qrcode", { state: { idNumber, name, cusType } });
  }

  return (
    <>
            
      <section className="vh-100 " style={bgImg}>
          
        <div className="mask d-flex align-items-center h-100 gradient-custom-3">
              
          <div className="container h-100">
                  
            <div className="row d-flex justify-content-center align-items-center h-100">
                      
              <div className="col-12 col-md-9 col-lg-7 col-xl-6">
                          
                <div className="card" style={{ borderRadius: "15px" }}>
                              
                  <div className="card-body p-5">
                                  
                    <h2 className="text-uppercase text-center mb-5">
                      Demo Service Request
                    </h2>
                                  
                    <form>
                                                       
                      <div className="form-outline mb-4">
                                          
                        <Dropzone onDrop={handleImageUpload} accept="image/*">
                          {({ getRootProps, getInputProps }) => (
                            <div {...getRootProps()} style={dropzoneStyle}>
                              <input {...getInputProps()} />
                              <p>
                                Drag & drop an ID photo here, or click to select
                                one
                              </p>
                            </div>
                          )}
                        </Dropzone>
                                        
                      </div>
                                      
                      {uploadedImage && (
                        <div className="form-outline mb-4">
                                            
                          <img
                            src={uploadedImage}
                            alt="Uploaded ID"
                            style={imageStyle}
                          />
                                            
                        </div>
                      )}
                                      
                      <div className="form-outline mb-4">
                                          
                        <label className="form-label" for="">
                          Civil ID
                        </label>
                                          
                        <input
                          type="text"
                          className="form-control form-control-md"
                          value={idNumber}
                          placeholder="Civil ID captured form photo ID"
                          disabled
                        />
                                        
                      </div>
                                      
                      <div className="form-outline mb-4">
                                          
                        <label className="form-label" for="">
                          Full Name
                        </label>
                                          
                        <input
                          type="text"
                          className="form-control form-control-md"
                          value={name}
                          placeholder="Full Name captured form photo ID"
                          disabled
                        />
                                        
                      </div>
                                      
                      <div className="form-outline mb-4">
                                          
                        <label className="form-label" for="form3Example4cdg">
                          Customer Type
                        </label>
                                          
                        <select id="" className="form-control form-control-md" value={cusType} onChange={handleCusTypeChange}>
                          <option value="1">Type 1</option>
                          <option value="2">Type 2</option>
                          <option value="3">Type 3</option>
                                            
                        </select>
                                        
                      </div>
                                      
                      <div className="d-flex justify-content-center">
                                          
                        <button
                          type="button"
                          className="btn btn-block btn-lg gradient-custom-4 text-body"
                          style={btnColor}
                          onClick={handleGenerateQRCode}
                        >
                          Register
                        </button>
                                        
                      </div>
                                    
                    </form>
                                
                  </div>
                            
                </div>
                        
              </div>
                    
            </div>
                
          </div>
            
        </div>
      </section>
          
    </>
  );
} // const handleImageUpload = (acceptedFiles) => { //   const imageFile = acceptedFiles[0]; //   setUploadedImage(URL.createObjectURL(imageFile)); //   Tesseract.recognize( //     imageFile, //     'eng', //     { logger: (info) => console.log(info) } //   ).then(({ data: { text } }) => { //     const idomnIndex = text.indexOf('IDOMN'); //     if (idomnIndex !== -1) { //       const idSubstring = text.substring(idomnIndex + 5); // Skip 'IDOMN' and get the rest //       const idNumberMatch = idSubstring.match(/\d+/); // Match all consecutive numbers //       if (idNumberMatch) { //         const extractedIdNumber = idNumberMatch[0]; //         setIdNumber(extractedIdNumber); //       } //     } //   }); // };

// const IdReader = () => {

// };

const dropzoneStyle = {
  border: `2px dashed ${primary}`,
  borderRadius: "4px",
  padding: "20px",
  textAlign: "center",
  cursor: "pointer",
};

const imageStyle = {
  marginTop: "20px",
  maxWidth: "100%",
};

const btnColor = {
  backgroundColor: `${secondary}`,
  color: `${white}`,
};

const bgImg = {
  backgroundImage: `url(${bgUrl})`
}