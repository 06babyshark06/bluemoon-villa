"use client";
import React from "react";
import {
  Breadcrumbs,
  Button,
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
  Input,
} from "@material-tailwind/react";
import Link from "next/link";
import { List, ListItem, Card } from "@material-tailwind/react";
import { toast } from "react-toastify";
import { signOut, useSession } from "next-auth/react";

const Settings = () => {
  const [open, setOpen] = React.useState(0);
  const handleOpen = (value) => setOpen(open === value ? 0 : value);
  const { data: session, status: sessionStatus } = useSession();
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
    console.log(data);
    if (response.ok) {
      toast.success("Password updated successfully");
    } else {
      toast.error("Failed to update password");
    }
    setOpen(false);
  };
  const handleDelete = async() => {
    const response = await fetch("/api/delete-account", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: session?.user?.id,
      })
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
    <div className="w-full mt-[4.7rem] bg-gradient-to-r from-cyan-500 to-blue-500">
      <Breadcrumbs>
        <Link href="/admin/settings" className="opacity-60">
          Settings
        </Link>
      </Breadcrumbs>
      <Card className="w-96">
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
    </div>
  );
};

export default Settings;
