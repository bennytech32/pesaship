'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Loader2, UserPlus, User, Mail, Phone, Lock } from 'lucide-react';

export default function RegisterPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ fullName: '', email: '', phone: '', password: '' });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      
      const data = await res.json();

      if (res.ok && data.success) {
        alert("✅ Account created! Redirecting to login...");
        router.push('/login');
      } else {
        alert("❌ Error: " + (data.error || "Registration failed"));
      }
    } catch (error) {
      alert("❌ Network Error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-xl p-8 border border-slate-100">
        <div className="text-center mb-8">
          <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
            <UserPlus className="text-blue-600 w-6 h-6" />
          </div>
          <h1 className="text-2xl font-bold text-slate-800">Create Account</h1>
          <p className="text-slate-500 text-sm">Join PesaShip for secure payments</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input 
            icon={<User />} placeholder="Full Name" 
            onChange={e => setForm({...form, fullName: e.target.value})} 
          />
          <Input 
            icon={<Mail />} type="email" placeholder="Email Address" 
            onChange={e => setForm({...form, email: e.target.value})} 
          />
          <Input 
            icon={<Phone />} type="tel" placeholder="Phone Number" 
            onChange={e => setForm({...form, phone: e.target.value})} 
          />
          <Input 
            icon={<Lock />} type="password" placeholder="Create Password" 
            onChange={e => setForm({...form, password: e.target.value})} 
          />

          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-xl font-bold transition flex justify-center items-center gap-2 mt-2"
          >
            {loading ? <Loader2 className="animate-spin w-5 h-5" /> : "Sign Up"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-slate-500">
          Already have an account? <Link href="/login" className="text-blue-600 font-bold hover:underline">Sign In</Link>
        </p>
      </div>
    </div>
  );
}

// Helper Component for cleaner code
function Input({ icon, ...props }: any) {
  return (
    <div className="relative">
      <div className="absolute left-3 top-3.5 text-slate-400 w-5 h-5">
        {icon}
      </div>
      <input 
        required
        className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition"
        {...props}
      />
    </div>
  );
}