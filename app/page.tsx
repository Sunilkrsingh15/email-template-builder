"use client";

import { AppSidebar } from "@/components/app-sidebar";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { EmailBuilder } from "@/components/email-builder/email-builder";

export default function Home() {
  return (
    <SidebarProvider defaultOpen={false}>
      <AppSidebar />
      <SidebarInset>
        <EmailBuilder />
      </SidebarInset>
    </SidebarProvider>
  );
}
