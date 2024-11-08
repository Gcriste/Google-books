import type { Metadata } from "next";
import localFont from "next/font/local";
import "../styles/globals.css";
import Navbar from "@/components/navbar";
import BookContextProvider from "@/context/provider";
import { QueryClientProvider, useQueryClient } from "@tanstack/react-query";
import ReactQueryProvider from "./query-client";

const geistSans = localFont({
  src: "../styles/fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "../styles/fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Google Books",
  description: "Google Books API application",
};



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ReactQueryProvider>
          <BookContextProvider>
            <Navbar />
            {children}
          </BookContextProvider>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
