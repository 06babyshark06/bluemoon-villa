import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export const PUT = async (req, { params }) => {
  const { id } = params;
  const newId = parseInt(id, 10);
  const { size, cars, bikes, isLiving } = await req.json();
  if (isLiving == false) {
    const members = await prisma.member.updateMany({
      where: { homeId: newId },
      data: { leaveDate: new Date().toISOString() },
    });
    const home = await prisma.home.update({
      where: { id: newId },
      data: {
        isLiving: false,
      },
    });
    return new NextResponse(JSON.stringify(home, members), { status: 200 });
  }
  const home = await prisma.home.update({
    where: { id: newId },
    data: {
      size: parseInt(size, 10),
      cars: parseInt(cars, 10),
      bikes: parseInt(bikes, 10),
    },
  });
  return new NextResponse(JSON.stringify(home), { status: 200 });
};

export const DELETE = async (req, { params }) => {
  const { id } = params;
  const newId = parseInt(id, 10);
  console.log(newId);
  const members = await prisma.member.deleteMany({ where: { homeId: newId } });
  const payments = await prisma.payment.deleteMany({ where: { homeId: newId } });
  const home = await prisma.home.delete({ where: { id: newId } });
  return new NextResponse(JSON.stringify(home, members, payments), { status: 200 });
};
