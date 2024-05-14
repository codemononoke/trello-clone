import React from "react";
import { format } from "date-fns";
import { AuditLog } from "@prisma/client";
import { generateLogMessages } from "@/lib/generate-log-messages";
import { Avatar, AvatarImage } from "./ui/avatar";

type ActivityItemProps = {
  data: AuditLog;
};

const ActivityItem = ({ data }: ActivityItemProps) => {
  return (
    <li className=" flex items-center gap-x-2">
      <Avatar className=" h-8 w-8">
        <AvatarImage src={data.userImage} />
      </Avatar>
      <div className=" flex flex-col space-y-0.5">
        <p className=" text-sm text-muted-foreground">
          <span className=" font-semibold lowercase text-neutral-700">
            {data.userName}
          </span>{" "}
          {generateLogMessages(data)}
        </p>
        <p className=" text-xs text-muted-foreground">
          {format(new Date(data.createdAt), "MMM d, yyyy 'at' h:mm a")}
        </p>
      </div>
    </li>
  );
};

export default ActivityItem;
