import { Button } from "@/packages/ui";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import React from "react";

export const LinkButton = (props: LinkButtonProps) => {
  return (
    <Link href={props.url} className="w-fit h-fit ">
      <Button
        variant="primary"
        className="p-4 w-fit h-fit rounded-full  hover:scale-125 transition-all bg-primaryBg shadow-lg hover:bg-primaryBg border border-borderColor/50"
      >
        <ChevronRight size={25} className="text-textColor" />
      </Button>
    </Link>
  );
};

type LinkButtonProps = {
  url: string;
};
