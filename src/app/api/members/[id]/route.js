import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export const PUT = async (req, { params }) => {
  const { id } = params;
  const newId = parseInt(id, 10);
  const { name, relationship, houseNumber, leaveDate } = await req.json();
  const home = await prisma.home.findFirst({
    where: {
      houseNumber: parseInt(houseNumber, 10),
      members: {
        some: {
          id: newId, // Ensure a member with this id exists
        },
      },
    },
  });
  const member = await prisma.member.update({
    where: { id: newId },
    data: {
      name,
      relationship,
      leaveDate,
      home: { connect: { id: home.id } },
    },
  });
  return new NextResponse(JSON.stringify(member), { status: 200 });
};

export const DELETE = async (req, { params }) => {
  const { id } = params;
  const newId = parseInt(id, 10);
  const member = await prisma.member.delete({ where: { id: newId } });
  return new NextResponse(JSON.stringify(member), { status: 200 });
};
