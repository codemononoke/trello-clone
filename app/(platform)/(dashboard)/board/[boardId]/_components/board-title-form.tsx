"use client";
import React, { ElementRef, KeyboardEvent, useRef, useState } from "react";
import { Board } from "@prisma/client";
import { Button } from "@/components/ui/button";
import FormInput from "@/components/form/form-input";
import { toast } from "sonner";
import { updateBoard } from "@/actions/update-board";
import { useAction } from "@/hooks/use-action";
import { useEventListener, useOnClickOutside } from "usehooks-ts";

type BoardTitleFormProps = {
  data: Board;
};

const BoardTitleForm = ({ data }: BoardTitleFormProps) => {
  const formRef = useRef<ElementRef<"form">>(null);
  const inputRef = useRef<ElementRef<"input">>(null);

  const [title, setTitle] = useState(data.title);
  const [isEditing, setIsEditing] = useState(false);

  const { execute } = useAction(updateBoard, {
    onSuccess: (data) => {
      toast.success(`Board "${data.title}" updated.`);
      setTitle(data.title);
      disableEditing();
    },
    onError: (error) => {
      toast.error(error);
    },
  });

  const enableEditing = () => {
    setIsEditing(true);
    setTimeout(() => {
      inputRef.current?.focus();
      inputRef.current?.select();
    });
  };

  const disableEditing = () => {
    setIsEditing(false);
  };

  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Escape") {
      disableEditing();
    }
  };

  useEventListener("keydown", onKeyDown);
  useOnClickOutside(formRef, disableEditing);

  const onSubmit = (formData: FormData) => {
    const newTitle = formData.get("title") as string;

    if (title !== newTitle && newTitle.length > 3) {
      execute({
        title: newTitle,
        id: data.id,
      });
    } else {
      disableEditing();
    }
  };

  const onBlur = () => {
    formRef.current?.requestSubmit();
  };

  if (isEditing) {
    return (
      <form
        action={onSubmit}
        ref={formRef}
        className=" flex items-center gap-x-2"
      >
        <FormInput
          ref={inputRef}
          id="title"
          placeholder="Board title:"
          onBlur={onBlur}
          defaultValue={title}
          className=" text-lg font-bold px-[7px] bg-transparent focus-visible:!outline-none focus-visible:!ring-transparent focus-visible:!ring-offset-0 placeholder:text-white/60 border-none"
        />
      </form>
    );
  } else {
    return (
      <Button
        onClick={enableEditing}
        variant="transparent"
        className=" font-bold text-lg h-auto w-auto p-1 px-2"
      >
        {title}
      </Button>
    );
  }
};

export default BoardTitleForm;
