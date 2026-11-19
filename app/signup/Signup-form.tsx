"use client";

import { useState, type FormEvent } from "react";
import { authClient } from "@/lib/client-auth";
import { useRouter } from "next/navigation";

export default function SignupPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSignup(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setError("");
    setSuccess("");
    setLoading(true);

    try {
      const result = await authClient.signUp.email({
        name,
        email,
        password,
      });

      if (result.error) {
        setError(result.error.message || "Signup failed");
        return;
      }

      setSuccess("Account created successfully!");
      if (!result.error) {
        router.push("/");
        router.refresh();
      }
      //console.log(result);
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#071B2B] flex items-center justify-center px-4">
      <div className="w-full max-w-sm space-y-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-[#EEEEEE]">Create Account</h1>
          <p className="text-[#B9E4E8] mt-2">
            Join TaskFlow and manage your tasks.
          </p>
        </div>

        <form onSubmit={handleSignup} className="space-y-4">
          <input
            type="text"
            placeholder="Full name"
            value={name}
            onChange={(event) => setName(event.target.value)}
            autoComplete="name"
            required
            className="w-full rounded-lg bg-[#167D8D]/20 border border-[#167D8D] px-4 py-3 text-[#EEEEEE] outline-none focus:ring-2 focus:ring-[#167D8D]"
          />

          <input
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            autoComplete="email"
            required
            className="w-full rounded-lg bg-[#167D8D]/20 border border-[#167D8D] px-4 py-3 text-[#EEEEEE] outline-none focus:ring-2 focus:ring-[#167D8D]"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            autoComplete="new-password"
            required
            className="w-full rounded-lg bg-[#167D8D]/20 border border-[#167D8D] px-4 py-3 text-[#EEEEEE] outline-none focus:ring-2 focus:ring-[#167D8D]"
          />

          {error && (
            <p role="alert" className="text-sm text-red-400">
              {error}
            </p>
          )}

          {success && (
            <p role="status" className="text-sm text-green-400">
              {success}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-[#167D8D] py-3 font-semibold text-white hover:bg-[#126977] transition disabled:opacity-50"
          >
            {loading ? "Creating account..." : "Sign Up"}
          </button>
        </form>

        <p className="text-center text-sm text-[#B9E4E8]">
          Already have an account?{" "}
          <a href="/login" className="text-[#EEEEEE] underline">
            Login
          </a>
        </p>
      </div>
    </div>
  );
}
