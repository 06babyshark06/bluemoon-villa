import bcrypt from "bcrypt";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";


export const POST = async (req, res) => {

  const { currentPassword, newPassword, id } = await req.json();
  // Get the user from the database
  const user = await prisma.admin.findUnique({
    where: { id: id },
  });

  if (!user) {
    return new NextResponse(JSON.stringify({error:"Không tìm thấy tài khoản"}), { status: 404 });
  }

  // Check if the current password matches
  const isPasswordCorrect = await bcrypt.compare(currentPassword, user.password);
  if (!isPasswordCorrect) {
    return new NextResponse(JSON.stringify({error:"Mật khẩu hiện tại không đúng"}), { status: 400 });
  }

  // Hash the new password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(newPassword, salt);

  // Update the password in the database
  await prisma.admin.update({
    where: { id: id },
    data: { password: hashedPassword },
  });

  return new NextResponse(JSON.stringify({ success: "Cập nhật mật khẩu thành công" }), { status: 200 });
}