import type { Metadata } from "next";
import "./globals.css";
import NavBar from "./NavBar";



export const metadata: Metadata = {
  title: "Get Your Tickets",
  description: "Tickets Generator",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-[#02191D]">
        <NavBar />
        {children}
      </body>
    </html>
  );
}
