"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { getStoredTheme, toggleTheme } from "@/lib/theme";

const navItems = [
  { name: "Dashboard", path: "/dashboard" },
  { name: "Cases", path: "/cases" },
  { name: "Hearings", path: "/hearings" },
  { name: "Profile", path: "/profile" },
];

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();

  // ✅ hooks always before return
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    setTheme(getStoredTheme());
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    router.push("/login");
  };

  const handleToggleTheme = () => {
    const next = toggleTheme();
    setTheme(next);
  };

  return (
    <aside className="w-64 min-h-screen border-r border-border bg-background p-4 flex flex-col">
      <h2 className="text-xl font-bold mb-6">LegalTech</h2>

      <nav className="space-y-2 flex-1">
        {navItems.map((item) => (
          <Link
            key={item.path}
            href={item.path}
            className={cn(
              "block rounded-md px-3 py-2 text-sm font-medium hover:bg-muted",
              pathname === item.path && "bg-muted"
            )}
          >
            {item.name}
          </Link>
        ))}
      </nav>

      <Button variant="outline" onClick={handleToggleTheme} className="mb-2">
        {theme === "dark" ? "Light Mode" : "Dark Mode"}
      </Button>

      <Button variant="destructive" onClick={handleLogout}>
        Logout
      </Button>
    </aside>
  );
}
