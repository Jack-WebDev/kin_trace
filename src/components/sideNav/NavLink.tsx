"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Play } from "lucide-react";

type NavLinkProps = {
  title: string;
  url: string;
  Icon: React.ElementType;
};

export const NavLink = (props: NavLinkProps) => {
  const { title, url, Icon } = props;
  const [active, setActive] = useState(false);

  const pathname = usePathname();
  const location = pathname.split("/")[2];
  const linkLocation = url.split("/")[2];

  useEffect(() => {
    if (location === linkLocation) {
      setActive(true);
    } else {
      setActive(false);
    }
  }, [location, linkLocation]);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const list = document.querySelectorAll(".navLink");
    list.forEach((item) => {
      item.classList.remove("bg-primary", "font-semibold");
      item.classList.add("text-gray-400");
      const icon = item.querySelector(".icon");
      if (icon) {
        icon.classList.remove("text-white");
      }
    });

    e.currentTarget.classList.add("bg-primary", "text-white", "font-semibold");
    const icon = e.currentTarget.querySelector(".icon");
    if (icon) {
      icon.classList.add("text-white");
    }
  };

  const cls = active
    ? "bg-primary text-white font-semibold"
    : "bg-transparent hover:text-primary hover:bg-transparent";
  const iconStyle = active ? "hidden md:flex rotate-90" : "hidden md:flex";

  return (
    <Link
      href={url}
      className={`navLink flex items-center justify-center text-white text-md md:justify-between gap-4 w-fit md:w-full py-3 px-3 md:px-4 rounded-full md:rounded-lg ${cls}`}
      onClick={(e) => handleClick(e)}
    >
      <div className="flex items-center gap-0 md:gap-4">
        <Icon size={18} className="icon text-white" />
        <p className={`hidden md:flex text-white`}>{title}</p>
      </div>

      <Play size={12} className={iconStyle} />
    </Link>
  );
};
