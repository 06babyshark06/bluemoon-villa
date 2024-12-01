import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";


export const POST = async (req, res) => {

  const {  id } = await req.json();
  // Get the user from the database
  
  await prisma.admin.delete({
    where: { id: id },
  });

  return new NextResponse(JSON.stringify({ success: "Đã xóa tài khoản" }), { status: 200 });
}