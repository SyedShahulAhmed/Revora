"use client";

import { ReactNode } from "react";
import { useAuth } from "@/hooks/useAuth";
import { GridBackground } from "@/components/shared/GridBackground";
import DashboardNavbar from "@/components/dashboard/Navbar/DashboardNavbar";
import Loader from "@/components/shared/Loader";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const { loading } = useAuth();

  if (loading) {
    return <Loader />;
  }

  return (
    <GridBackground>
      <div className="min-h-screen">
        <DashboardNavbar />
        <main className="p-10 text-white">{children}</main>
      </div>
    </GridBackground>
  );
}
