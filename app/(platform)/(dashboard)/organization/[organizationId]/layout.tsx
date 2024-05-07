import React, { PropsWithChildren } from "react";
import OrgControl from "./_components/org-control";
import { startCase } from "lodash";
import { auth } from "@clerk/nextjs/server";

export async function generateMetadata() {
  const { orgSlug } = auth();
  return {
    title: startCase(orgSlug || "Organization"),
  };
}

const organizationIdLayout = ({ children }: PropsWithChildren) => {
  return (
    <>
      <OrgControl />
      {children}
    </>
  );
};

export default organizationIdLayout;
