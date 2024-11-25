import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export const PUT = async (req, { params }) => {
  const { id } = params;
  const newId = parseInt(id, 10);
  const { name, relationship, houseNumber, leaveDate } = await req.json();
  const house = await prisma.home.findUnique({ where: { houseNumber: parseInt(houseNumber, 10) } });
  if (!house) {
    return new NextResponse(JSON.stringify({ error: "Nhà không tìm thấy" }), { status: 400 });
  }
  const member = await prisma.member.update({ where: { id: newId }, data: {
    name,
    relationship,
    leaveDate,
    home: { connect: { houseNumber: parseInt(houseNumber, 10) } },
  } });
  return new NextResponse(JSON.stringify(member), { status: 200 });
};

export const DELETE = async (req, { params }) => {
  const { id } = params;
  const newId = parseInt(id, 10);
  const member = await prisma.member.delete({ where: { id: newId } });
  return new NextResponse(JSON.stringify(member), { status: 200 });
};