import React from 'react';
import { useLocation } from 'react-router-dom';
import QRCode from 'qrcode.react';

const QrCodePage = () => {
  const location = useLocation();
  const { idNumber, fullName } = location.state || {};

  return (
    <div className="container mt-4">
      <h3>Generated QR Code</h3>
      {idNumber && fullName && (
        <div>
          <p>ID Number: {idNumber}</p>
          <p>Full Name: {fullName}</p>
          <QRCode value={`${idNumber} ${fullName}`} size={200} />
        </div>
      )}
    </div>
  );
};

export default QrCodePage;
