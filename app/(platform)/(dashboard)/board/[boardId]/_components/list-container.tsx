"use client";
import type { ListWithCards } from "@/types";

type ListContainerProps = {
  data: ListWithCards[];
  boardId: string;
};

const ListContainer = ({ data, boardId }: ListContainerProps) => {
  return <div>ListContainerProps</div>;
};

export default ListContainer;
