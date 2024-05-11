"use client";
import React, { ElementRef, useRef, useState } from "react";
import ListHeader from "./list-header";
import { ListWithCards } from "@/types";
import CardForm from "./card-form";

type ListItemProps = {
  data: ListWithCards;
  index: number;
};

const ListItem = ({ data, index }: ListItemProps) => {
  const textareaRef = useRef<ElementRef<"textarea">>(null);

  const [isEditing, setIsEditing] = useState(false);

  const enableEditing = () => {
    setIsEditing(true);
    setTimeout(() => {
      textareaRef.current?.focus();
    });
  };

  const disableEditing = () => {
    setIsEditing(false);
  };

  return (
    <li className=" shrink-0 h-full w-[272px] select-none">
      <div className=" w-full rounded-md bg-[#f2f2f4] shadow-md pb-2">
        <ListHeader onAddCard={enableEditing} data={data} />
        <CardForm
          listId={data.id}
          ref={textareaRef}
          isEditing={isEditing}
          enableEditing={enableEditing}
          disableEditing={disableEditing}
        />
      </div>
    </li>
  );
};

export default ListItem;
