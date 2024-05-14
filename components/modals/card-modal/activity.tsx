"use client";
import React from "react";
import { AuditLog } from "@prisma/client";
import { Skeleton } from "@/components/ui/skeleton";

type ActivityProps = {
  data: AuditLog[];
};

const Activity = ({ data }: ActivityProps) => {
  return <div>Activity</div>;
};

Activity.Skeleton = function ActivitySkeleton() {
  return (
    <div className=" flex items-center gap-x-3 w-full">
      <Skeleton className=" h-6 w-6 bg-neutral-200" />
      <div className=" w-full">
        <Skeleton className=" h-6 w-24 mb-2 bg-neutral-200" />
        <Skeleton className=" h-10 w-full bg-neutral-200" />
      </div>
    </div>
  );
};

export default Activity;
