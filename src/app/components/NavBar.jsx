"use client";
import React, { useEffect } from "react";
import {
  Navbar,
  Collapse,
  Typography,
  Button,
  IconButton,
} from "@material-tailwind/react";
import Link from "next/link";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { GiMoonOrbit } from "react-icons/gi";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

function NavItem({ label, to }) {
  return (
    <Link href={`/${to}`}>
      <Typography as="li" color="blue-gray" className="p-1 font-medium">
        {label}
      </Typography>
    </Link>
  );
}

function NavList() {
  return (
    <ul className="mb-4 mt-2 flex flex-col gap-3 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-8">
      <NavItem label="Về chúng tôi" to="about" />
      <NavItem label="Mua ngay" to="pricing" />
      <NavItem label="Liên hệ" to="contact" />
    </ul>
  );
}

export function NavbarWithSimpleLinks() {
  const router=useRouter()
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen((cur) => !cur);
  const { data: session, status: sessionStatus } = useSession();
  const handleSignout = () => {
    signOut();
  };

  React.useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpen(false)
    );
  }, []);

  return (
    <div className=" min-w-full fixed z-20">
      <Navbar className="bg-white" fullWidth>
        <div className="container mx-auto flex items-center justify-between text-blue-gray-900">
          <div className="flex justify-center items-center gap-1">
            <Link href="/">
              <GiMoonOrbit className="w-10 h-10 flex justify-center items-center text-blue-700" />
            </Link>
            <Typography
              as="a"
              href="/"
              color="blue-gray"
              className="mr-4 cursor-pointer text-lg font-bold"
            >
              Bluemoon Villa
            </Typography>
          </div>
          <div className="hidden lg:block">
            <NavList />
          </div>
          {!session ? (
            <Link href="/login">
              <Button color="gray" className="hidden lg:inline-block">
                Đăng nhập
              </Button>
            </Link>
          ) : (
            <div className="flex justify-center items-center gap-4">
              <Typography as="h1" color="blue" className="ml-1 hidden lg:block">
                {session?.user.email}
              </Typography>
              <Button
                onClick={handleSignout}
                color="gray"
                className="hidden lg:inline-block"
              >
                Đăng xuất
              </Button>
            </div>
          )}

          <IconButton
            size="sm"
            variant="text"
            color="blue-gray"
            onClick={handleOpen}
            className="ml-auto inline-block text-blue-gray-900 lg:hidden"
          >
            {open ? (
              <XMarkIcon className="h-6 w-6" strokeWidth={2} />
            ) : (
              <Bars3Icon className="h-6 w-6" strokeWidth={2} />
            )}
          </IconButton>
        </div>
        <Collapse open={open}>
          <div className="mt-2 rounded-xl bg-white py-2">
            <NavList />
            {!session ? (
              <Link href="/login">
                <Button className="mb-2" fullWidth>
                  Đăng nhập
                </Button>
              </Link>
            ) : (
              <>
                {/* <Typography as="h1" color="blue" className="ml-1">
                  {session?.user.email}
                </Typography> */}

                <Typography as="h1" color="blue" className="ml-1">
                  {session?.user.email}
                </Typography>
                <Button className="my-2" fullWidth onClick={handleSignout}>
                  Đăng xuất
                </Button>
              </>
            )}
          </div>
        </Collapse>
      </Navbar>
    </div>
  );
}

export default NavbarWithSimpleLinks;
