import React from 'react';
import Link from 'next/link';
import { Mail, Lock, User, ArrowRight, Github, Twitter } from 'lucide-react';

export default function SignupPage() {
  return (
    <>
    <div className="min-h-screen flex items-center justify-center  p-4 overflow-hidden">
      <div className="w-full max-w-lg sm:max-w-md flex flex-col"> {/* Adjusted for responsive layout */}
        {/* Main Card */}
        <div className="bg-zinc-900 rounded-xl p-6 border border-zinc-800 shadow-xl backdrop-blur-sm flex-grow">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold mb-2">Create your account</h2>
            <p className="text-zinc-400">Start your journey with TrafficRelief</p>
          </div>

          <form className="space-y-6">
            {/* Name */}
            <div>
              <label className="block text-sm font-medium text-zinc-400 mb-1.5">
                Full name
              </label>
              <div className="relative">
                <input
                  type="text"
                  className="w-full bg-zinc-800/50 border border-zinc-700 rounded-lg px-4 py-3 pl-11 focus:outline-none focus:border-purple-500 transition-colors"
                  placeholder="John Doe"
                />
                <User className="absolute left-4 top-3.5 text-zinc-500" size={18} />
              </div>
            </div>

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
                <Mail className="absolute left-4 top-3.5 text-zinc-500" size={18} />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-zinc-400 mb-1.5">
                Password
              </label>
              <div className="relative">
                <input
                  type="password"
                  className="w-full bg-zinc-800/50 border border-zinc-700 rounded-lg px-4 py-3 pl-11 focus:outline-none focus:border-purple-500 transition-colors"
                  placeholder="••••••••"
                />
                <Lock className="absolute left-4 top-3.5 text-zinc-500" size={18} />
              </div>
            </div>

            {/* Terms */}
            <div className="flex items-start">
              <input
                type="checkbox"
                id="terms"
                className="mt-1 w-4 h-4 rounded border-zinc-600 text-purple-500 focus:ring-purple-500 focus:ring-offset-zinc-900"
              />
              <label htmlFor="terms" className="ml-2 text-sm text-zinc-400">
                I agree to the{' '}
                <Link href="/terms" className="text-purple-400 hover:text-purple-300">
                  Terms of Service
                </Link>{' '}
                and{' '}
                <Link href="/privacy" className="text-purple-400 hover:text-purple-300">
                  Privacy Policy
                </Link>
              </label>
            </div>

            {/* Sign Up Button */}
            <button
              type="submit"
              className="w-full bg-purple-500 text-white rounded-lg px-4 py-3 font-medium hover:bg-purple-600 transition-colors flex items-center justify-center group"
            >
              Create account
              <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={18} />
            </button>
          </form>

          {/* Divider */}
          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-zinc-800"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-zinc-900 text-zinc-400">Or continue with</span>
            </div>
          </div>

          {/* Social Signups */}
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

          {/* Sign In Link */}
          <p className="mt-8 text-center text-sm text-zinc-400">
            Already have an account?{' '}
            <Link href="/auth/login" className="text-purple-400 hover:text-purple-300 font-medium">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
    </>
  );
}
