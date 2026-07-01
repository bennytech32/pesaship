"use client";

import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { ShieldCheck, User, ShoppingBag, Loader2, ArrowRight } from "lucide-react";

function RegisterForm() {
  const searchParams = useSearchParams();
  const router = useRouter();
  
  const roleFromUrl = searchParams.get("role")?.toUpperCase() || "BUYER";
  
  // State mpya imeongezwa kwa ajili ya Jina/Duka
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // Tunatuma fullName pamoja na taarifa nyingine
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          fullName, // Imeongezwa hapa
          email, 
          phone,
          password, 
          role: roleFromUrl 
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Registration failed. Please try again.");
        setLoading(false);
        return;
      }

      router.push("/login?registered=true");

    } catch (err) {
      console.error("Fetch error:", err);
      setError("Network error. Please check your connection.");
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-8 md:p-10 rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 w-full max-w-md">
      
      <div className="flex justify-center mb-6">
        <div className={`flex items-center gap-2 px-4 py-2 rounded-full border text-sm font-bold tracking-wide ${
          roleFromUrl === "SELLER" 
            ? "bg-indigo-50 text-indigo-700 border-indigo-200" 
            : "bg-blue-50 text-blue-700 border-blue-200"
        }`}>
          {roleFromUrl === "SELLER" ? <ShoppingBag className="w-4 h-4" /> : <User className="w-4 h-4" />}
          REGISTERING AS A {roleFromUrl}
        </div>
      </div>

      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-slate-900 mb-2">Create an Account</h2>
        <p className="text-slate-500 text-sm">Enter your details to get started with PesaShip</p>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-600 text-sm rounded-xl font-medium text-center">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        
        {/* Sehemu mpya ya Jina au Duka */}
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-1">
            {roleFromUrl === "SELLER" ? "Full Name / Shop Name" : "Full Name"}
          </label>
          <input 
            type="text" 
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required 
            placeholder={roleFromUrl === "SELLER" ? "e.g., Juma Electronics" : "e.g., Juma Makongoro"}
            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-slate-900"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-1">Email Address</label>
          <input 
            type="email" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required 
            placeholder="e.g., yourname@email.com"
            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-slate-900"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-1">Phone Number</label>
          <input 
            type="tel" 
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required 
            placeholder="e.g., 0712345678"
            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-slate-900"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-1">Password</label>
          <input 
            type="password" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required 
            placeholder="••••••••"
            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-slate-900"
          />
        </div>

        <button 
          type="submit" 
          disabled={loading}
          className="w-full py-3.5 px-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-lg shadow-blue-200 transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed mt-4"
        >
          {loading ? (
            <> <Loader2 className="w-5 h-5 animate-spin" /> Creating Account... </>
          ) : (
            <> Sign Up Now <ArrowRight className="w-5 h-5" /> </>
          )}
        </button>
      </form>

      <p className="text-center mt-6 text-sm text-slate-500 font-medium">
        Already have an account?{" "}
        <Link href="/login" className="text-blue-600 hover:text-blue-700 hover:underline">
          Log In
        </Link>
      </p>
    </div>
  );
}

export default function RegisterPage() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6 font-sans">
      <Link href="/" className="flex items-center gap-2 mb-8 group">
        <div className="bg-blue-600 p-1.5 rounded-lg group-hover:scale-105 transition-transform">
          <ShieldCheck className="w-6 h-6 text-white" />
        </div>
        <div className="text-2xl font-extrabold tracking-tight text-slate-900">
          Pesa<span className="text-blue-600">Ship</span>
        </div>
      </Link>

      <Suspense fallback={<div className="flex items-center gap-2 text-slate-500"><Loader2 className="w-6 h-6 animate-spin" /> Loading form...</div>}>
        <RegisterForm />
      </Suspense>
    </div>
  );
}