"use client";
import React from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useCardModal } from "@/hooks/use-card-modal";
import { useQuery } from "@tanstack/react-query";
import Header from "./header";
import { CardWithList } from "@/types";
import { fetcher } from "@/lib/fetcher";
import Description from "./description";
import Actions from "./actions";
import { AuditLog } from "@prisma/client";
import Activity from "./activity";

const CardModal = () => {
  const id = useCardModal((state) => state.id);
  const isOpen = useCardModal((state) => state.isOpen);
  const onClose = useCardModal((state) => state.onClose);

  const { data: cardData } = useQuery<CardWithList>({
    queryKey: ["card", id],
    queryFn: () => fetcher(`/api/cards/${id}`),
  });

  const { data: auditLogsData } = useQuery<AuditLog[]>({
    queryKey: ["card-logs", id],
    queryFn: () => fetcher(`/api/cards/${id}/logs`),
  });

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        {cardData ? <Header data={cardData} /> : <Header.Skeleton />}
        <div className=" grid grid-cols-1 md:grid-cols-4 md:gap-4">
          <div className=" col-span-3">
            <div className=" w-full space-y-6">
              {cardData ? (
                <Description data={cardData} />
              ) : (
                <Description.Skeleton />
              )}
              {auditLogsData ? (
                <Activity data={auditLogsData} />
              ) : (
                <Activity.Skeleton />
              )}
            </div>
          </div>
          {cardData ? <Actions data={cardData} /> : <Actions.Skeleton />}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CardModal;
