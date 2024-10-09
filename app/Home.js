import Cta from "./components/Cta";
import Features from "./components/Features";
import { auth } from "@/app/auth.js";
import { redirect } from "next/navigation";
import Image from "next/image";

const Homepage = async () => {

  return (
    <div>
     
      
        <Cta />
        <Features />
    </div>
  )
}

export default Homepage