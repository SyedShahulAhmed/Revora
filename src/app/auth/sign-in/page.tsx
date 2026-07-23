"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Eye, EyeOff, Mail, Lock } from "lucide-react";

import { toast } from "sonner";

import { signIn } from "@/services/auth.service";
import { useAuth } from "@/hooks/useAuth";
import { GridBackground } from "@/components/shared/GridBackground";

const INPUT_CLASS =
  "h-14 w-full rounded-xl border border-white/10 bg-white/5 pl-12 pr-12 text-white placeholder:text-neutral-500 outline-none transition-all duration-300 focus:border-cyan-400 focus:bg-white/[0.06] focus:ring-4 focus:ring-cyan-400/10";

export default function SignInPage() {
  const router = useRouter();

  const { refreshUser } = useAuth();

  const [showPassword, setShowPassword] = useState(false);

  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    try {
      setLoading(true);

      const data = await signIn(form);

      await refreshUser();

      toast.success(data.message);

      router.push("/dashboard");
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <GridBackground>
      <div className="flex min-h-screen items-center justify-center px-6">
        <div className="w-full max-w-lg">
          {/* Header */}

          <motion.div
            initial={{
              opacity: 0,
              y: -25,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.45,
            }}
            className="mb-10 text-center"
          >
            <p className="text-4xl font-medium text-cyan-400">Welcome back!</p>

            <h1 className="mt-2 text-6xl font-semibold leading-none tracking-tight text-white">
              Login to your account.
            </h1>
          </motion.div>

          {/* Card */}

          <motion.div
            initial={{
              opacity: 0,
              y: 30,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              delay: 0.15,
              duration: 0.45,
            }}
            className="rounded-3xl border border-white/10 bg-black/25 p-8 backdrop-blur-xl"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Email */}

              <div>
                <label className="mb-2 block text-sm font-medium text-white">
                  Email
                </label>

                <div className="relative">
                  <Mail
                    size={20}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400"
                  />

                  <input
                    type="email"
                    placeholder="name@example.com"
                    className={INPUT_CLASS}
                    value={form.email}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        email: e.target.value,
                      })
                    }
                  />
                </div>
              </div>

              {/* Password */}

              <div>
                <label className="mb-2 block text-sm font-medium text-white">
                  Password
                </label>

                <div className="relative">
                  <Lock
                    size={20}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400"
                  />

                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    className={INPUT_CLASS}
                    value={form.password}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        password: e.target.value,
                      })
                    }
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-400 transition hover:text-cyan-400"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>

              {/* Button */}

              <motion.button
                whileHover={{
                  scale: 1.02,
                }}
                whileTap={{
                  scale: 0.98,
                }}
                disabled={loading}
                type="submit"
                className="h-14 w-full rounded-xl bg-cyan-400 font-semibold text-black transition hover:bg-cyan-300 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? "Signing In..." : "Sign In"}
              </motion.button>

              {/* Footer */}

              <p className="text-center text-sm text-neutral-400">
                Don&apos;t have an account?{" "}
                <Link
                  href="/auth/sign-up"
                  className="font-semibold text-cyan-400 transition hover:text-cyan-300"
                >
                  Sign Up
                </Link>
              </p>
            </form>
          </motion.div>
        </div>
      </div>
    </GridBackground>
  );
}
