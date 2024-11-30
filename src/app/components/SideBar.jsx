"use client";
import React from "react";
import {
  List,
  Card,
  Alert,
  Avatar,
  ListItem,
  Accordion,
  Typography,
  AccordionBody,
  ListItemPrefix,
  AccordionHeader,
} from "@material-tailwind/react";
import {
  TicketIcon,
  UserGroupIcon,
  Square2StackIcon,
  RectangleGroupIcon,
  HomeIcon,
  ChatBubbleLeftEllipsisIcon,
} from "@heroicons/react/24/solid";
import {
  ChevronDownIcon,
  ArrowLeftStartOnRectangleIcon,
} from "@heroicons/react/24/outline";
import Image from "next/image";
import { RiAdminFill, RiUserAddFill } from "react-icons/ri";
import Link from "next/link";

function SidebarLight() {
  const [open, setOpen] = React.useState(0);

  const handleOpen = (value) => {
    setOpen(open === value ? 0 : value);
  };

  const LIST_ITEM_STYLES =
    "select-none hover:bg-gray-100 focus:bg-gray-100 active:bg-gray-100 hover:text-gray-900 focus:text-gray-900 active:text-gray-900 data-[selected=true]:text-gray-900";

  return (
    <Card className="h-screen max-w-[20rem]  p-6 shadow-md z-10 sticky top-0">
      <div className="mb-2 flex items-center gap-4">
        <Image
          width={100}
          height={100}
          src="https://www.material-tailwind.com/logos/mt-logo.png"
          alt="brand"
          className="h-9 w-9"
        />
        <Typography color="blue-gray" className="text-lg font-bold">
          Material Tailwind
        </Typography>
      </div>
      <hr className="my-2 border-gray-200" />
      <List>
        <Accordion open={open === 1}>
          <ListItem
            selected={open === 1}
            data-selected={open === 1}
            onClick={() => handleOpen(1)}
            className="p-3 select-none hover:bg-gray-100 focus:bg-gray-100 active:bg-gray-100 hover:text-gray-900 focus:text-gray-900 active:text-gray-900 data-[selected=true]:text-gray-900"
          >
            <ListItemPrefix>
              <RiAdminFill className="w-5 h-5" />
            </ListItemPrefix>
            <Typography className="mr-auto font-normal text-inherit">
              Admin
            </Typography>
            <ChevronDownIcon
              strokeWidth={3}
              className={`ml-auto h-4 w-4 text-gray-500 transition-transform ${
                open === 1 ? "rotate-180" : ""
              }`}
            />
          </ListItem>
          <AccordionBody className="py-1">
            <List className="p-0">
              <Link href="/admin/profile">
                <ListItem className={`px-16 ${LIST_ITEM_STYLES}`}>
                  Thông tin
                </ListItem>
              </Link>
              <Link href="/admin/map">
                <ListItem className={`px-16 ${LIST_ITEM_STYLES}`}>
                  Map
                </ListItem>
              </Link>
            </List>
          </AccordionBody>
        </Accordion>
        <hr className="my-2 border-gray-200" />
        <Accordion open={open === 2}>
          <ListItem
            selected={open === 2}
            data-selected={open === 2}
            onClick={() => handleOpen(2)}
            className="px-3 py-[9px] select-none hover:bg-gray-100 focus:bg-gray-100 active:bg-gray-100 hover:text-gray-900 focus:text-gray-900 active:text-gray-900 data-[selected=true]:text-gray-900"
          >
            <ListItemPrefix>
              <RectangleGroupIcon className="h-5 w-5" />
            </ListItemPrefix>
            <Typography className="mr-auto font-normal text-inherit">
              Bảng điều khiển
            </Typography>
            <ChevronDownIcon
              strokeWidth={3}
              className={`ml-auto h-4 w-4 text-gray-500 transition-transform ${
                open === 2 ? "rotate-180" : ""
              }`}
            />
          </ListItem>
          <AccordionBody className="py-1">
            <List className="p-0">
              <Link href="/admin/dashboard/analytics">
                <ListItem className={`px-12 ${LIST_ITEM_STYLES}`}>
                  Thống kê
                </ListItem>
              </Link>
              <Link href="/admin/dashboard/payments">
                <ListItem className={`px-12 ${LIST_ITEM_STYLES}`}>
                  Thanh toán
                </ListItem>
              </Link>
            </List>
          </AccordionBody>
        </Accordion>
        <Link href="/admin/bills">
          <ListItem className={LIST_ITEM_STYLES}>
            <ListItemPrefix>
              <TicketIcon className="h-5 w-5" />
            </ListItemPrefix>
            Các khoản thu
          </ListItem>
        </Link>
        <Link
          href="/admin/homes
        "
        >
          <ListItem className={LIST_ITEM_STYLES}>
            <ListItemPrefix>
              <HomeIcon className="h-5 w-5" />
            </ListItemPrefix>
            Danh sách hộ gia đình
          </ListItem>
        </Link>
        <Link href="/admin/members">
          <ListItem className={LIST_ITEM_STYLES}>
            <ListItemPrefix>
              <UserGroupIcon className="h-5 w-5" />
            </ListItemPrefix>
            Danh sách thành viên
          </ListItem>
        </Link>
      </List>
      <hr className="my-2 border-gray-200" />
      <List>
        <Link href="/admin/help">
          <ListItem className={LIST_ITEM_STYLES}>
            <ListItemPrefix>
              <ChatBubbleLeftEllipsisIcon className="h-5 w-5" />
            </ListItemPrefix>
            Hỗ trợ và giải đáp
          </ListItem>
        </Link>
        <Link href="/admin/register">
          <ListItem className={LIST_ITEM_STYLES}>
            <ListItemPrefix>
              <RiUserAddFill className="h-5 w-5" />
            </ListItemPrefix>
            Tạo tài khoản mới
          </ListItem>
        </Link>
      </List>
    </Card>
  );
}

export function Sidebar1() {
  return <SidebarLight />;
}

export default Sidebar1;
