"use client";

import { authClient } from "@/lib/client-auth";
import { useRouter } from "next/navigation";
import Link from "next/link";

const Navbar = () => {
  const router = useRouter();
  return (
    <header className="border-b border-border bg-background">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link href="/" className="text-xl font-bold text-foreground">
          Task<span className="text-primary">Flow</span>
        </Link>

        <div className="flex items-center gap-6">
          <Link
            href="/dashboard"
            className="text-sm text-muted transition hover:text-foreground"
          >
            Dashboard
          </Link>

          <Link
            href="/projects"
            className="text-sm text-muted transition hover:text-foreground"
          >
            Projects
          </Link>
          <button
            onClick={async () => {
              await authClient.signOut();
              router.push("/login");
              router.refresh();
            }}
            className="text-sm text-muted transition hover:text-foreground"
          >
            Logout
          </button>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
