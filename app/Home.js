import Cta from "./components/Cta";
import Features from "./components/Features";

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