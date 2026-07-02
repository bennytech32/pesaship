'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Lock, Mail, Loader2, ShieldCheck, ArrowLeft, AlertCircle } from 'lucide-react';
import Link from 'next/link';

export default function LoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Use NextAuth to sign in
      const res = await signIn('credentials', {
        redirect: false,
        email: form.email,
        password: form.password,
      });

      if (res?.error) {
        setError('Invalid email or password. Please try again.');
      } else {
        router.push('/dashboard'); // Success! Go to dashboard
        router.refresh();
      }
    } catch (err) {
      setError('Something went wrong. Please check your connection.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4 sm:p-6 font-sans selection:bg-blue-100 antialiased">
      
      <div className="w-full max-w-md">
        {/* Kitufe cha Kurudi Nyuma (Back to Home) */}
        <Link 
          href="/" 
          className="inline-flex items-center text-sm font-medium text-slate-500 hover:text-slate-900 mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-2" /> Back to Home
        </Link>

        {/* Kadi ya Login (Login Card) */}
        <div className="bg-white w-full rounded-2xl sm:rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden">
          <div className="p-6 sm:p-8 md:p-10">
            
            {/* Nembo na Kichwa (Logo & Header) */}
            <div className="flex flex-col items-center text-center mb-8">
              <div className="bg-blue-600 p-3 rounded-2xl shadow-lg shadow-blue-200 mb-5">
                <ShieldCheck className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mb-2">
                Welcome Back
              </h1>
              <p className="text-sm sm:text-base text-slate-500">
                Sign in to your secure escrow dashboard
              </p>
            </div>

            {/* Ujumbe wa Kosa (Error Message) */}
            {error && (
              <div className="flex items-center gap-2 bg-red-50 border border-red-100 text-red-600 p-3.5 rounded-xl text-sm mb-6 animate-in fade-in slide-in-from-top-2">
                <AlertCircle className="w-5 h-5 flex-shrink-0" />
                <span>{error}</span>
              </div>
            )}

            {/* Fomu ya Kuingia (Form) */}
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1.5">Email Address</label>
                <div className="relative group">
                  <Mail className="absolute left-3.5 top-3.5 w-5 h-5 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
                  <input 
                    type="email" 
                    required
                    className="w-full pl-11 pr-4 py-3.5 bg-slate-50/50 border border-slate-200 rounded-xl outline-none focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all text-slate-900"
                    placeholder="name@example.com"
                    onChange={(e) => setForm({...form, email: e.target.value})}
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-1.5">
                  <label className="block text-sm font-bold text-slate-700">Password</label>
                  <Link href="/forgot-password" className="text-xs font-semibold text-blue-600 hover:text-blue-700 hover:underline transition">
                    Forgot?
                  </Link>
                </div>
                <div className="relative group">
                  <Lock className="absolute left-3.5 top-3.5 w-5 h-5 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
                  <input 
                    type="password" 
                    required
                    className="w-full pl-11 pr-4 py-3.5 bg-slate-50/50 border border-slate-200 rounded-xl outline-none focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all text-slate-900"
                    placeholder="••••••••"
                    onChange={(e) => setForm({...form, password: e.target.value})}
                  />
                </div>
              </div>

              <button 
                type="submit" 
                disabled={loading}
                className="w-full mt-2 bg-blue-600 text-white py-3.5 rounded-xl font-bold text-base hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-200 transition-all active:scale-[0.98] flex justify-center items-center disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    <Loader2 className="animate-spin w-5 h-5 mr-2" />
                    Authenticating...
                  </>
                ) : (
                  "Sign In Securely"
                )}
              </button>
            </form>

          </div>
          
          {/* Sehemu ya Chini (Footer Section) */}
          <div className="bg-slate-50 border-t border-slate-100 p-6 text-center">
            <p className="text-sm text-slate-500">
              Don't have an account?{' '}
              <Link href="/role" className="text-blue-600 font-bold hover:text-blue-700 hover:underline transition">
                Create one
              </Link>
            </p>
          </div>
        </div>
        
        {/* Usalama Nakala (Security Footer) */}
        <div className="mt-6 text-center flex items-center justify-center gap-1.5 text-slate-400 text-xs font-medium">
          <Lock className="w-3.5 h-3.5" />
          Secured by PesaShip Escrow Protocol
        </div>

      </div>
    </div>
  );
}