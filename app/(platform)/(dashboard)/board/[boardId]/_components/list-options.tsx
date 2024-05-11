"use client";
import React from "react";
import { List } from "@prisma/client";
import { MoreHorizontal, X } from "lucide-react";
import {
  Popover,
  PopoverClose,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import FormSubmit from "@/components/form/form-submit";
import { Separator } from "@/components/ui/separator";

type ListOptionsProps = {
  data: List;
  onAddCard: () => void;
};

const ListOptions = ({ data, onAddCard }: ListOptionsProps) => {
  return (
    <Popover>
      <PopoverTrigger>
        <Button asChild className=" h-auto w-auto p-2" variant="ghost">
          <MoreHorizontal className=" h-4 w-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className=" px-0 pt-3 pb-3" side="bottom" align="start">
        <div className=" text-sm font-medium text-center text-neutral-600">
          List actions
        </div>
        <PopoverClose asChild>
          <Button
            className=" h-auto w-auto p-2 absolute top-2 right-2 text-neutral-600"
            variant="ghost"
          >
            <X className=" h-4 w-4" />
          </Button>
        </PopoverClose>
        <Button
          onClick={onAddCard}
          className=" rounded-none w-full h-auto p-2 px-5 justify-start font-normal text-sm"
          variant="ghost"
        >
          Add card...
        </Button>
        <form action="">
          <input
            type="hidden"
            name="id"
            id="id"
            value={data.id}
            hidden
            aria-hidden
          />
          <input
            type="hidden"
            name="boardId"
            id="boardId"
            value={data.boardId}
            hidden
            aria-hidden
          />
          <FormSubmit
            className=" rounded-none w-full h-auto p-2 px-5 justify-start font-normal text-sm"
            variant="ghost"
          >
            Copy list...
          </FormSubmit>
        </form>
        <Separator />
        <form action="">
          <input
            type="hidden"
            name="id"
            id="id"
            value={data.id}
            hidden
            aria-hidden
          />
          <input
            type="hidden"
            name="boardId"
            id="boardId"
            value={data.boardId}
            hidden
            aria-hidden
          />
          <FormSubmit
            className=" rounded-none w-full h-auto p-2 px-5 justify-start font-normal text-sm"
            variant="ghost"
          >
            Delete this list...
          </FormSubmit>
        </form>
      </PopoverContent>
    </Popover>
  );
};

export default ListOptions;
