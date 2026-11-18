"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { authClient } from "@/lib/client-auth";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleLogin(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setError("");
    setSuccess("");
    setLoading(true);

    try {
      const result = await authClient.signIn.email({
        email,
        password,
      });

      if (!result.error) {
        setEmail("");
        setPassword("");
        setSuccess("");

        router.push("/");
        router.refresh();
      }

      if (result.error) {
        setError(result.error.message || "Login failed");
        return;
      }

      setSuccess("Login successful!");
      
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
          <h1 className="text-3xl font-bold text-[#EEEEEE]">Welcome Back</h1>
          <p className="text-[#B9E4E8] mt-2">
            Login to continue managing your tasks.
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
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
            autoComplete="current-password"
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
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="text-center text-sm text-[#B9E4E8]">
          Dont have an account?{" "}
          <Link href="/signup" className="text-[#EEEEEE] underline">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}
