import { Logo } from "@/components";
import React from "react";
import { LoginForm } from "@/modules/auth";


const Page = () => {

  return (
    <div className="w-full h-screen flex items-center justify-center bg-bgLight dark:bg-secondaryBg p-4">
      <div className="w-[400px] md:w-[600px] rounded-lg bg-primaryBg h-fit flex flex-col p-4 py-16 md:p-16 gap-12 items-stretch shadow-lg">
        <Logo />

        <div className="flex flex-col gap-2 w-full">
          <h1 className="text-xl font-extrabold ">Sign in to your account</h1>
          <p className="text-sm font-normal text-textColorLight max-w-96">
            Welcome back! Login with your credentials to access the KinTrace
          </p>
        </div>

        <LoginForm />
      </div>
    </div>
  );
};

export default Page;
