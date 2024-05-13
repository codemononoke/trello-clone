import React, { type PropsWithChildren } from "react";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "sonner";
import ModalProvider from "@/components/providers/modal-provider";

const PlatformLayout = ({ children }: PropsWithChildren) => {
  return (
    <ClerkProvider
      appearance={{
        layout: {
          logoImageUrl: "/logo.svg",
        },
        variables: {
          colorPrimary: "#171717",
        },
      }}
    >
      <Toaster />
      <ModalProvider />
      {children}
    </ClerkProvider>
  );
};

export default PlatformLayout;
