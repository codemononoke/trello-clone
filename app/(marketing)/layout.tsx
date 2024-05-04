import React, { PropsWithChildren } from "react";

const MarketingLayout = ({ children }: PropsWithChildren) => {
  return (
    <div className=" h-full bg-slate-100">
      <main className=" pt-40 pb-20 bg-slate-100">{children}</main>
    </div>
  );
};

export default MarketingLayout;
