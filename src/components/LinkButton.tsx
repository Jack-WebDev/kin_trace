import React from "react";
import Link from "next/link";
import { Badge, Button } from "@/packages/ui";

export const LinkButton = (props: LinkButtonProps) => {
  const { title, url, textColor, deco } = props;
  return deco ? (
    <Link href={url} className="w-full">
      <p
        className={
          textColor
            ? `font-normal text-sm text-[${textColor}]`
            : "font-normal text-sm text-gray-500"
        }
      >
        {title}
      </p>
    </Link>
  ) : (
    <Link href={url} className="w-full hover:underline ">
      <p
        className={
          textColor
            ? `font-normal text-sm text-[${textColor}]`
            : "font-normal text-sm text-gray-500"
        }
      >
        {title}
      </p>
    </Link>
  );
};

export const LinkIconButton = (props: LinkIconButtonProps) => {
  const { title, url, textColor, link, Icon, badge, badgeValue } =
    props;
  return link ? (
    <Link
      href={url!}
      className="w-full flex items-center justify-between hover:bg-secondary text-textColorLight hover:text-white gap-2 py-3 px-4"
      style={{ textDecoration: "none" }}
    >
      <div className="flex items-center gap-2 w-fit">
        <Icon
          size={20}
          className=" justify-start gap-2 cursor-pointer text-inherit rounded-full"
        />
        <p
          className={
            textColor
              ? `font-normal text-xs text-[${textColor}]`
              : "font-semibold text-xs text-inherit "
          }
        >
          {title}
        </p>
      </div>

      {badge && (
        <Badge
          className="text-xs font-normal h-5 w-4 flex items-center justify-center"
          variant={"success"}
        >
          {badgeValue}
        </Badge>
      )}
    </Link>
  ) : (
    <Button
      variant="ghost"
      className="w-full flex items-center hover:underline gap-4 justify-start text-gray-500 hover:bg-[#f6bb48] hover:text-white "
      style={{ textDecoration: "none" }}
    >
      <Icon
        size={14}
        className="justify-start gap-2 cursor-pointer rounded-full hover:bg-gray-100"
      />
      <p
        className={textColor ? `font-normal text-xs ` : "font-normal text-xs "}
      >
        {title}
      </p>
    </Button>
  );
};

export const MenuButton = (props: MenuButtonProps) => {
  const { title } = props;
  return (
    <div
      className="w-full flex items-center justify-between hover:bg-secondary  hover:text-white gap-2 p-2 rounded-sm font-normal text-sm text-textColor"
      style={{ textDecoration: "none" }}
    >
      {title}
    </div>
  );
};
export const DropMenuButton = (props: DropMenuButtonProps) => {
  const { title, Icon, textColor, iconColor } = props;
  return (
    <div className="w-full flex items-center justify-start gap-4 py-2 text-gray-500 dark:text-white px-2 rounded-none hover:bg-[#946cea] hover:text-white">
      <Icon
        size={14}
        className={`justify-start gap-2 cursor-pointer rounded-full  text-[${iconColor}]`}
      />
      <p
        className={
          textColor
            ? `font-normal text-xs text-[${textColor}]`
            : "font-semibold text-xs text-inherit "
        }
      >
        {title}
      </p>
    </div>
  );
};
export const DropMenuLink = (props: DropMenuLinkProps) => {
  const { title, Icon, textColor, iconColor, link } = props;
  return (
    <Link
      href={link}
      className="w-full flex items-center justify-start gap-4 py-2 text-gray-500 dark:text-white  hover:text-white  hover:bg-[#946cea] px-2 rounded-none"
    >
      <Icon
        size={14}
        className={`justify-start gap-2 cursor-pointer rounded-full  text-[${iconColor}]`}
      />
      <p
        className={
          textColor
            ? `font-normal text-xs text-[${textColor}]`
            : "font-semibold text-xs text-inherit"
        }
      >
        {title}
      </p>
    </Link>
  );
};

export type LinkButtonProps = {
  title: string;
  url: string;
  textColor?: string;
  deco?: boolean;
};
type MenuButtonProps = {
  title: string;
};
export type DropMenuButtonProps = {
  title: string;
  textColor?: string;
  Icon: React.ElementType;
  iconColor?: string;
};
export type DropMenuLinkProps = {
  title: string;
  link: string;
  textColor?: string;
  Icon: React.ElementType;
  iconColor?: string;
};
export type LinkIconButtonProps = {
  link?: boolean;
  title: string;
  url?: string;
  textColor?: string;
  Icon: React.ElementType;
  onClick?: () => Promise<void>;
  badge?: boolean;
  badgeValue?: number | string;
  badgeVariant?:
    | "default"
    | "notification"
    | "inbox"
    | "tasks"
     
    | "destructive"
    | "outline"
    | "secondary"
     
    | null
    | undefined;
};
