import Navbar from "@/components/navbar";
import prisma from "@/lib/prisma";
import Link from "next/link";

export default async function Home() {
  const users = await prisma.user.findMany();

  return (
    <>
      <Navbar />

      <main className="mx-auto w-full max-w-7xl px-6 py-12">
        <section className="mb-10">
          <p className="mb-3 text-sm font-medium text-primary">
            YOUR WORKSPACE
          </p>

          <h1 className="text-4xl font-bold tracking-tight text-foreground">
            Welcome to TaskFlow
          </h1>

          <p className="mt-3 text-muted">
            Organize your work, manage your tasks, and stay productive.
          </p>
        </section>

        <section className="grid gap-6 sm:grid-cols-2">
          <div className="rounded-xl border border-border/50 bg-card p-6">
            <p className="text-sm text-muted">Registered users</p>
            <p className="mt-3 text-4xl font-bold text-foreground">
              {users.length}
            </p>
          </div>

          <div className="rounded-xl border border-border/50 bg-card p-6">
            <p className="text-sm text-muted">Your tasks</p>
            <Link
              href="/tasks"
              className="mt-4 inline-flex rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-white transition hover:opacity-90"
            >
              View tasks →
            </Link>
          </div>
        </section>
      </main>
    </>
  );
}
