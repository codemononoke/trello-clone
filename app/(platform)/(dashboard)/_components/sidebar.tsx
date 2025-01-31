"use client";
import React from "react";
import Link from "next/link";
import { Plus } from "lucide-react";
import { useLocalStorage } from "usehooks-ts";
import {
  useOrganization,
  useOrganizationList,
  ClerkLoaded,
  ClerkLoading,
} from "@clerk/nextjs";
import { buttonVariants } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { Accordion } from "@/components/ui/accordion";
import NavItem, { Organization } from "./nav-item";
import { cn } from "@/lib/utils";

type SidebarProps = {
  storageKey?: string;
};

const Sidebar = ({ storageKey = "t-sidebar-state" }: SidebarProps) => {
  const [expanded, setExpanded] = useLocalStorage<Record<string, any>>(
    storageKey,
    {}
  );

  const { organization: activeOrganization, isLoaded: isLoadedOrg } =
    useOrganization();
  const { userMemberships, isLoaded: isLoadedOrgList } = useOrganizationList({
    userMemberships: {
      infinite: true,
    },
  });

  const defaultAccordionValue: string[] = Object.keys(expanded).reduce(
    (acc: string[], key: string) => {
      if (expanded[key]) {
        acc.push(key);
      }
      return acc;
    },
    []
  );

  const onExpand = (id: string) => {
    setExpanded((curr) => ({
      ...curr,
      [id]: !expanded[id],
    }));
  };

  if (!isLoadedOrg || !isLoadedOrgList || userMemberships.isLoading) {
    return (
      <ClerkLoading>
        <div className=" flex items-center justify-between mb-2">
          <Skeleton className=" h-10 w-[50%]" />
          <Skeleton className=" h-10 w-10" />
        </div>
        <div className=" space-y-2">
          <NavItem.Skeleton />
          <NavItem.Skeleton />
          <NavItem.Skeleton />
        </div>
      </ClerkLoading>
    );
  }
  return (
    <>
      <div className=" font-medium text-xs flex items-center mb-1">
        <span className=" pl-4">Workspaces</span>
        <Link
          href="/select-org"
          className={cn(
            buttonVariants({
              size: "icon",
              variant: "ghost",
            }),
            "ml-auto"
          )}
        >
          <Plus className=" h-4 w-4" />
        </Link>
      </div>
      <Accordion
        type="multiple"
        defaultValue={defaultAccordionValue}
        className=" space-y-2"
      >
        <ClerkLoaded>
          {userMemberships.data.map(({ organization }) => (
            <NavItem
              key={organization.id}
              isActive={activeOrganization?.id === organization.id}
              isExpanded={expanded[organization.id]}
              organization={organization as Organization}
              onExpand={onExpand}
            />
          ))}
        </ClerkLoaded>
      </Accordion>
    </>
  );
};

export default Sidebar;
