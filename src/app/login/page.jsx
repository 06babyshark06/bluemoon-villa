"use client";
import React, { useEffect } from "react";

// @components
import {
  Card,
  Input,
  Button,
  CardBody,
  CardHeader,
  Typography,
} from "@material-tailwind/react";
import Link from "next/link";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

function Login() {
  const router = useRouter();
  const { data: session, status: sessionStatus } = useSession();
  useEffect(() => {
    if (sessionStatus === "authenticated") {
      router.push("/admin/profile");
    }
  }, [sessionStatus, router]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;
    if (!email || !password) {
      toast.error("Please fill all the fields");
      return;
    }
    const response = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });
    if (response?.error) {
      if (response?.url) {
        router.replace("/admin/profile");
      }
      toast.error("Invalid credentials");
    } else {
      toast.success("Login successful");
    }
  };
  return (
    sessionStatus === "unauthenticated" && (
      <section className="px-8">
        <div className="container mx-auto h-screen grid place-items-center ">
          <Card
            shadow={false}
            className="md:px-24 md:py-10 py-6 border border-gray-300 mt-5"
          >
            <CardHeader shadow={false} floated={false} className="text-center">
              <Typography
                variant="h1"
                color="blue-gray"
                className="mb-4 !text-3xl lg:text-4xl"
              >
                Login
              </Typography>
              <Typography className="!text-gray-600 text-[18px] font-normal md:max-w-sm">
                Welcome back, Master.
                <br /> We have been waiting for you.
              </Typography>
            </CardHeader>
            <CardBody>
              <form
                onSubmit={handleSubmit}
                className="flex flex-col gap-4 md:mt-12"
              >
                <Input
                  id="email"
                  color="gray"
                  size="lg"
                  type="email"
                  name="email"
                  label="Your Email"
                  className="w-full placeholder:opacity-100 focus:border-t-primary border-t-blue-gray-200"
                />
                <Input
                  id="password"
                  color="gray"
                  size="lg"
                  type="password"
                  name="password"
                  label="Password"
                  className="w-full placeholder:opacity-100 focus:border-t-primary border-t-blue-gray-200"
                />
                <Button type="submit" size="lg" color="gray" fullWidth>
                  continue
                </Button>

                <Typography
                  variant="small"
                  className="text-center mx-auto max-w-[19rem] !font-medium !text-gray-600"
                >
                  Sign in to create a new admin account <br />
                  <Link href="/" className="text-black">
                    Back to home
                  </Link>
                </Typography>
              </form>
            </CardBody>
          </Card>
        </div>
      </section>
    )
  );
}

export default Login;
