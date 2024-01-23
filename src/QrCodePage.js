import React from 'react';
import { useLocation } from 'react-router-dom';
import QRCode from 'qrcode.react';

export default function QrCodePage () {
  const location = useLocation();
  const { idNumber, name, cusType } = location.state || {};

  return (
    <section className="vh-100 bg-image">
         <div className="mask d-flex align-items-center h-100 gradient-custom-3">
          <div className="container h-100">
            <div className="row d-flex justify-content-center align-items-center h-100">
              <div className="col-12 col-md-9 col-lg-7 col-xl-6">
                <div className="card" style={{borderRadius: "15px"}}>
                  <div className="card-body p-5">
                    <h2 className="text-uppercase text-center mb-5">Generated QR Code</h2>
                    {idNumber && name && (
                      <div>
                        <p>ID Number: {idNumber}</p>
                        <p>Full Name: {name}</p>
                        <p>Customer Type: {cusType}</p>
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
