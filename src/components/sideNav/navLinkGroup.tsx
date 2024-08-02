"use client";
import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/packages/ui";
import { NavLink } from "./NavLink";
import { useUiStateContext } from "@/context";

type NavLinkGroupProps = {
  title: string;
  TitleIcon: React.ElementType;
  links: LinkType[];
};

export type LinkType = {
  url: string;
  title: string;
  Icon: React.ElementType;
  id: string;
};

export const NavLinkGroup = (props: NavLinkGroupProps) => {
  const { menu } = useUiStateContext()!;
  const { title, TitleIcon, links } = props;

  const displayClass = menu === "open" ? "flex" : "hidden";

  return (
    <div className="w-full z-10000 text-gray-400">
      <Accordion type="single" collapsible>
        <AccordionItem value="item-1" className="border-none pr-2">
          <AccordionTrigger className="bg-transparent pr-2 h-6">
            <div className="flex items-center gap-2 font-normal text-sm px-4 md:px-8 w-full">
              <TitleIcon size={18} />{" "}
              <p className={`hidden md:${displayClass} text-sm`}>{title}</p>
            </div>
          </AccordionTrigger>
          <AccordionContent className="pl-4 text-xs">
            {links.map((link) => (
              <NavLink
                url={link.url}
                title={link.title}
                Icon={link.Icon}
                key={link.id}
              />
            ))}
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};
