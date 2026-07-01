import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/options"; 
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { 
  ShieldAlert, Activity, Users, Wallet, 
  CheckCircle, XCircle 
} from 'lucide-react';
import Link from 'next/link';

// Import the Admin Actions
import { approveKyc } from "@/app/actions/admin/approveKyc";
import { resolveDispute } from "@/app/actions/admin/resolveDispute";

export default async function AdminDashboard() {
  const session = await getServerSession(authOptions);
  
  if (!session || !session.user?.email) redirect("/login"); 

  // THE SECURITY GATES: Must exactly match your logged-in email!
  const ADMIN_EMAILS = [
    "benjamin@test.com", 
    "admin@pesaship.com",
    "info@b-techgroup.co.tz",
    "support@pesaship.co.tz",
    "info@btechcreations.co.tz",
    "YOUR_EXACT_TEST_EMAIL_HERE@gmail.com" // <-- CHANGE THIS TO YOUR CURRENT LOGIN EMAIL!
  ]; 
  
  const userEmail = session.user.email.toLowerCase();

  if (!ADMIN_EMAILS.includes(userEmail)) {
    console.log(`Security Block: ${userEmail} is not an admin.`);
    redirect("/dashboard"); 
  }

  // --- AUTOMATED METRICS GATHERING ---
  const totalUsers = await prisma.user.count();
  
  const financialStats = await prisma.transaction.aggregate({
    _sum: { amount: true, fee: true },
    where: { status: { in: ['PAID', 'SHIPPED', 'COMPLETED', 'REJECTED', 'REFUNDED'] } }
  });

  const totalVolume = financialStats._sum.amount || 0;
  const platformRevenue = financialStats._sum.fee || 0;

  // --- MANUAL APPROVAL QUEUES ---
  const pendingKYC = await prisma.user.findMany({
    where: { kycStatus: 'PENDING' },
    orderBy: { updatedAt: 'asc' },
    take: 10
  });

  const disputes = await prisma.transaction.findMany({
    where: { status: 'REJECTED' },
    include: {
      buyer: { select: { fullName: true, email: true, phone: true } },
      seller: { select: { fullName: true, email: true, phone: true } }
    },
    orderBy: { updatedAt: 'asc' }
  });

  return (
    <div className="min-h-screen bg-slate-900 text-slate-50 pb-20">
      <nav className="bg-slate-950 border-b border-slate-800 px-6 py-4 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3 font-black text-xl text-white">
            <div className="bg-blue-600 p-2 rounded-xl">
              <Activity className="w-5 h-5 text-white" />
            </div>
            PesaShip <span className="text-blue-500 font-mono text-sm uppercase tracking-widest">Admin</span>
          </div>
          <div className="flex items-center gap-6">
            <Link href="/dashboard" className="text-sm font-bold text-slate-400 hover:text-white transition">
              Exit to App
            </Link>
            <div className="flex items-center gap-2 text-sm font-bold text-slate-400 bg-slate-900 px-4 py-2 rounded-full border border-slate-800">
              System: <span className="text-green-400 flex items-center gap-1"><CheckCircle className="w-4 h-4" /> Autonomous</span>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-6 py-10">
        
        {/* AUTOMATED METRICS ROW */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-slate-800 border border-slate-700 rounded-3xl p-6 shadow-xl relative overflow-hidden">
            <div className="absolute -right-6 -top-6 opacity-10"><Wallet className="w-32 h-32 text-blue-500" /></div>
            <div className="flex items-center gap-3 text-slate-400 mb-4 font-bold uppercase tracking-widest text-xs relative z-10">
              <Wallet className="w-5 h-5 text-blue-500" /> Total Escrow Volume
            </div>
            <div className="text-4xl font-black text-white relative z-10">TZS {totalVolume.toLocaleString()}</div>
          </div>

          <div className="bg-slate-800 border border-slate-700 rounded-3xl p-6 shadow-xl relative overflow-hidden">
            <div className="absolute -right-6 -top-6 opacity-10"><Activity className="w-32 h-32 text-emerald-500" /></div>
            <div className="flex items-center gap-3 text-slate-400 mb-4 font-bold uppercase tracking-widest text-xs relative z-10">
              <Activity className="w-5 h-5 text-emerald-500" /> Platform Revenue (2.5%)
            </div>
            <div className="text-4xl font-black text-emerald-400 relative z-10">TZS {platformRevenue.toLocaleString()}</div>
          </div>

          <div className="bg-slate-800 border border-slate-700 rounded-3xl p-6 shadow-xl relative overflow-hidden">
            <div className="absolute -right-6 -top-6 opacity-10"><Users className="w-32 h-32 text-purple-500" /></div>
            <div className="flex items-center gap-3 text-slate-400 mb-4 font-bold uppercase tracking-widest text-xs relative z-10">
              <Users className="w-5 h-5 text-purple-500" /> Total Registered Users
            </div>
            <div className="text-4xl font-black text-white relative z-10">{totalUsers.toLocaleString()}</div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* QUEUE 1: KYC VERIFICATIONS */}
          <div className="bg-slate-800 border border-slate-700 rounded-[2rem] p-8 shadow-xl">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-black text-white flex items-center gap-2">
                <Users className="w-6 h-6 text-amber-500" /> KYC Approval Queue
              </h2>
            </div>

            <div className="space-y-4">
              {pendingKYC.length === 0 ? (
                <div className="text-center py-12 text-slate-500 font-medium bg-slate-900/50 rounded-2xl border border-slate-700/50">
                  <CheckCircle className="w-10 h-10 text-slate-600 mx-auto mb-3" /> All users verified.
                </div>
              ) : (
                pendingKYC.map((user) => {
                  const handleApprove = async () => {
                    "use server";
                    await approveKyc(user.id);
                  };
                  
                  return (
                    <div key={user.id} className="bg-slate-700/50 border border-slate-600 rounded-2xl p-4 flex justify-between items-center hover:bg-slate-700 transition">
                      <div>
                        <p className="font-bold text-white">{user.fullName || user.email}</p>
                        <p className="text-xs text-slate-400 font-mono mt-1 flex items-center gap-2">
                          NIDA: <span className="text-amber-400">{user.nidaNumber}</span>
                        </p>
                      </div>
                      <form action={handleApprove}>
                        <button type="submit" className="bg-emerald-600 hover:bg-emerald-500 text-white px-5 py-2.5 rounded-xl text-sm font-bold transition shadow-lg shadow-emerald-900/20 active:scale-95">
                          Approve KYC
                        </button>
                      </form>
                    </div>
                  );
                })
              )}
            </div>
          </div>

          {/* QUEUE 2: DISPUTE RESOLUTION */}
          <div className="bg-slate-800 border border-slate-700 rounded-[2rem] p-8 shadow-xl">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-black text-white flex items-center gap-2">
                <ShieldAlert className="w-6 h-6 text-red-500" /> Active Disputes
              </h2>
            </div>

            <div className="space-y-4">
              {disputes.length === 0 ? (
                <div className="text-center py-12 text-slate-500 font-medium bg-slate-900/50 rounded-2xl border border-slate-700/50">
                  <ShieldAlert className="w-10 h-10 text-slate-600 mx-auto mb-3" /> No active disputes.
                </div>
              ) : (
                disputes.map((tx) => {
                  const handleRefund = async () => {
                    "use server";
                    await resolveDispute(tx.id, 'REFUNDED');
                  };
                  const handleRelease = async () => {
                    "use server";
                    await resolveDispute(tx.id, 'COMPLETED');
                  };

                  return (
                    <div key={tx.id} className="bg-red-950/30 border border-red-900/50 rounded-2xl p-5">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <p className="font-bold text-white">{tx.description}</p>
                          <p className="text-xs text-red-400 font-bold uppercase tracking-widest mt-1">
                            TZS {tx.amount.toLocaleString()} Locked
                          </p>
                        </div>
                        <span className="bg-red-600 text-white px-2 py-1 rounded text-[10px] font-black uppercase tracking-wider shadow-sm">
                          Conflict
                        </span>
                      </div>
                      
                      <div className="bg-slate-900/50 rounded-xl p-4 mb-5 border border-slate-800">
                        <p className="text-xs text-slate-400 mb-2 uppercase font-bold tracking-widest flex items-center gap-2">
                          <XCircle className="w-3 h-3 text-red-500" /> Buyer's Complaint:
                        </p>
                        <p className="text-sm text-slate-200 font-medium">"{tx.rejectionReason}"</p>
                        <div className="mt-3 pt-3 border-t border-slate-700/50 flex justify-between text-xs text-slate-400">
                          <span>Buyer: {tx.buyer?.fullName}</span>
                          <span>Seller: {tx.seller?.fullName}</span>
                        </div>
                      </div>

                      <div className="flex gap-3">
                        <form action={handleRefund} className="flex-1">
                          <button type="submit" className="w-full bg-slate-700 hover:bg-slate-600 text-white py-2.5 rounded-xl text-sm font-bold transition active:scale-95">
                            Refund Buyer
                          </button>
                        </form>
                        <form action={handleRelease} className="flex-1">
                          <button type="submit" className="w-full border border-red-500 text-red-400 hover:bg-red-500 hover:text-white py-2.5 rounded-xl text-sm font-bold transition active:scale-95">
                            Release Funds
                          </button>
                        </form>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}