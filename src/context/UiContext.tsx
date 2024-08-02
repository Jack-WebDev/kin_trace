"use client";
import React, { createContext, useContext, useEffect, useState } from "react";

export type UiContextType = {
  menu: string;
  toggleMenu: () => void;
};

const StateContext = createContext<UiContextType | undefined>(undefined);

export const UiContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [menu, setMenu] = useState<string>("open");

  useEffect(() => {
    setMenu(localStorage.getItem("menu")!);
  }, []);

  useEffect(() => {
    localStorage.setItem("menu", menu);
  }, [menu]);

  const toggleMenu = () => {
    setMenu((prev) => (prev === "open" ? "closed" : "open"));
    localStorage.setItem("menu", menu);
  };
  return (
    <StateContext.Provider
      value={{
        menu,
        toggleMenu,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useUiStateContext = () => useContext(StateContext);
