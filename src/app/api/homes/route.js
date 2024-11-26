import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req, res) {
  const { owner, size, houseNumber, cars, bikes } = await req.json();
  const newHouseNumber = parseInt(houseNumber, 10);
  const newSize = parseInt(size, 10);
  const numberOfCars = parseInt(cars, 10);
  const numberOfBikes = parseInt(bikes, 10);
  const home = await prisma.home.findFirst({
    where: { houseNumber: newHouseNumber, isLiving: true },
  });
  if (!home) {
    await prisma.home.create({
      data: {
        members: { create: { name: owner, relationship: "Chủ hộ" } },
        size: newSize,
        houseNumber: newHouseNumber,
        cars: numberOfCars,
        bikes: numberOfBikes,
      },
    });
  } else {
    return new NextResponse(
      JSON.stringify({ error: "Nhà này đang sinh sống" }),
      { status: 400 }
    );
  }
  return new NextResponse(
    JSON.stringify({ success: "Đăng ký thành công hộ mới" }),
    { status: 200 }
  );
}
export async function GET(req, res) {
  const homes = await prisma.home.findMany({
    include: { members: true },
    orderBy: { id: "desc" },
  });
  return new NextResponse(JSON.stringify(homes), { status: 200 });
}
