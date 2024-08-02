"use client";
import { Loader } from "@/packages/ui";
import axios from "axios";
import React, { useEffect, useState } from "react";

const Page = () => {
  useEffect(() => {
    const fetcher = async () => {
      try {
        const res = await axios.post(`/api/logout`);
        window.location.replace("/");
      } catch (error) {
        console.log(error);
      }
    };

    fetcher();
  }, []);

  return (
    <div className="fixed left-0 top-0 z-50 grid h-screen w-screen place-items-center bg-white dark:bg-primaryBg">
      <Loader className="border-primary" />
    </div>
  );
};

export default Page;
