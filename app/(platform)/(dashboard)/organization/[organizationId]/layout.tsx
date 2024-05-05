import React, { PropsWithChildren } from "react";
import OrgControl from "./_components/org-control";

const organizationIdLayout = ({ children }: PropsWithChildren) => {
  return (
    <>
      <OrgControl />
      {children}
    </>
  );
};

export default organizationIdLayout;
