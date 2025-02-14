'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { jsPDF } from 'jspdf';
import Image from 'next/image';

interface UserData {
  fullName: string;
  email: string;
  avatar: string;
  specialRequest: string;
}

const Page: React.FC = () => {
  const [fullName, setFullName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [avatar, setAvatar] = useState<string>('');
  const [specialRequest, setSpecialRequest] = useState<string>('');
  const router = useRouter();

  useEffect(() => {
    const savedData = localStorage.getItem('userData');
    if (savedData) {
      const parsedData: UserData = JSON.parse(savedData);
      setFullName(parsedData.fullName || '');
      setEmail(parsedData.email || '');
      setAvatar(parsedData.avatar || '');
      setSpecialRequest(parsedData.specialRequest || '');
    }
  }, []);

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const imageUrl = reader.result as string;
        setAvatar(imageUrl);

        // Update the userData in localStorage
        const existingData = localStorage.getItem('userData');
        const userData: UserData = existingData
          ? JSON.parse(existingData)
          : { fullName, email, specialRequest, avatar: '' };
        userData.avatar = imageUrl;
        localStorage.setItem('userData', JSON.stringify(userData));
      };
      reader.readAsDataURL(file);
    } else {
      alert('Please upload a valid image.');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!fullName || !email || !avatar) {
      alert('All fields are required!');
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      alert('Invalid email format!');
      return;
    }

    // Ensure specialRequest does not exceed 50 words
    const wordCount = specialRequest.trim().split(/\s+/).length;
    if (specialRequest && wordCount > 50) {
      alert('Special request cannot exceed 50 words!');
      return;
    }

    const updatedData: UserData = { fullName, email, avatar, specialRequest };
    localStorage.setItem('userData', JSON.stringify(updatedData));

    // Generate ticket and store URL in localStorage
    const ticketBlob = generateTicket(updatedData);
    const ticketURL = URL.createObjectURL(ticketBlob);
    localStorage.setItem('ticket', ticketURL);

    alert('Profile updated successfully!');
    router.push('/myTickets');
  };

  const generateTicket = (data: UserData) => {
    const doc = new jsPDF();
    doc.text(`🎟 Conference Ticket`, 10, 10);
    doc.text(`Name: ${data.fullName}`, 10, 20);
    doc.text(`Email: ${data.email}`, 10, 30);
    doc.text(`Special Request: ${data.specialRequest || 'None'}`, 10, 40);
    doc.addImage(data.avatar, 'JPEG', 10, 50, 30, 30);
    return doc.output('blob');
  };

  const handleImageClick = () => {
    const inputElement = document.getElementById('avatar-upload') as HTMLInputElement;
    inputElement?.click();
  };

  const handleClear = () => {
    setFullName('');
    setEmail('');
    setAvatar('');
    setSpecialRequest('');
    localStorage.removeItem('userData');
  };

  return (
    <div className="flex justify-center items-center min-h-screen overflow-hidden p-6 sm:p-10 lg:p-16">
      <form onSubmit={handleSubmit} className="p-8 rounded-xl shadow-lg w-full max-w-lg border border-teal-800">
        
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-3xl text-white">Attendee Details</h1>
          <h1 className="text-xl text-gray-400">Step 2/3</h1>
        </div>

        <div className="w-full h-2 mb-6 flex">
          <div className="bg-[#24A0B5] w-2/3 h-full"></div>
          <div className="bg-[#0E464F] w-1/3 h-full"></div>
        </div>

        {/* Avatar Upload Section */}
        <div className="border-[2px] border-teal-800 p-6 rounded-lg">
          <div className="border-[2px] border-teal-800 mb-4 rounded-lg p-6">
            <h2 className="text-white mb-4">Upload Profile Photo</h2>

            <div className="w-3/4 lg:w-4/5 h-32 bg-black flex items-center justify-center mb-8 mt-6 rounded-lg mx-auto">
              <div
                className="w-44 h-32 lg:h-40 border-[5px] bg-[#4e7a82] border-[#24A0B5] rounded-xl flex items-center justify-center cursor-pointer overflow-hidden"
                onClick={handleImageClick}
              >
                {avatar ? (
                 <Image src={avatar} alt="Avatar" layout="fill" objectFit="cover" className="rounded-xl" />
                ) : (
                  <div className="text-center flex flex-col items-center justify-center text-white text-sm">
                    <Image src="/icon.png" alt="Upload Icon" width={50} height={50} className="mb-2" />
                    <p className="text-center">Drag & Drop or Click to</p>
                    <p className="text-center">Upload</p>
                  </div>
                )}
                <input id="avatar-upload" type="file" accept="image/*" onChange={handleAvatarChange} className="hidden" />
              </div>
            </div>
          </div>

          <hr className="border-teal-900 border-[2px] mb-6" />

          <label className="block text-gray-300 mb-1">Enter your name</label>
          <input
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="w-full p-3 border border-gray-500 rounded-lg bg-transparent text-white mb-4"
            required
          />

          <label className="block text-gray-300 mb-1">Enter your email*</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 border border-gray-500 rounded-lg bg-transparent text-white mb-4"
            required
          />

          <label className="block text-gray-300 mb-1">Special Request?</label>
          <textarea
            value={specialRequest}
            onChange={(e) => setSpecialRequest(e.target.value)}
            className="w-full p-3 border border-gray-500 rounded-lg bg-transparent text-white mb-6 h-20"
          ></textarea>

          <div className="flex space-x-4">
            <button
              type="button"
              onClick={handleClear}
              className="w-full p-3 rounded-lg border border-gray-500 text-white hover:bg-gray-600 transition"
            >
              Back
            </button>
            <button
              type="submit"
              className="w-full p-3 rounded-lg border-2 border-[#24A0B5] text-white hover:bg-[#24A0B5] transition"
            >
              Get My Free Ticket
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Page;
