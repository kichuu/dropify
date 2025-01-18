import React from "react"
import Link from "next/link"
import { Mail, Lock, ArrowRight, Github, Twitter } from "lucide-react"

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center  p-4">
      <div className="w-full max-w-md">
        {/* Main Card */}
        <div className="bg-zinc-900 rounded-xl p-8 border border-zinc-800 shadow-xl backdrop-blur-sm">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold mb-2">Welcome back</h2>
            <p className="text-zinc-400">
              Sign in to continue to TrafficRelief
            </p>
          </div>

          <form className="space-y-6">
            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-zinc-400 mb-1.5">
                Email address
              </label>
              <div className="relative">
                <input
                  type="email"
                  className="w-full bg-zinc-800/50 border border-zinc-700 rounded-lg px-4 py-3 pl-11 focus:outline-none focus:border-purple-500 transition-colors"
                  placeholder="name@example.com"
                />
                <Mail
                  className="absolute left-4 top-3.5 text-zinc-500"
                  size={18}
                />
              </div>
            </div>
            {/* Password */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-sm font-medium text-zinc-400">
                  Password
                </label>
                <Link
                  href="/auth/reset-password"
                  className="text-sm text-purple-400 hover:text-purple-300"
                >
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <input
                  type="password"
                  className="w-full bg-zinc-800/50 border border-zinc-700 rounded-lg px-4 py-3 pl-11 focus:outline-none focus:border-purple-500 transition-colors"
                  placeholder="••••••••"
                />
                <Lock
                  className="absolute left-4 top-3.5 text-zinc-500"
                  size={18}
                />
              </div>
            </div>
            {/* Sign In Button */}
            <button
              type="submit"
              className="w-full bg-purple-500 text-white rounded-lg px-4 py-3 font-medium hover:bg-purple-600 transition-colors flex items-center justify-center group"
            >
              Sign in
              <ArrowRight
                className="ml-2 group-hover:translate-x-1 transition-transform"
                size={18}
              />
            </button>
          </form>

          {/* Divider */}
          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-zinc-800"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-zinc-900 text-zinc-400">
                Or continue with
              </span>
            </div>
          </div>

          {/* Social Logins */}
          <div className="grid grid-cols-2 gap-4">
            <button className="flex items-center justify-center px-4 py-3 border border-zinc-700 rounded-lg hover:bg-zinc-800/50 transition-colors">
              <Github size={18} className="mr-2" />
              <span>Github</span>
            </button>
            <button className="flex items-center justify-center px-4 py-3 border border-zinc-700 rounded-lg hover:bg-zinc-800/50 transition-colors">
              <Twitter size={18} className="mr-2" />
              <span>Twitter</span>
            </button>
          </div>

          {/* Sign Up Link */}
          <p className="mt-8 text-center text-sm text-zinc-400">
            Don't have an account?{" "}
            <Link
              href="/auth/signup"
              className="text-purple-400 hover:text-purple-300 font-medium"
            >
              Sign up
            </Link>
          </p>
        </div>

        {/* Footer */}
        <p className="mt-8 text-center text-sm text-zinc-400">
          By signing in, you agree to our{" "}
          <Link href="/terms" className="text-purple-400 hover:text-purple-300">
            Terms of Service
          </Link>{" "}
          and{" "}
          <Link
            href="/privacy"
            className="text-purple-400 hover:text-purple-300"
          >
            Privacy Policy
          </Link>
        </p>
      </div>
    </div>
  )
}
