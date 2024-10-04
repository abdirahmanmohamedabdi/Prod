import Image from "next/image";
import Navbar from "./components/Navbar";
import Cta from "./components/Cta";
import Footer from "./components/Footer";
import Features from "./components/Features";
export default function Home() {
  return (
    <div className>
      <Navbar />
      <Cta/>
       <Features />
      <Footer />
     
    </div>
  );
}
