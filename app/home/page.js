import Image from "next/image";
import LoginForm from "../components/LoginForm";
import { getServerSession } from "next-auth";
import { auth } from "@/app/auth.js";
import Logout from "../components/Logout";
import Cta from "../components/Cta";
import Features from "../components/Features";
import { redirect } from "next/navigation";
import React from 'react'

const Homepage = async () => {
    const session = await auth();
    
    if (!session?.user) redirect("/home");
  return (
   
        <div className="container mx-auto p-4">
            <h1 className="text-2xl my-2"> Welcome, {session?.user?.name}</h1>
            <Image src={session?.user?.image}alt="Homepage" width={800} height={400} className="rounded" />
            <Logout />
    </div>
  )
}

export default Homepage