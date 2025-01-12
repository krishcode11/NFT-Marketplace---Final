"use client";
import React from "react";
import { NavBar } from "../../components/componentsindex";
import Footer from "../../components/Footer/Footer";

export default function UploadNFTLayout({ children }) {
  return (
    <div className="mainContainer">
      <NavBar />
      <main>{children}</main>
      <Footer />
    </div>
  );
} 