"use client";
import React from "react";
import { User } from "../user";
import { Note } from "@prisma/client";

export const ViewNote = (props: ViewtaskProps) => {
  const { note } = props;

  return (
    <div className="flex w-full flex-col md:w-[600px]">
      <h1 className="font-bold mb-8 text-xl w-full text-center ">View note </h1>

      <div className="flex w-full flex-col md:flex-row items-center justify-start gap-x-10 mb-4">
        <div className="flex flex-col gap-0">
          <span className="font-semibold text-textColorLight">Created by:</span>
          <User userId={note.userId} bold image />
        </div>
      </div>

      <div className="w-full border border-borderColor/50 rounded-lg p-4 flex flex-col mb-4 shadow-lg">
        <span className="font-semibold text-textColorLight">Note message:</span>
        <p className="text-textColor text-sm  ">{note.message}</p>
      </div>
    </div>
  );
};

type ViewtaskProps = {
  note: Note;
};
