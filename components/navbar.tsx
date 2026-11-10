import Link from "next/link";

const Navbar = () => {
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
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
