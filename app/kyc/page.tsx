import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/options";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { ShieldCheck, UserCheck, ArrowLeft, Fingerprint } from 'lucide-react';
import Link from 'next/link';
import { submitKyc } from "@/app/actions/submitKyc";

export default async function KycPage() {
  const session = await getServerSession(authOptions);
  if (!session || !session.user?.email) redirect('/login');

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    select: { id: true, kycStatus: true, isVerified: true }
  });

  if (!user) redirect('/register');

  // If they are already pending or verified, send them back to the dashboard
  if (user.kycStatus === 'PENDING' || user.isVerified) {
    redirect('/dashboard');
  }

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      <nav className="bg-white border-b border-slate-200 px-6 py-4">
        <div className="max-w-xl mx-auto flex items-center gap-4">
          <Link href="/dashboard" className="p-2 hover:bg-slate-100 rounded-full transition">
            <ArrowLeft className="w-5 h-5 text-slate-600" />
          </Link>
          <div className="font-bold text-lg text-slate-900 flex items-center gap-2">
            Identity Verification
          </div>
        </div>
      </nav>

      <main className="max-w-xl mx-auto px-6 py-12">
        <div className="bg-white rounded-[2.5rem] shadow-sm border border-slate-100 p-8 md:p-12 text-center">
          
          <div className="bg-amber-50 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6">
            <Fingerprint className="w-12 h-12 text-amber-600" />
          </div>
          
          <h1 className="text-3xl font-black text-slate-900 mb-3">Secure Your Account</h1>
          <p className="text-slate-500 font-medium mb-10">
            To comply with Tanzanian financial regulations and unlock withdrawals, please provide your National ID (NIDA) number.
          </p>

          <form action={submitKyc} className="space-y-6 text-left">
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">NIDA Number</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <UserCheck className="w-5 h-5 text-slate-400" />
                </div>
                <input 
                  type="text" 
                  name="nidaNumber"
                  required
                  placeholder="e.g. 19900101-12345-00001-23"
                  className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:bg-white transition uppercase"
                />
              </div>
            </div>

            <button 
              type="submit"
              className="w-full flex items-center justify-center gap-2 bg-slate-900 text-white px-8 py-4 rounded-2xl font-black text-lg shadow-xl shadow-slate-200 hover:bg-black hover:scale-[1.02] transition-all active:scale-95"
            >
              Submit for Review <ShieldCheck className="w-5 h-5" />
            </button>
          </form>

          <p className="text-xs text-slate-400 mt-6 font-medium">
            Your data is encrypted and stored securely. We manually review all submissions within 24 hours.
          </p>
        </div>
      </main>
    </div>
  );
}