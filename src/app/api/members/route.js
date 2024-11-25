import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export const POST = async (req, res) => {
  const { name, relationship, houseNumber } = await req.json();
  const newHouseNumber = parseInt(houseNumber, 10);
  const home=await prisma.home.findUnique({where: {houseNumber: newHouseNumber}});
  if (!home) {
    return new NextResponse(
      JSON.stringify({ error: "Nhà này chưa được đăng ký" }),
      { status: 200 }
    );
  } else {
    await prisma.member.create({
      data: {
        name,
        relationship,
        home: { connect: { houseNumber: newHouseNumber } },
      },
    });
  }
  return new NextResponse(
    JSON.stringify({ success: "Thêm thành viên thành công" }),
    { status: 200 }
  );
};

export const GET = async (req, res) => {
  const members = await prisma.member.findMany({include: {home: true}});
  return new NextResponse(JSON.stringify(members), { status: 200 });
}