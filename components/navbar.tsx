"use client";

import { authClient } from "@/lib/client-auth";
import { useRouter } from "next/navigation";
import Link from "next/link";

const Navbar = () => {
  const router = useRouter();

  const { data: session, isPending } = authClient.useSession();

  if (isPending) {
    return null;
  }

  return (
    <header className="border-b border-border bg-background">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link
          href="/"
          prefetch={false}
          className="text-xl font-bold text-foreground"
        >
          Task<span className="text-primary">Flow</span>
        </Link>

        <div className="flex items-center gap-6">
          {session ? (
            <>
              <Link href="/dashboard" prefetch={false}>
                Dashboard
              </Link>

              <Link href="/" prefetch={false}>
                Home
              </Link>

              <Link href="/projects" prefetch={false}>
                Projects
              </Link>

              <button
                onClick={async () => {
                  await authClient.signOut();
                  router.push("/login");
                  router.refresh();
                }}
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link href="/login" prefetch={false}>
                Login
              </Link>

              <Link href="/signup" prefetch={false}>
                Signup
              </Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
