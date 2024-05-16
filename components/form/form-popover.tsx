"use client";
import React, { ElementRef, useRef } from "react";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverClose,
} from "../ui/popover";
import FormInput from "./form-input";
import FormSubmit from "./form-submit";
import { useAction } from "@/hooks/use-action";
import { createdBoard } from "@/actions/create-board";
import { X } from "lucide-react";
import { Button } from "../ui/button";
import { toast } from "sonner";
import FormPicker from "./form-picker";
import { useRouter } from "next/navigation";
import { useProModal } from "@/hooks/use-pro-modal";

type FormPopoverProps = {
  children: React.ReactNode;
  side?: "left" | "right" | "top" | "bottom";
  align?: "start" | "center" | "end";
  sideOffset?: number;
};

const FormPopover = ({
  children,
  side = "bottom",
  align,
  sideOffset,
}: FormPopoverProps) => {
  const proModal = useProModal();
  const router = useRouter();
  const closeRef = useRef<ElementRef<"button">>(null);
  const { execute, fieldErrors } = useAction(createdBoard, {
    onSuccess: (data) => {
      closeRef.current?.click();
      toast.success("Board created.");
      router.push(`/board/${data.id}`);
    },
    onError: (error) => {
      console.log(error);
      toast.error(error);
      proModal.onOpen();
    },
  });

  const onSubmit = (formData: FormData) => {
    const title = formData.get("title") as string;
    const image = formData.get("image") as string;
    execute({ title, image });
  };
  return (
    <Popover>
      <PopoverTrigger asChild>{children}</PopoverTrigger>
      <PopoverContent
        align={align}
        className=" w-80 pt-3"
        side={side}
        sideOffset={sideOffset}
      >
        <div className=" text-sm font-medium text-center text-neutral-600 pb-4">
          Create board
        </div>
        <PopoverClose ref={closeRef} asChild>
          <Button
            variant="ghost"
            className=" h-auto w-auto p-2 absolute top-2 right-2 text-neutral-600"
          >
            <X className=" h-4 w-4" />
          </Button>
        </PopoverClose>
        <form action={onSubmit} className=" space-y-4">
          <div className=" space-y-4">
            <FormPicker id="image" errors={fieldErrors} />
            <FormInput
              id="title"
              label="Board title"
              type="text"
              errors={fieldErrors}
            />
          </div>
          <FormSubmit className=" w-full">Create</FormSubmit>
        </form>
      </PopoverContent>
    </Popover>
  );
};

export default FormPopover;
