import React from "react";
import { Radio } from "lucide-react";
import Link from "next/link";

export const Logo = (props: Props) => {
  const { sideNav } = props;
  return sideNav ? (
    <Link
      href="/dashboard"
      className="flex items-center w-full border-b border-gray-700 h-24 justify-center py-0"
    >
      <h1 className="text-3xl font-extrabold flex items-center">
        <span className="bg-danger md:bg-primary text-white px-4 py-2 flex items-center gap-4 rounded-lg md:rounded-l-lg md:rounded-r-none ">
          {" "}
          <Radio size={30} className="text-white" />
          <span className="hidden md:flex">Kin</span>
        </span>
        <span className="hidden md:flex bg-danger text-white px-4 py-2 rounded-r-lg">
          Trace
        </span>
      </h1>
    </Link>
  ) : (
    <div className="flex flex-col gap-4 items-center w-full">
      <h1 className="text-3xl font-extrabold flex items-center">
        <span className="bg-primary text-white px-2 flex items-center gap-4 rounded-l-lg">
          {" "}
          <Radio size={30} className="text-white" />
          Kin
        </span>
        <span className="bg-danger text-white px-2 rounded-r-lg">Trace</span>
      </h1>
    </div>
  );
};

type Props = {
  sideNav?: boolean;
};
