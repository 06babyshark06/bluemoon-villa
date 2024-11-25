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
  console.log(firstName, lastName, location);
  console.log(profile);
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
      JSON.stringify({ success: "Profile updated successfully" }),
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
      JSON.stringify({ success: "Profile created successfully" }),
      { status: 200 }
    );
  }
};
