import { GridBackground } from "@/components/shared/GridBackground";
import { ReactNode } from "react";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <GridBackground>
      <div className="flex flex-1 flex-col">
        <main className="flex-1 p-8">{children}</main>
      </div>
    </GridBackground>
  );
}
