import Link from "next/link";

const Navbar = () => {
  return (
    <nav>
      <h1>Navbar</h1>
      <Link href="/dashboard">Dashboard</Link>
      <Link href="/projects">Projects</Link>
    </nav>
  );
};
export default Navbar;
