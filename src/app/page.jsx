"use client";
import { Button } from "@material-tailwind/react";
import React from "react";
import { Carousel } from "@material-tailwind/react";
import Image from "next/image";
import { useRouter } from "next/navigation";

const Page = () => {
  const route = useRouter();
  return (
    <div className="h-screen w-full bg-cover bg-center">
      <div className="w-full h-full flex flex-col justify-center items-center">
        <Carousel
          transition={{ duration: 2 }}
          autoplay={true}
          loop={true}
          autoplayDelay={3000}
          className="rounded-xl relative"
        >
          <Image
            width={1000}
            height={1000}
            src="https://images.unsplash.com/photo-1497436072909-60f360e1d4b1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2560&q=80"
            alt="image 1"
            className="h-full w-full object-cover"
          />
          <Image
            width={1000}
            height={1000}
            src="https://images.unsplash.com/photo-1493246507139-91e8fad9978e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2940&q=80"
            alt="image 2"
            className="h-full w-full object-cover"
          />
          <Image
            width={1000}
            height={1000}
            src="https://images.unsplash.com/photo-1518623489648-a173ef7824f3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2762&q=80"
            alt="image 3"
            className="h-full w-full object-cover"
          />
          <Image
            width={1000}
            height={1000}
            src="/bg.avif"
            alt="image 3"
            className="h-full w-full object-cover"
          />
        </Carousel>
          <Button onClick={()=>{route.push("/login")}} className="absolute bottom-20">Get Started</Button>
      </div>
    </div>
  );
};

export default Page;
