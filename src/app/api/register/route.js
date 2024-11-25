import prisma from "@/lib/prisma";
import bcrypt from "bcrypt";
import { NextResponse } from "next/server";

export async function hashPassword(password) {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
}
export const POST = async (request) => {
  const { email, password, confirmPassword } = await request.json();
  const user = await prisma.admin.findUnique({
    where: { email: email },
  });
  if (user) return new NextResponse(JSON.stringify({ error: "user already exists" }), { status: 400 });
  const hashedPassword = await hashPassword(password);
  await prisma.admin.create({
    data: {
      email,
      password: hashedPassword,
    },
  });
  return new NextResponse(JSON.stringify({ success: "user created successfully" }), { status: 200 });
};