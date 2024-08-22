"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";

const AdminLogout = () => {
  const router = useRouter();
  const handleAdminLogout = () => {
    let access = localStorage.getItem("accessKey");
    if (access) {
      localStorage.removeItem("accessKey");
      router.push("/");
    }
  };
  return (
    <Button onClick={handleAdminLogout} variant={"outline"}>
      Logout
    </Button>
  );
};

export default AdminLogout;
