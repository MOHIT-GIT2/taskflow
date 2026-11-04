import Navbar from "@/components/navbar";
import prisma from "@/lib/prisma";

export default async function Home() {
  const users = await prisma.user.findMany();

  return (
    <main>
      <Navbar />
      <h1>Welcome to taskflow</h1>
      <h1>Users: {users.length}</h1>
    </main>
  );
}
