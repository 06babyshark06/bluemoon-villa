import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export const GET = async (req, res) => {
  const { id } = res.params;
  const newId = parseInt(id, 10);
  const payment = await prisma.payment.findUnique({
    where: { id: newId },
    include: {
      home: { include: { members: { where: { relationship: "Chủ hộ" } } } },
      bill: true,
    },
  });
  return new NextResponse(JSON.stringify(payment), { status: 200 });
};

export const PUT = async (req, res) => {
  const { id } = res.params;
  const newId = parseInt(id, 10);
  const { billName, money, consumption, payAt, paid } = await req.json();
  if (!paid) {
    const payment = await prisma.payment.update({
      where: { id: newId },
      data: {
        payAt,
        paid,
        bill: {
          update: {
            billName,
            money: parseInt(money, 10),
            consumption: parseInt(consumption, 10),
          },
        },
      },
    });
    return new NextResponse(JSON.stringify(payment), { status: 200 });
  } else {
    const payment = await prisma.payment.update({
      where: { id: newId },
      data: {
        payAt,
        paid,
      },
    });
    return new NextResponse(JSON.stringify(payment), { status: 200 });
  }
};

export const DELETE = async (req, res) => {
  const { id } = res.params;
  const newId = parseInt(id, 10);
  const payment = await prisma.payment.delete({ where: { id: newId } });
  return new NextResponse(JSON.stringify(payment), { status: 200 });
};
