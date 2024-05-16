import React from "react";
import { HelpCircle, User2 } from "lucide-react";
import Hint from "@/components/hint";
import FormPopover from "@/components/form/form-popover";
import { auth } from "@clerk/nextjs/server";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Skeleton } from "@/components/ui/skeleton";
import { db } from "@/lib/db";
import { getAvailableCount } from "@/lib/org-limit";
import { MAX_FREE_BOARDS } from "@/constants/boards";
import { cn } from "@/lib/utils";

const BoardList = async () => {
  const { orgId } = auth();

  if (!orgId) return redirect("/select-org");

  const boards = await db.board.findMany({
    where: {
      orgId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const availableCount = await getAvailableCount();

  const remainingBoards = MAX_FREE_BOARDS - availableCount;

  return (
    <div className=" space-y-4">
      <div className=" flex items-center font-semibold text-lg text-neutral-700">
        <User2 className=" h-6 w-6 mr-2" />
        Your boards
      </div>
      <div className=" grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {boards.map((board) => (
          <Link
            key={board.id}
            href={`/board/${board.id}`}
            style={{ backgroundImage: `url(${board.imageThumbUrl})` }}
            className=" group relative aspect-video bg-no-repeat bg-center bg-cover bg-sky-700 rounded-sm h-full w-full p-2 overflow-hidden"
          >
            <div
              aria-hidden
              className=" absolute inset-0 bg-black/30 group-hover:bg-black/40 transition"
            />
            <p className=" relative font-semibold text-white">{board.title}</p>
          </Link>
        ))}
        <div className=" relative aspect-video h-auto md:h-full">
          <FormPopover sideOffset={10} side="right">
            <div
              role="button"
              className={cn(
                " h-full bg-muted rounded-sm flex flex-col gap-y-1 items-center justify-center hover:opacity-75 transition",
                remainingBoards === 0 &&
                  "cursor-not-allowed pointer-events-none select-none"
              )}
            >
              <p className=" text-sm">Create new board</p>
              <span className=" text-xs">{`${remainingBoards} remaining`}</span>
            </div>
          </FormPopover>
          <Hint
            align="start"
            sideOffset={1}
            description={`Free workspace can hove upto 5 open boards. For unlimited boards, please upgrade this workspace.`}
          >
            <HelpCircle className=" absolute bottom-2 right-2 h-[14px] w-[14px]" />
          </Hint>
        </div>
      </div>
    </div>
  );
};

BoardList.Skeleton = function SkeletonBoardList() {
  return (
    <div className=" grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-4 gap-4">
      <Skeleton className=" aspect-video h-full w-full p-2" />
      <Skeleton className=" aspect-video h-full w-full p-2" />
      <Skeleton className=" aspect-video h-full w-full p-2" />
      <Skeleton className=" aspect-video h-full w-full p-2" />
      <Skeleton className=" aspect-video h-full w-full p-2" />
      <Skeleton className=" aspect-video h-full w-full p-2" />
      <Skeleton className=" aspect-video h-full w-full p-2" />
      <Skeleton className=" aspect-video h-full w-full p-2" />
    </div>
  );
};

export default BoardList;
