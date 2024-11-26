import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

const putWithAHome = async (
  houseNumber,
  billName,
  type,
  money,
  consumption
) => {
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

const putWithManyHomes = async (billName, type, money, cars, bikes) => {
  const homes = await prisma.home.findMany({
    where: { isLiving: true },
  });
  if (type == "Dịch vụ chung cư") {
    homes.map(async (home) => {
      await prisma.payment.create({
        data: {
          home: {
            connect: { id: home.id },
          },
          bill: {
            create: {
              billName,
              type,
              money: parseInt(money, 10)*home.size,
            },
          },
        },
      });
    });
    return new NextResponse(JSON.stringify({ success: "Đã tạo thành công" }), { status: 200 });
  }
  if (type == "Quản lý chung cư") {
    homes.map(async (home) => {
      await prisma.payment.create({
        data: {
          home: {
            connect: { id: home.id },
          },
          bill: {
            create: {
              billName,
              type,
              money: parseInt(money, 10)*home.size,
            },
          },
        },
      });
    })
    return new NextResponse(JSON.stringify({ success: "Đã tạo thành công" }), { status: 200 });
  }
  if (type == "Gửi xe") {
    homes.map(async(home)=>{
      await prisma.payment.create({
        data: {
          home: {
            connect: { id: home.id },
          },
          bill: {
            create: {
              billName,
              type,
              money: parseInt(cars, 10)*home.cars+parseInt(bikes, 10)*home.bikes,
            },
          },
        },
      })
    })
    return new NextResponse(JSON.stringify({ success: "Đã tạo thành công" }), { status: 200 });
  }
};
export const POST = async (req) => {
  const { houseNumber, billName, type, money, consumption, cars, bikes } =
    await req.json();
  if (houseNumber) {
    return putWithAHome(houseNumber, billName, type, money, consumption);
  } else {
    return putWithManyHomes(billName, type, money, cars, bikes);
  }
};

export const GET = async (req, res) => {
  const payments = await prisma.payment.findMany({
    include: {
      home: { include: { members: { where: { relationship: "Chủ hộ" } } } },
      bill: true,
    },
    orderBy: {id: 'desc'},
    where:{paid: false}
  });
  return new NextResponse(JSON.stringify(payments), { status: 200 });
};
