"use client"
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Mail, Lock, ArrowRight, Github, Twitter } from "lucide-react";
import { jwtDecode } from "jwt-decode";
export default function LoginPage() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    role: "user", // Default role
    currentLocation: { lat: 0, lng: 0 }, // Default location
  });

  const [loading, setLoading] = useState(false); // For button loading state
  const router = useRouter();

  // Request user location on component mount
  

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true); // Start loading
    console.log("Form Data Submitted:", formData);
    try {
      const response = await fetch("http://localhost:5050/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
         // Decode the token to get the user ID
         const decodedToken = jwtDecode(data.token);
         const userId = decodedToken.userId; // Extract userId from the token
         console.log("Decoded User ID:", userId);
 
         // Store the token and userId in localStorage
         localStorage.setItem("token", data.token);
         localStorage.setItem("userId", userId);
        console.log(data)
        alert("Login successful!");
        // localStorage.setItem("token", data.token);
        // localStorage.setItem("userId", data.id);
        router.push("/dashboard"); // Redirect to dashboard
      } else {
        const error = await response.json();
        alert(error.message || "Login failed");
      }
    } catch (err) {
      console.error(err);
      alert("An error occurred. Please try again.");
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Main Card */}
        <div className="bg-zinc-900 rounded-xl p-8 border border-zinc-800 shadow-xl backdrop-blur-sm">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold mb-2">Welcome back</h2>
            <p className="text-zinc-400">Sign in to continue to TrafficRelief</p>
          </div>

          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-zinc-400 mb-1.5">
                Email address
              </label>
              <div className="relative">
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full bg-zinc-800/50 border border-zinc-700 rounded-lg px-4 py-3 pl-11 focus:outline-none focus:border-purple-500 transition-colors"
                  placeholder="name@example.com"
                  required
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
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full bg-zinc-800/50 border border-zinc-700 rounded-lg px-4 py-3 pl-11 focus:outline-none focus:border-purple-500 transition-colors"
                  placeholder="••••••••"
                  required
                />
                <Lock
                  className="absolute left-4 top-3.5 text-zinc-500"
                  size={18}
                />
              </div>
            </div>
            {/* Role Selection */}
            <div>
              <label className="block text-sm font-medium text-zinc-400 mb-1.5">
                Select Role
              </label>
              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="w-full bg-zinc-800/50 border border-zinc-700 rounded-lg px-4 py-3 focus:outline-none focus:border-purple-500 transition-colors"
                required
              >
                <option value="user">User</option>
                <option value="delivery">Delivery</option>
              </select>
            </div>
            {/* Sign In Button */}
            <button
              type="submit"
              className="w-full bg-purple-500 text-white rounded-lg px-4 py-3 font-medium hover:bg-purple-600 transition-colors flex items-center justify-center group"
              disabled={loading} // Disable button while loading
            >
              {loading ? "Signing in..." : "Sign in"}
              {!loading && (
                <ArrowRight
                  className="ml-2 group-hover:translate-x-1 transition-transform"
                  size={18}
                />
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
