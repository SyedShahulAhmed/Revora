"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Eye, EyeOff, Mail, Lock, User, AtSign } from "lucide-react";

import { toast } from "sonner";

import { signUp } from "@/services/auth.service";
import { GridBackground } from "@/components/shared/GridBackground";

const INPUT_CLASS =
  "h-14 w-full rounded-xl border border-white/10 bg-white/5 pl-12 pr-12 text-white placeholder:text-neutral-500 outline-none transition-all duration-300 focus:border-cyan-400 focus:bg-white/[0.06] focus:ring-4 focus:ring-cyan-400/10";

export default function SignUpPage() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const [showPassword, setShowPassword] = useState(false);

  const [form, setForm] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState<{
    name?: string[];
    username?: string[];
    email?: string[];
    password?: string[];
  }>({});
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setErrors({});

    try {
      setLoading(true);

      const data = await signUp(form);

      toast.success(data.message);

      router.push("/auth/sign-in");
    } catch (error) {
      if (error instanceof Error) {
        const validationError = error as Error & {
          errors?: {
            fieldErrors?: {
              name?: string[];
              username?: string[];
              email?: string[];
              password?: string[];
            };
          };
        };

        if (validationError.errors?.fieldErrors) {
          setErrors(validationError.errors.fieldErrors);
        }

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
            initial={{ opacity: 0, y: -25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
            className="mb-4 text-center"
          >
            <p className="text-3xl mt-5 font-medium text-cyan-400">
              Ready to Start?
            </p>

            <h1 className="mt-2 text-5xl font-semibold leading-none tracking-tight text-white">
              Create your account now.
            </h1>
          </motion.div>

          {/* Card */}

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="rounded-3xl border border-white/10 bg-black/25 p-8 backdrop-blur-xl"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name */}

              <div>
                <label className="mb-2 block text-sm font-medium text-white">
                  Full Name
                </label>

                <div className="relative">
                  <User
                    size={20}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400"
                  />

                  <input
                    type="text"
                    placeholder="John Doe"
                    className={INPUT_CLASS}
                    value={form.name}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        name: e.target.value,
                      })
                    }
                  />
                </div>
              </div>
              {errors.name && (
                <p className="mt-2 text-sm text-red-400">{errors.name[0]}</p>
              )}

              {/* Username */}

              <div>
                <label className="mb-2 block text-sm font-medium text-white">
                  Username
                </label>

                <div className="relative">
                  <AtSign
                    size={20}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400"
                  />

                  <input
                    type="text"
                    placeholder="johndoe"
                    className={INPUT_CLASS}
                    value={form.username}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        username: e.target.value,
                      })
                    }
                  />
                </div>
              </div>
              {errors.username && (
                <p className="mt-2 text-sm text-red-400">
                  {errors.username[0]}
                </p>
              )}

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
                    placeholder="johndoe@example.com"
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
              {errors.email && (
                <p className="mt-2 text-sm text-red-400">{errors.email[0]}</p>
              )}

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
              {errors.password && (
                <p className="mt-2 text-sm text-red-400">
                  {errors.password[0]}
                </p>
              )}

              {/* Button */}

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                disabled={loading}
                type="submit"
                className="h-14 w-full rounded-xl bg-cyan-400 font-semibold text-black transition hover:bg-cyan-300 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? "Creating Account..." : "Create Account"}
              </motion.button>

              {/* Footer */}

              <p className="text-center text-sm text-neutral-400">
                Already have an account?{" "}
                <Link
                  href="/auth/sign-in"
                  className="font-semibold text-cyan-400 transition hover:text-cyan-300"
                >
                  Sign In
                </Link>
              </p>
            </form>
          </motion.div>
        </div>
      </div>
    </GridBackground>
  );
}
