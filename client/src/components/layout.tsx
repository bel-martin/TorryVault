import { ReactNode } from "react";

interface SidebarProps {
  children: ReactNode;
}

export function VaultLayout({ children }: SidebarProps) {
  return (
    <div className="flex min-h-screen bg-background text-foreground font-sans">
      {/* Main Content */}
      <main className="flex-1 min-h-screen relative overflow-hidden">
        {children}
      </main>
    </div>
  );
}
