import { Suspense } from "react";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import SignupPage from "./Signup-form";

async function SignupPageSession() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (session) {
    redirect("/");
  }

  return <SignupPage />;
}

export default function SignUpPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#071B2B] flex items-center justify-center text-[#EEEEEE]">
          Loading signup...
        </div>
      }
    >
      <SignupPageSession />
    </Suspense>
  );
}
