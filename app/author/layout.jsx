"use client";
import { NavBar } from "../../components/componentsindex";
import Footer from "../../components/Footer/Footer";

export default function CollectionLayout({ children }) {
  return (
    <div>
      <NavBar />
      {children}
      <Footer />
    </div>
  );
} 