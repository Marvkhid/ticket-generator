"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Road_Rage } from "next/font/google"; // ✅ Import Road Rage Font

// ✅ Configure the Road Rage font
const roadRage = Road_Rage({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

const Events: React.FC = () => {
  const [selectedTicket, setSelectedTicket] = useState<string | null>(null);
  const [ticketQuantity, setTicketQuantity] = useState<number>(1);

  const handleTicketSelection = (ticketType: string) => {
    setSelectedTicket(ticketType);
    localStorage.setItem("selectedTicket", ticketType);
  };

  const handleQuantityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const quantity = Number(e.target.value);
    setTicketQuantity(quantity);
    localStorage.setItem("ticketQuantity", quantity.toString());
  };

  return (
    <div className="flex justify-center w-full items-center overflow-hidden min-h-screen sm:px-6 py-8">
      <div className="w-full max-w-lg sm:w-10/12 md:w-3/4 lg:w-2/3 xl:w-1/2 border-[#0E464F] border-2 p-6 sm:p-8 rounded-xl shadow-lg bg-[#112B30]">
        
        {/* Header */}
        <div className="flex justify-between items-center">
          <h2 className="text-2xl sm:text-3xl text-white">Ticket Selection</h2>
          <p className="text-lg sm:text-xl text-white">Step 1/3</p>
        </div>

        {/* Progress Bar */}
        <div className="w-full h-2 my-4 flex">
          <div className="bg-[#24A0B5] w-1/3 h-full"></div>
          <div className="bg-[#0E464F] w-2/3 h-full"></div>
        </div>

        {/* Event Information */}
        <div className="border-[#0E464F] border-2 rounded-lg px-4 sm:px-6 py-8">
          <div className="text-center border-[#0E464F] border-2 rounded-lg p-4 sm:p-6">
            {/* ✅ Apply Road Rage font */}
            <h3 className={`${roadRage.className} mb-3 text-white text-2xl sm:text-3xl md:text-4xl lg:text-5xl`}>
              Techember Fest '25
            </h3>
            <p className="text-white text-sm sm:text-lg md:text-xl">Join us for an unforgettable experience.</p>
            <p className="text-white text-sm sm:text-lg md:text-xl">📍 [Event Location] || March 15, 2025 | 7:00PM</p>
          </div>

          <hr className="border-[#24A0B5] my-6 mx-auto w-10/12" />

          {/* Ticket Selection */}
          <p className="text-white my-4 text-lg sm:text-xl">Select Ticket Type:</p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
            {["REGULAR", "VIP", "VVIP"].map((ticketType, index) => (
              <button
                key={index}
                className={`rounded-lg border-2 p-4 sm:p-6 text-left w-full sm:w-1/3
                  ${selectedTicket === ticketType ? "bg-[#24A0B5]" : "border-[#24A0B5]"} 
                  transition-all duration-300`}
                onClick={() => handleTicketSelection(ticketType)}
              >
                <p className="font-bold text-white text-lg sm:text-xl md:text-2xl mb-1">
                  {ticketType === "REGULAR" ? "Free" : "$150"}
                </p>
                <p className="text-sm sm:text-lg md:text-xl text-white">{ticketType} ACCESS</p>
                <p className="text-sm sm:text-lg md:text-xl text-white">20/52</p>
              </button>
            ))}
          </div>

          {/* Quantity Selection */}
          <p className="text-white my-4 text-lg sm:text-xl">Number of Tickets:</p>
          <div className="w-full">
            <select
              value={ticketQuantity}
              onChange={handleQuantityChange}
              className="w-full p-3 sm:p-4 border border-[#24A0B5] text-white bg-teal-950 rounded-lg"
            >
              {[1, 2, 3, 4, 5].map((num) => (
                <option key={num} value={num}>
                  {num}
                </option>
              ))}
            </select>
          </div>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row justify-between mt-6 gap-4">
            <button className="text-[#24A0B5] w-full sm:w-1/2 px-6 sm:px-10 rounded-lg text-lg sm:text-xl border-2 py-4 active:bg-[#24A0B5] active:text-white">
              Cancel
            </button>

            <Link href="/next-page" className="w-full sm:w-1/2">
              <button className="text-[#24A0B5] w-full px-6 sm:px-10 rounded-lg text-lg sm:text-xl border-2 py-4 active:bg-[#24A0B5] active:text-white">
                Next
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Events;
