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
            src="/flat1.jfif"
            alt="image 1"
            className="h-full w-full object-cover"
          />
          <Image
            width={1000}
            height={1000}
            src="/flat2.jfif"
            alt="image 2"
            className="h-full w-full object-cover"
          />
          <Image
            width={1000}
            height={1000}
            src="/flat3.jfif"
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
          <Button onClick={()=>{route.push("/login")}} className="absolute bottom-20">Khám phá</Button>
      </div>
    </div>
  );
};

export default Page;
