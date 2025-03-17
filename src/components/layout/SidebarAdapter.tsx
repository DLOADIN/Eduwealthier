
import React, { useState } from "react";
import { 
  Sidebar as ShadcnSidebar,
  SidebarContent,
  SidebarHeader,
  SidebarFooter,
  SidebarProvider
} from "@/components/ui/sidebar";
import CustomSidebar from "./Sidebar";

export const SidebarAdapter: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <CustomSidebar />
        <main className="flex-1">{children}</main>
      </div>
    </SidebarProvider>
  );
};

export default SidebarAdapter;
