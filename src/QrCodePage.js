import React from 'react';
import { useLocation } from 'react-router-dom';
import QRCode from 'qrcode.react';

const secondary = "#be5504";
const bgUrl = "https://images.unsplash.com/photo-1528731708534-816fe59f90cb?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8bWluaW1hbCUyMGJhY2tncm91bmR8ZW58MHx8MHx8fDA%3D";


const colorText = {
  color: `${secondary}`,
  fontWeight: "bold",
};

export default function QrCodePage () {
  const location = useLocation();
  const { idNumber, name, cusType } = location.state || {};

  return (
    <section className="vh-100 bgImg">
         <div className="mask d-flex align-items-center h-100 gradient-custom-3">
          <div className="container h-100">
            <div className="row d-flex justify-content-center align-items-center h-100">
              <div className="col-12 col-md-9 col-lg-7 col-xl-6">
                <div className="card" style={{borderRadius: "15px"}}>
                  <div className="card-body p-5">
                    <h2 className="text-uppercase text-center mb-5">Thank you for your submission</h2>
                    {idNumber && name && (
                      <div>
                        <p><span style={colorText}>ID Number:</span> {idNumber}</p>
                        <p><span style={colorText}>Full Name:</span> {name}</p>
                        <p><span style={colorText}>Customer Type:</span> {cusType}</p>
                        <QRCode value={`${idNumber} ${name} ${cusType}`} size={200} />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
    </section>
    
  );
}

const bgImg = {
  backgroundImage: `url(${bgUrl})`
}