'use client';

import React, { useEffect, useRef, useState } from 'react';
import JsBarcode from 'jsbarcode';

const Barcode: React.FC = () => {
  const barcodeRef = useRef<SVGSVGElement | null>(null);
  const [barcodeValue] = useState(() =>
    Math.floor(100000 + Math.random() * 900000).toString()
  );
  const [randomNumber1] = useState(() =>
    Math.floor(100000 + Math.random() * 9000).toString()
  );

  useEffect(() => {
    if (barcodeRef.current) {
      JsBarcode(barcodeRef.current, barcodeValue, {
        format: 'CODE128',
        displayValue: false, 
        lineColor: '#ffffff', 
        background: 'transparent', 
        width: window.innerWidth < 768 ? 3 : 6, 
        height: window.innerWidth < 768 ? 60 : 100, 
      });
    }
  }, [barcodeValue]);

  return (
    <div className="w-auto flex flex-col justify-center items-center">
      
      <svg ref={barcodeRef} className="w-full h-full"></svg>

      <div className="flex justify-center gap-12 text-white text-lg sm:text-xl md:text-2xl font-bold mt-2">
        <span>{randomNumber1}</span>
        <span>{barcodeValue}</span>
      </div>
    </div>
  );
};

export default Barcode;