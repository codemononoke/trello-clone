"use client";
import type { ListWithCards } from "@/types";
import ListForm from "./list-form";

type ListContainerProps = {
  data: ListWithCards[];
  boardId: string;
};

const ListContainer = ({ data, boardId }: ListContainerProps) => {
  return (
    <ol>
      <ListForm />
      <div aria-hidden className=" flex shrink-0 w-1" />
    </ol>
  );
};

export default ListContainer;
