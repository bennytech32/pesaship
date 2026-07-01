import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { 
  LayoutDashboard, 
  PlusCircle, 
  ShieldCheck, 
  ShoppingBag, 
  Settings, 
  LogOut 
} from "lucide-react";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // 1. Hakikisha mtumiaji amesha-login
  const session = await auth();
  if (!session || !session.user?.email) {
    redirect("/login");
  }

  // 2. Vuta taarifa za mtumiaji kujua jina lake na hali ya KYC
  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
  });

  if (!user) {
    redirect("/login");
  }

  return (
    <div className="flex h-screen bg-slate-50 font-sans overflow-hidden">
      
      {/* ==========================================
          SIDEBAR KUU YA DASHBOARD
          ========================================== */}
      <aside className="w-64 bg-[#0f172a] text-slate-300 flex flex-col justify-between hidden md:flex border-r border-slate-800 shrink-0">
        <div>
          {/* Logo Section */}
          <div className="h-20 flex items-center px-6 border-b border-slate-800/60 mb-6">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="bg-indigo-600 p-1.5 rounded-lg group-hover:scale-105 transition-transform">
                <ShieldCheck className="w-6 h-6 text-white" />
              </div>
              <div className="text-xl font-extrabold tracking-tight text-white">
                Pesa<span className="text-indigo-500">Ship</span>
              </div>
            </Link>
          </div>

          {/* Navigation Links */}
          <nav className="px-4 space-y-1.5">
            {/* 1. Dashboard Overview */}
            <Link 
              href="/dashboard" 
              className="flex items-center gap-3 px-4 py-3 bg-indigo-600/10 text-indigo-400 rounded-xl font-bold transition-colors"
            >
              <LayoutDashboard className="w-5 h-5" /> Overview
            </Link>
            
            {/* 2. New Transaction */}
            <Link 
              href="/create" 
              className="flex items-center gap-3 px-4 py-3 hover:bg-slate-800 hover:text-white rounded-xl font-medium transition-colors"
            >
              <PlusCircle className="w-5 h-5 text-slate-400" /> New Transaction
            </Link>

            <div className="my-4 border-t border-slate-800/60 mx-4"></div>

            {/* 3. KYC & Verification */}
            <Link 
              href="/dashboard/kyc" 
              className="flex items-center gap-3 px-4 py-3 hover:bg-slate-800 hover:text-white rounded-xl font-medium transition-colors"
            >
              <ShieldCheck className="w-5 h-5 text-slate-400" /> KYC & Verification
              
              {/* Smart Badge for KYC Status */}
              {user.kycStatus === "VERIFIED" ? (
                <span className="ml-auto bg-green-500/20 text-green-400 text-[10px] px-2 py-0.5 rounded-full font-bold border border-green-500/20">
                  VERIFIED
                </span>
              ) : (
                <span className="ml-auto bg-yellow-500/20 text-yellow-400 text-[10px] px-2 py-0.5 rounded-full font-bold border border-yellow-500/20">
                  PENDING
                </span>
              )}
            </Link>
            
            {/* 4. My Transactions */}
            <Link 
              href="/dashboard/transactions" 
              className="flex items-center gap-3 px-4 py-3 hover:bg-slate-800 hover:text-white rounded-xl font-medium transition-colors"
            >
              <ShoppingBag className="w-5 h-5 text-slate-400" /> My Transactions
            </Link>

            {/* 5. Account Settings */}
            <Link 
              href="/dashboard/settings" 
              className="flex items-center gap-3 px-4 py-3 hover:bg-slate-800 hover:text-white rounded-xl font-medium transition-colors"
            >
              <Settings className="w-5 h-5 text-slate-400" /> Account Settings
            </Link>
          </nav>
        </div>

        {/* Bottom User Area & LOGOUT */}
        <div className="p-4 border-t border-slate-800/60 bg-slate-900/50">
          
          {/* User Profile Mini-Card */}
          <div className="flex items-center gap-3 px-3 py-3 bg-[#1e293b] rounded-xl mb-3 border border-slate-700/50">
             <div className="w-9 h-9 bg-indigo-500 rounded-lg flex items-center justify-center text-white font-bold text-sm shadow-sm shrink-0">
                {user.fullName?.charAt(0).toUpperCase() || user.email.charAt(0).toUpperCase()}
             </div>
             <div className="overflow-hidden">
               <p className="text-sm font-bold text-white truncate">{user.fullName || "User Account"}</p>
               <p className="text-xs text-slate-400 truncate">{user.email}</p>
             </div>
          </div>
          
          {/* LOGOUT BUTTON */}
          <a 
            href="/api/auth/signout?callbackUrl=/" 
            className="flex items-center gap-3 px-4 py-2.5 text-red-400 hover:bg-red-500/10 hover:text-red-300 rounded-xl font-bold transition-colors w-full"
          >
            <LogOut className="w-5 h-5" /> Sign Out
          </a>
        </div>
      </aside>

      {/* ==========================================
          MAIN CONTENT AREA (Kurasa za ndani zinaingia hapa)
          ========================================== */}
      <div className="flex-1 flex flex-col overflow-y-auto w-full relative">
        {children}
      </div>

    </div>
  );
}