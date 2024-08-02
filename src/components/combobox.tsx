"use client";

import React, { useState, useEffect } from "react";
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";
import {
  Command,
  CommandGroup,
  CommandItem,
  Button,
  Popover,
  PopoverContent,
  PopoverTrigger,
  ScrollArea,
  Input,
} from "@/packages/ui";
import { Search } from "lucide-react";
import type { BeneficiaryType, ClientType, UserType } from "@/schema";

type ItemType = UserType | BeneficiaryType | ClientType;

type ComboBoxProps<T> = {
  searchTitle: string;
  list: T[];
  setId: (id: string) => void;
};

export function ComboBox({
  searchTitle,
  list,
  setId,
}: ComboBoxProps<ItemType>) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  const [filteredList, setFilteredList] = useState<ItemType[]>(list);

  useEffect(() => {
    setFilteredList(list); // Initialize the filteredList with the complete list
  }, [list]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchTerm = e.currentTarget.value.toLowerCase();

    const newList = list.filter(
      (item) =>
        item.surname.toLowerCase().includes(searchTerm) ||
        item.name.toLowerCase().includes(searchTerm),
    );

    setFilteredList(newList);
    setValue(searchTerm);
  };

  const handleSelect = (item: ItemType) => {
    setValue(`${item.surname.toLowerCase()} ${item.name.toLowerCase()}`);
    setId(item.id);
    setOpen(false);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          aria-controls="combo-box-list"
          className="w-full justify-between border-borderColor bg-transparent text-textColor dark:hover:bg-primary/10"
        >
          {value ? `${value} ` : searchTitle}
          <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0">
        <Command className="w-full">
          <div className="m-1 flex items-center rounded-lg border border-borderColor px-2">
            <Search size={18} className="text-textColorLight" />
            <Input
              className="bg-transparent px-1"
              placeholder="Search by name or surname"
              onChange={handleSearch}
              value={value}
            />
          </div>
          <CommandGroup>
            <ScrollArea
              className="max-h-72 min-h-0 w-full rounded"
              id="combo-box-list"
            >
              {filteredList.length > 0 ? (
                filteredList.map((item) => (
                  <CommandItem
                    key={item.id}
                    value={`${item.surname} ${item.id}`}
                    onSelect={() => handleSelect(item)}
                    className="text-textColorLight hover:bg-primary"
                  >
                    <span>
                      {item.name} {item.surname}
                    </span>
                    {"idNumber" in item && <span>{item.idNumber}</span>}
                    <CheckIcon
                      className={
                        value === item.surname.toLowerCase()
                          ? "ml-auto h-4 w-4 opacity-100"
                          : "ml-auto h-4 w-4 opacity-0"
                      }
                    />
                  </CommandItem>
                ))
              ) : (
                <div className="p-2 text-center text-textColorLight">
                  No results found
                </div>
              )}
            </ScrollArea>
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

export default ComboBox;
