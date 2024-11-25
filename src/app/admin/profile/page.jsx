"use client";
import React from "react";

// @material-tailwind/react
import {
  Input,
  Typography,
  Select,
  Option,
  Popover,
  PopoverHandler,
  PopoverContent,
  Dialog,
  Button,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Card,
  List,
  ListItem,
} from "@material-tailwind/react";

import { useSession } from "next-auth/react";
import { toast } from "react-toastify";

function Account1() {
  const [open, setOpen] = React.useState(0);
  const handleOpen = (value) => setOpen(open === value ? 0 : value);
  const { data: session, status: sessionStatus } = useSession();
  const id=session?.user?.id;
  const [firstName, setFirstName]=React.useState("")
  const [lastName, setLastName]=React.useState("")
  const [location,setLocation] = React.useState("")
  const [phoneNumber, setPhoneNumber]=React.useState("")
  const [language, setLanguage]=React.useState("")
  const [skills, setSkills]=React.useState("")
  
  const fetchAccount = async () => {
    const response = await fetch(`/api/profile/${id}`);
    const data = await response.json();
    setFirstName(data.firstName);
    setLastName(data.lastName);
    setLocation(data.location);
    setPhoneNumber(data.phoneNumber);
    setLanguage(data.language);
    setSkills(data.skills);
  }
  React.useEffect(() => {
    fetchAccount();
  },[]);
  if (sessionStatus === "loading") return <div className="w-full h-screen bg-gradient-to-r from-cyan-500 to-blue-500 pt-40 flex justify-center items-center">Loading...</div>;
  const handleSubmit=async(e)=>{
    e.preventDefault();
    const firstName = e.target[0].value;
    const lastName = e.target[1].value;
    const location=e.target[2].value;
    const phoneNumber = e.target[3].value;
    const language=e.target[4].value;
    const skills=e.target[5].value;
    const id=session?.user?.id;
    if (!firstName || !lastName || !phoneNumber) {
      toast.error("Please fill all the required fields");
      return;
    }
    const response = await fetch("/api/profile", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ firstName, lastName, location, phoneNumber, language, skills, id }),
    });
    const data = await response.json();
    console.log(data);
    if (data.error) {
      toast.error(data.error);
    } else {
      toast.success("Profile updated successfully");
    }
  }
  const handleSubmit1 = async (e) => {
    e.preventDefault();
    const currentPassword = e.target[0].value;
    const newPassword = e.target[1].value;
    const id = session?.user?.id;
    console.log(id);
    if (!currentPassword || !newPassword) {
      toast.error("All fields are required");
      return;
    }
    const response = await fetch("/api/change-password", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        currentPassword: currentPassword,
        newPassword: newPassword,
        id: id,
      }),
    });
    const data = await response.json();
    if (response.ok) {
      toast.success("Password updated successfully");
    } else {
      toast.error("Failed to update password");
    }
    setOpen(false);
  };
  const handleDelete = async () => {
    const response = await fetch("/api/delete-account", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: session?.user?.id,
      }),
    });
    const data = await response.json();
    console.log(data);
    if (response.ok) {
      toast.success("Account deleted successfully");
    } else {
      toast.error("Failed to delete account");
    }
    setOpen(false);
    signOut();
  };
  
  return (
    <section className="px-8 py-20 container mx-auto">
      <Typography variant="h5" color="blue-gray">
        Basic Information
      </Typography>
      <Typography variant="small" className="text-gray-600 font-normal mt-1">
        Update your profile information below.
      </Typography>
      <form onSubmit={handleSubmit}>
      <div className="flex flex-col mt-8">
        <div className="mb-6 flex flex-col items-end gap-4 md:flex-row">
          <div className="w-full">
            <Typography
              variant="small"
              color="blue-gray"
              className="mb-2 font-medium"
            >
              First Name<span className="text-red-600">*</span>
            </Typography>
            <Input
              size="lg"
              placeholder="Emma"
              labelProps={{
                className: "hidden",
              }}
              className="w-full placeholder:opacity-100 focus:border-t-primary border-t-blue-gray-200"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>
          <div className="w-full">
            <Typography
              variant="small"
              color="blue-gray"
              className="mb-2 font-medium"
            >
              Last Name<span className="text-red-600">*</span>
            </Typography>
            <Input
              size="lg"
              placeholder="Roberts"
              labelProps={{
                className: "hidden",
              }}
              className="w-full placeholder:opacity-100 focus:border-t-primary border-t-blue-gray-200"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>
        </div>
        
        <div className="mb-6 flex flex-col items-end gap-4 md:flex-row">
          <div className="w-full">
            <Typography
              variant="small"
              color="blue-gray"
              className="mb-2 font-medium"
            >
              Location
            </Typography>
            <Input
              size="lg"
              placeholder="Florida, USA"
              labelProps={{
                className: "hidden",
              }}
              className="w-full placeholder:opacity-100 focus:border-t-primary border-t-blue-gray-200"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </div>
          <div className="w-full">
            <Typography
              variant="small"
              color="blue-gray"
              className="mb-2 font-medium"
            >
              Phone Number
              <span className="text-red-600">*</span>
            </Typography>
            <Input
              size="lg"
              placeholder="0123 456 789"
              labelProps={{
                className: "hidden",
              }}
              className="w-full placeholder:opacity-100 focus:border-t-primary border-t-blue-gray-200"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
          </div>
        </div>
        <div className="flex flex-col items-end gap-4 md:flex-row">
          <div className="w-full">
            <Typography
              variant="small"
              color="blue-gray"
              className="mb-2 font-medium"
            >
              Language
            </Typography>
            <Input
              size="lg"
              placeholder="Language"
              labelProps={{
                className: "hidden",
              }}
              className="w-full placeholder:opacity-100 focus:border-t-primary border-t-blue-gray-200"
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
            />
          </div>
          <div className="w-full">
            <Typography
              variant="small"
              color="blue-gray"
              className="mb-2 font-medium"
            >
              Skills
            </Typography>
            <Input
              size="lg"
              placeholder="Skills"
              labelProps={{
                className: "hidden",
              }}
              className="w-full placeholder:opacity-100 focus:border-t-primary border-t-blue-gray-200"
              value={skills}
              onChange={(e) => setSkills(e.target.value)}
            />
          </div>
        </div>
        <Button
          variant="gradient"
          color="green"
          size="lg"
          className="w-5 mt-2 md:w-max "
          type="submit"
        >
          Save
        </Button>
      </div>
      </form>
      <Card className="w-96 mt-4">
        <List>
          <ListItem onClick={() => handleOpen(1)}>
            Change your password
          </ListItem>
          <ListItem onClick={() => handleOpen(2)} className="text-red-600">
            Delete your account
          </ListItem>
        </List>
      </Card>
      <Dialog open={open === 1} handler={handleOpen}>
        <DialogHeader>Change your password here</DialogHeader>
        <form onSubmit={handleSubmit1}>
          <DialogBody className="flex flex-col gap-4">
            <Input type="password" label="Old Password" />
            <Input type="password" label="New Password" />
          </DialogBody>
          <DialogFooter>
            <Button
              variant="text"
              color="red"
              onClick={handleOpen}
              className="mr-1"
            >
              <span>Cancel</span>
            </Button>
            <Button variant="gradient" color="green" type="submit">
              <span>Confirm</span>
            </Button>
          </DialogFooter>
        </form>
      </Dialog>
      <Dialog open={open === 2} handler={handleOpen}>
        <DialogHeader>Want to delete your account?</DialogHeader>
        <DialogBody>
          You cannot get this account back. Are you sure you want to delete it?
        </DialogBody>
        <DialogFooter>
          <Button
            variant="text"
            color="red"
            onClick={handleOpen}
            className="mr-1"
          >
            <span>Cancel</span>
          </Button>
          <Button variant="gradient" color="red" onClick={handleDelete}>
            <span>Delete</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </section>
  );
}

export default Account1;
