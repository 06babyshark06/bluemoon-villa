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
  ChartBarIcon,
  UserIcon,
  ArchiveBoxArrowDownIcon,
  CurrencyDollarIcon,
} from "@heroicons/react/24/solid";
import {
  ChevronDownIcon,
  ArrowLeftStartOnRectangleIcon,
} from "@heroicons/react/24/outline";
import Image from "next/image";
import { RiAdminFill, RiUserAddFill } from "react-icons/ri";
import Link from "next/link";
import { FcCurrencyExchange } from "react-icons/fc";

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
        <Link href="/admin/profile">
          <ListItem className={LIST_ITEM_STYLES}>
            <ListItemPrefix>
              <UserIcon className="h-5 w-5" />
            </ListItemPrefix>
            Thông tin
          </ListItem>
        </Link>
        <Link href="/admin/analytics">
          <ListItem className={LIST_ITEM_STYLES}>
            <ListItemPrefix>
              <ChartBarIcon className="h-5 w-5" />
            </ListItemPrefix>
            Thống kê
          </ListItem>
        </Link>
        <Link href="/admin/payments">
          <ListItem className={LIST_ITEM_STYLES}>
            <ListItemPrefix>
              <CurrencyDollarIcon className="h-5 w-5" />
            </ListItemPrefix>
            Thanh toán
          </ListItem>
        </Link>
        <Link href="/admin/bills">
          <ListItem className={LIST_ITEM_STYLES}>
            <ListItemPrefix>
              <TicketIcon className="h-5 w-5" />
            </ListItemPrefix>
            Các khoản thu
          </ListItem>
        </Link>
        <Link href="/admin/homes">
          <ListItem className={LIST_ITEM_STYLES}>
            <ListItemPrefix>
              <HomeIcon className="h-5 w-5" />
            </ListItemPrefix>
            Hộ khẩu
          </ListItem>
        </Link>
        <Link href="/admin/members">
          <ListItem className={LIST_ITEM_STYLES}>
            <ListItemPrefix>
              <UserGroupIcon className="h-5 w-5" />
            </ListItemPrefix>
            Nhân khẩu
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
