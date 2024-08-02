'use client'
import { Button } from "@/packages/ui";
import { Eye, SquarePen } from "lucide-react";
import Link from "next/link";
import React from "react";
import { DeleteAction } from "./deleteAction";


export const CrudActions = (props: ActionProps) => {
  const { id, url, edit, remove, view, partial, model } = props;

  return !partial ? (
    <div className="w-full flex items-center gap-4 justify-center">
      <Link href={`${url}/${id}`}>
        <Button variant="primary" className="h-fit w-fit px-2">
          <Eye size={15} className="text-white" />
        </Button>
      </Link>
      <Button variant="secondary" className="h-fit w-fit px-2">
        <SquarePen size={15} className="text-white" />
      </Button>

      {model && <DeleteAction actionId={id} model={model}/>}
    </div>
  ) : (
    <div className="w-full flex items-center gap-4 justify-center">
      {view && (
        <Link href={`${url}/${id}`}>
          <Button variant="primary" className="h-fit w-fit px-2">
            <Eye size={15} className="text-white" />
          </Button>
        </Link>
      )}
      {edit && (
        <Button variant="secondary" className="h-fit w-fit px-2">
          <SquarePen size={15} className="text-white" />
        </Button>
      )}

      {remove && model && <DeleteAction actionId={id} model={model}/>}
    </div>
  );
};

type ActionProps = {
  id: string;
  url?: string;
  model?: string;
  edit?: boolean;
  remove?: boolean;
  view?: boolean;
  partial?: boolean;
};
