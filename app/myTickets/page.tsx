'use client';

import React, { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import bgImage from '@/public/Subtract.png';
import Barcode from '../Barcode';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import { Road_Rage } from 'next/font/google';

const roadRage = Road_Rage({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
});

const Ticket = ({ ticketRef }: { ticketRef: React.RefObject<HTMLDivElement | null> }) => {
  const [fullName, setFullName] = useState<string | null>(null);
  const [email, setEmail] = useState<string | null>(null);
  const [avatar, setAvatar] = useState<string | null>(null);
  const [specialRequest, setSpecialRequest] = useState<string | null>(null);
  const [ticketType, setTicketType] = useState<string | null>(null);
  const [ticketQuantity, setTicketQuantity] = useState<number>(1);

  useEffect(() => {
    const savedData = localStorage.getItem('userData');
    if (savedData) {
      const parsedData = JSON.parse(savedData);
      setFullName(parsedData.fullName || '');
      setEmail(parsedData.email || '');
      setAvatar(parsedData.avatar || '');
      setSpecialRequest(parsedData.specialRequest || 'None');
    }
    setTicketType(localStorage.getItem('selectedTicket') || 'N/A');
    setTicketQuantity(Number(localStorage.getItem('ticketQuantity')) || 1);
  }, []);

  return (
    <div className="flex justify-center items-center overflow-hidden mt-8 w-full px-4 sm:px-2">
      <div
        ref={ticketRef}
        className="relative w-full max-w-[1200px] h-auto rounded-xl shadow-lg flex flex-col items-center justify-center p-4"
        style={{
          backgroundImage: `url(${bgImage.src})`,
          backgroundSize: 'contain',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      >
        <div className="text-center text-white">
          <h2 className={`${roadRage.className} font-bold text-3xl sm:text-5xl mb-2`}>
            Techember Fest &apos;25
          </h2>
          <p className="text-white text-lg sm:text-2xl mb-1">📍 04 Rumens Road, Ikoyi, Lagos</p>
          <p className="text-lg sm:text-2xl">📅 March 15, 2025 | 7:00 PM</p>
        </div>

        {avatar && (
          <div className="mt-4 sm:mt-6 relative w-24 h-24 sm:w-40 sm:h-40">
            <Image
              src={avatar}
              alt="User Avatar"
              fill
              className="object-cover rounded-xl border-4 border-teal-500"
              unoptimized
            />
          </div>
        )}

        <div className="bg-teal-800 rounded-xl px-6 py-8 mt-4 w-1/2 max-w-lg">
          <div className="flex flex-col sm:flex-row justify-between items-center pb-4 mb-4 border-b border-teal-600">
            <div className="w-1/2 sm:w-1/2 pr-4 mb-4 sm:mb-0">
              <p className="text-lg sm:text-2xl text-teal-400">Enter your name</p>
              <p className="text-white font-bold text-lg sm:text-xl">{fullName || '[Your Name Here]'}</p>
            </div>
            <div className="w-1/2 sm:w-1/2 pl-4">
              <p className="text-lg sm:text-2xl text-teal-400">Enter your email*</p>
              <p className="text-white font-bold text-lg sm:text-xl">{email || '[Your Email Here]'}</p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row justify-between items-center pb-4 mb-4 border-b border-teal-600">
            <div className="w-full sm:w-1/2 pr-4 mb-4 sm:mb-0">
              <p className="text-lg sm:text-2xl text-teal-400">Ticket Type:</p>
              <p className="text-white font-bold text-lg sm:text-xl">{ticketType}</p>
            </div>
            <div className="w-full sm:w-1/2 pl-4">
              <p className="text-lg sm:text-2xl text-teal-400">Ticket for:</p>
              <p className="text-white font-bold text-lg sm:text-xl">{ticketQuantity}</p>
            </div>
          </div>

          <div>
            <p className="text-lg sm:text-2xl text-teal-400 mb-2">Special request?</p>
            <p className="text-white text-lg sm:text-xl">{specialRequest || 'No special request'}</p>
          </div>
        </div>

        <div className="mt-6 sm:mt-10">
          <Barcode />
        </div>
      </div>
    </div>
  );
};

const Page = () => {
  const ticketRef = useRef<HTMLDivElement | null>(null);

  const downloadTicket = async () => {
    if (!ticketRef.current) return;

    const canvas = await html2canvas(ticketRef.current);
    const imgData = canvas.toDataURL('image/png');

    const doc = new jsPDF({
      orientation: 'portrait',
      unit: 'px',
      format: [canvas.width, canvas.height],
    });

    doc.addImage(imgData, 'PNG', 0, 0, canvas.width, canvas.height);
    doc.save('TechemberFest_Ticket.pdf');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 sm:p-6">
      <div className="flex justify-between items-center mb-4 w-full max-w-lg">
        <h1 className="text-xl sm:text-3xl text-white">Ready</h1>
        <h1 className="text-sm sm:text-xl text-gray-400">Step 3/3</h1>
      </div>
      <div className="w-full max-w-lg h-2 mb-6 flex">
        <div className="bg-[#24A0B5] w-full h-full"></div>
      </div>
      <Ticket ticketRef={ticketRef} />
      <div className="flex flex-col sm:flex-row w-full gap-6 sm:gap-32 justify-center pb-6 mt-4">
        <button className="btn-primary" onClick={downloadTicket}>Download Ticket</button>
      </div>
    </div>
  );
};

export default Page;
