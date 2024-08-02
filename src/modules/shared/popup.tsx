import {
  Button,
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/packages/ui";
import { Note, Task, Case, User, Notification } from "@prisma/client";
import { Eye } from "lucide-react";
import React from "react";
import { ViewTask } from "../task";
import { ViewNote } from "../note";
import { ShowNotification } from "../notification";

export const ViewPopup = (props: ViewPopupProps) => {
  const { type, item, link, smallAction } = props;

  return (
    <Dialog>
      <DialogTrigger asChild>
        {link ? (
          <span className="flex items-center gap-2 cursor-pointer">
            <Eye size={20} className="text-primary" />
            <span className="text-primary font-semibold text-xs underline">
              View
            </span>
          </span>
        ) : smallAction ? (
          <Button
            variant="primary"
            className="flex items-center h-fit w-fit text-white p-2 bg-transparent hover:bg-primary/20"
          >
            <Eye size={15} className="text-primary dark:text-white" />
          </Button>
        ) : (
          <Button
            variant="primary"
            className="flex items-center h-fit w-fit text-white"
          >
            <Eye size={15} className="text-white" />
          </Button>
        )}
      </DialogTrigger>

      <DialogContent className="overflow-y-auto max-h-full min-w-none md:min-w-max ">
        {type === "task" ? (
          <ViewTask task={item as Task} />
        ) : type === "note" ? (
          <ViewNote note={item as Note} />
        ) : type === "caseLight" ? (
          <ShowComment case={item as Case} />
        ) : (
          type === "notification" && (
            <ShowNotification notification={item as Notification} />
          )
        )}
      </DialogContent>
    </Dialog>
  );
};

const ShowComment = (props: { case: Case }) => {
  return (
    <div className="w-full p-4 ">
      <p className="text-sm text-textColor text-center max-w-[500px]">
        {"Case comment"}
      </p>
    </div>
  );
};

type ViewPopupProps = {
  type: string;
  item: User | Case | Note | Task | Notification;
  link?: boolean;
  smallAction?: boolean;
};
