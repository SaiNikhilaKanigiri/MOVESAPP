/* eslint-disable @next/next/no-img-element */
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Vehicle Emission",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className} suppressHydrationWarning>
        <main className="">
          <nav className="w-full flex justify-start px-4 md:px-10 py-5 shadow-sm shadow-gray-500 border border-gray-200">
            <div className="w-56">
              <img className="w-full" src="/logo1.jpeg" alt="" />
            </div>
          </nav>
          <div className=" max-w-[1800px] mx-auto my-8 px-4  md:px-10 ">
            {children}
          </div>
        </main>
        {/* <footer className="w-full flex justify-center px-10 py-5 shadow-sm shadow-gray-500 border border-gray-200">
          <div className="w-56">
            <img className="w-full" src="/logo1.jpeg" alt="" />
          </div>
        </footer> */}
      </body>
    </html>
  );
}
