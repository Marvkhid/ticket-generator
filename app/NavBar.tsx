"use client";

import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
  return (
    <div className="bg-[#02191D] mx-4 md:mx-8 lg:mx-32 my-8 rounded-xl border-[#0E464F] border-[2px]">
      <div className="flex justify-between items-center px-4 md:px-6 p-6 text-xl text-white">
        

        <Link href="/">
          <Image src="/ticz.png" alt="logo" width={100} height={100} priority />
        </Link>

       
        <nav className="hidden lg:flex text-gray-300 gap-16">
          <Link href="/events" className="hover:text-gray-400 transition">
            Events
          </Link>
          <Link href="/myTickets" className="hover:text-gray-400 transition">
            My Tickets
          </Link>
          <Link href="/about" className="hover:text-gray-400 transition">
            About Project
          </Link>
        </nav>

       
        <Link href="/myTickets">
          <button className="bg-white rounded-xl text-black flex gap-2 items-center px-4 py-2 transition hover:bg-gray-200">
            MY TICKETS 
            <Image src="/arrowline.png" alt="arrow" width={20} height={20} />
          </button>
        </Link>
      </div>
    </div>
  );
}
