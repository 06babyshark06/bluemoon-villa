import bcrypt from "bcrypt";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export const POST = async (req, res) => {
  const { firstName, lastName, location, phoneNumber, language, skills, id } =
    await req.json();
  // Get the user from the database
  const profile = await prisma.profile.findUnique({
    where: { adminId: id },
  });
  if (profile) {
    await prisma.profile.update({
      where: { adminId: id },
      data: {
        firstName,
        lastName,
        location,
        phoneNumber,
        language,
        skills,
        adminId: id,
      },
    });
    return new NextResponse(
      JSON.stringify({ success: "Cập nhật thành công hồ sơ" }),
      { status: 200 }
    );
  } else {
    await prisma.profile.create({
      data: {
        firstName,
        lastName,
        location,
        phoneNumber,
        language,
        skills,
        adminId: id,
      },
    });
    return new NextResponse(
      JSON.stringify({ success: "Tạo mới hồ sơ thành công" }),
      { status: 200 }
    );
  }
};
