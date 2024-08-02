"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/packages/ui";
import { MenuButton } from "../LinkButton";

export function ThemeToggle() {
  const { setTheme } = useTheme();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="h-fit w-fit outline-none p-0 bg-transparent text-black dark:text-white border-none"
        >
          <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0 text-gray-500" />
          <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100 text-gray-400" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="dark:bg-secondaryBg p-0 border-none"
      >
        <DropdownMenuItem onClick={() => setTheme("light")} className="p-0">
          <MenuButton title="Light" />
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("dark")} className="p-0">
          <MenuButton title="Dark" />
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("system")} className="p-0">
          <MenuButton title="System" />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
