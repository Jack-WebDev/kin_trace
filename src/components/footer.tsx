'use client'
import React from "react";

export const Footer = (props: FooterProps) => {
  const { title, year, name } = props;
  return (
    <div className="bg-sideBarBgDark p-8 w-full flex items-cente justify-center rounded-tl-lg rounded-tr-lg ">
      <span className="text-textColorLight text-sm">
        Copyright &copy; {year}{" "}
        <span className="font-semibold text-white">{title}.</span>{" "}
        <span className=" mx-1">Developed by {name}</span>
      </span>
    </div>
  );
};

type FooterProps = {
  title: string;
  year: number | string;
  name: string;
};
