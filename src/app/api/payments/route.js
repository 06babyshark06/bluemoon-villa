import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export const POST = async (req) => {
  const { houseNumber, billName, type, money, consumption } = await req.json();
  const home = await prisma.home.findFirst({
    where: { houseNumber: parseInt(houseNumber, 10), isLiving: true },
  });
  if (!home) {
    return new NextResponse(
      JSON.stringify({ error: "Nhà này chưa được đăng ký" }),
      {
        status: 400,
      }
    );
  }
  if (consumption) {
    const data = await prisma.payment.create({
      data: {
        home: {
          connect: { id: home.id },
        },
        bill: {
          create: {
            billName,
            type,
            consumption: parseInt(consumption, 10),
            money: parseInt(money, 10),
          },
        },
      },
    });
    return new NextResponse(JSON.stringify(data), { status: 200 });
  } else {
    const data = await prisma.payment.create({
      data: {
        home: {
          connect: { id: home.id },
        },
        bill: {
          create: {
            billName,
            type,
            money: parseInt(money, 10),
          },
        },
      },
    });
    return new NextResponse(JSON.stringify(data), { status: 200 });
  }
};

export const GET = async (req, res) => {
  const payments = await prisma.payment.findMany({
    include: {
      home: { include: { members: { where: { relationship: "Chủ hộ" } } } },
      bill: true,
    },
  });
  return new NextResponse(JSON.stringify(payments), { status: 200 });
};
