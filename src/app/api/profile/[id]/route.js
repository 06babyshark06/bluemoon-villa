import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";



export const GET= async(_, {params}) => {
  const { id } = params;
  const newId=parseInt(id, 10);
  const profile = await prisma.profile.findUnique({
    where: { adminId: newId },
  });
  return new NextResponse(JSON.stringify(profile), { status: 200 });
}