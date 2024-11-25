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
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { signOut, useSession } from "next-auth/react";

function Register() {
  const router=useRouter()
  const {data:session,status:sessionStatus} = useSession()
  useEffect(()=>{
    if(sessionStatus==="unauthenticated"){
      router.push("/")
    }
  },[sessionStatus,router])

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;
    const confirmPassword = e.target[2].value;
    if (!email || !password || !confirmPassword) {
      toast.error("Please fill all the fields");
      return;
    }
    if (password === confirmPassword) {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email:email, password:password, confirmPassword:confirmPassword }),
      });
      const data = await response.json();
      if (data.error) {
        toast.error(data.error);
      } else {
        toast.success("User registered successfully");
      }
    }
  }
  if (session==='loading') return <h1>Loading...</h1>
  return (
    <section className="w-full h-screen flex justify-center items-center px-8">
      <div className="container mx-auto h-screen grid place-items-center">
        <Card
          shadow={false}
          className="md:px-24 md:py-14 py-8 border border-gray-300"
        >
          <CardHeader shadow={false} floated={false} className="text-center">
            <Typography
              variant="h1"
              color="blue-gray"
              className="mb-4 !text-3xl lg:text-4xl"
            >
              Register
            </Typography>
            <Typography className="!text-gray-600 text-[18px] font-normal md:max-w-sm">
              Trial to be our admins for 1 days
            </Typography>
          </CardHeader>
          <CardBody>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4 md:mt-12">
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
              <Input
                id="confirm-password"
                color="gray"
                size="lg"
                type="password"
                name="confirm-password"
                label="Confirm your Password"
                className="w-full placeholder:opacity-100 focus:border-t-primary border-t-blue-gray-200"
              />
              <Button size="lg" color="gray" fullWidth type="submit">
                continue
              </Button>
              <Typography
                variant="small"
                className="text-center mx-auto max-w-[19rem] !font-medium !text-gray-600"
              >
                Already has an account? {" "}<Link href="/login" className="text-black">Sign In</Link>
              </Typography>
            </form>
          </CardBody>
        </Card>
      </div>
    </section>
  );
}

export default Register;
