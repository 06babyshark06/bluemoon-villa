'use client'
import Sidebar1 from "@/app/components/SideBar";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import SpeedDialWithTextInside from "../components/SpeedDialMenu";

const DashboardLayout = ({ children }) => {
  const router=useRouter()
  const {data:session,status:sessionStatus}=useSession()
  useEffect(() => {
    if(sessionStatus==="unauthenticated"){
      router.push("/")
    }
  },[sessionStatus,router])
  return (
    <div className="flex justify-between">
      <Sidebar1 />
      {children}
      {/* <SpeedDialWithTextInside/> */}
    </div>
  );
};

export default DashboardLayout;
