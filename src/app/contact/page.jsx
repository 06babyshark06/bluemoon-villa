"use client";
import {
  Accordion,
  AccordionBody,
  AccordionHeader,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Typography,
} from "@material-tailwind/react";
import Link from "next/link";
import React from "react";

const Contact = () => {
  const [open, setOpen] = React.useState(0);
  const handleOpen = (value) => setOpen(open === value ? 0 : value);

  return (
    <div className="h-screen flex justify-center items-center">
      <Card className="w-[30rem] p-9 ">
        <CardHeader color="" className="flex justify-center items-center mt-1">
          <Typography variant="h1" color="blue" className="my-3 ">
            Người quản lý
          </Typography>
        </CardHeader>
        <CardBody>
          <Typography variant="h3" color="blue-gray" className="my-3 ">
            Trần Đức An
          </Typography>
          <Typography variant="p" color="blue-gray" className="my-3">
            20224912 Hanoi University of Science and Technology K67 - IT1-05
          </Typography>
          <Typography variant="p" color="blue-gray" className="my-3">
            Respository trên github: <a className="text-blue-600" href="https://github.com/06babyshark06/bluemoon-villa">Bluemoon-villa</a>
          </Typography>
          <Typography variant="p" color="blue-gray" className="my-3">
            Số điện thoại : 0392225886
          </Typography>
          <Typography variant="p" color="blue-gray" className="my-3">
            Video hướng dẫn : <a className="text-blue-600" href="https://youtu.be/WYGRVRHwS0I">https://youtu.be/WYGRVRHwS0I</a>
          </Typography>
        </CardBody>
        <CardFooter className="pt-0 w-full">
          <Link href="/">
            <Button className="w-full bg-white text-blue-500">Quay lại trang chủ</Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Contact;