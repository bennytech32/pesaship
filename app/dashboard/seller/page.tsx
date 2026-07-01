import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { 
  Wallet, 
  ArrowUpRight, 
  Clock, 
  AlertCircle, 
  CheckCircle2, 
  Link as LinkIcon,
  Download,
  ShoppingBag,
  Menu
} from "lucide-react";

interface PageProps {
  searchParams: Promise<{ success?: string; error?: string }>;
}

export default async function SellerDashboard({ searchParams }: PageProps) {
  const session = await auth();
  if (!session || !session.user?.email) redirect("/login");

  const seller = await prisma.user.findUnique({
    where: { email: session.user.email },
    include: {
      sellingTransactions: {
        orderBy: { createdAt: 'desc' }
      }
    }
  });

  if (!seller || seller.role !== "SELLER") redirect("/dashboard");

  const transactions = seller.sellingTransactions;
  const params = await searchParams;

  // PRO METRICS CALCULATIONS
  const lockedBalance = transactions
    .filter(t => t.status === "PAID" || t.status === "SHIPPED")
    .reduce((sum, t) => sum + t.amount, 0);

  const availableBalance = transactions
    .filter(t => t.status === "COMPLETED")
    .reduce((sum, t) => sum + t.amount, 0);

  const activeDisputes = transactions.filter(t => t.status === "DISPUTED").length;

  // SERVER ACTION: Kutoa Pesa (Withdraw)
  const handleWithdraw = async () => {
    "use server";
    
    if (availableBalance <= 0) {
      redirect("/dashboard/seller?error=insufficient");
    }

    // Logic ya kutuma pesa inaenda hapa baadaye
    redirect("/dashboard/seller?success=true");
  };

  return (
    <div className="flex-1 flex flex-col w-full bg-slate-50 font-sans text-slate-900 min-h-screen">
        
      {/* Top Header */}
      <header className="bg-white border-b border-slate-200 px-6 py-4 sticky top-0 z-10 flex justify-between items-center">
        <div className="flex items-center gap-3 md:hidden">
          <Menu className="w-6 h-6 text-slate-700" />
          <span className="font-bold text-slate-900">Seller Portal</span>
        </div>
        <div className="hidden md:block">
          <h1 className="font-bold text-slate-900 text-lg">Welcome back, {seller.fullName?.split(' ')[0] || 'Merchant'}!</h1>
        </div>
        
        <div className="flex items-center gap-3">
          <Link href="/create" className="hidden md:flex items-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-700 px-4 py-2 rounded-lg font-semibold transition">
            <LinkIcon className="w-4 h-4" /> Create Link
          </Link>
          
          {/* WITHDRAW BUTTON */}
          <form action={handleWithdraw}>
            <button 
              type="submit"
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2 rounded-lg font-bold shadow-md shadow-indigo-200 transition flex items-center gap-2"
            >
              <Wallet className="w-4 h-4" /> Withdraw
            </button>
          </form>
        </div>
      </header>

      <main className="max-w-6xl mx-auto w-full px-6 py-8">
        
        {/* SUCCESS & ERROR ALERTS (Kwa ajili ya Withdraw) */}
        {params.success && (
          <div className="mb-6 p-4 bg-green-50 border border-green-200 text-green-700 rounded-xl flex items-center gap-3 shadow-sm">
            <CheckCircle2 className="w-5 h-5 text-green-600" />
            <div>
              <p className="font-bold">Withdrawal Request Successful!</p>
              <p className="text-sm">Your funds are being processed and will be sent to your registered account shortly.</p>
            </div>
          </div>
        )}

        {params.error === "insufficient" && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-xl flex items-center gap-3 shadow-sm">
            <AlertCircle className="w-5 h-5 text-red-600" />
            <div>
              <p className="font-bold">Insufficient Funds</p>
              <p className="text-sm">You do not have any available balance to withdraw. Ensure the buyer has released the funds.</p>
            </div>
          </div>
        )}

        {/* Overview Header */}
        <div className="flex justify-between items-end mb-6">
          <div>
            <h2 className="text-2xl font-bold text-slate-900">Overview</h2>
            <p className="text-slate-500">Track your sales, disputes, and escrow balances.</p>
          </div>
          <button className="text-indigo-600 font-semibold hover:underline flex items-center gap-1 text-sm hidden sm:flex">
            <Download className="w-4 h-4" /> Export Report
          </button>
        </div>

        {/* Pro Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {/* Card 1: Available Balance */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-6 opacity-10">
              <Wallet className="w-16 h-16" />
            </div>
            <p className="text-sm font-semibold text-slate-500 mb-1">Available to Withdraw</p>
            <h3 className="text-3xl font-extrabold text-slate-900 mb-4">TZS {availableBalance.toLocaleString()}</h3>
            <div className="flex items-center text-xs font-bold text-green-600 bg-green-50 w-fit px-2 py-1 rounded">
              <ArrowUpRight className="w-3 h-3 mr-1" /> Ready for payout
            </div>
          </div>

          {/* Card 2: Locked in Escrow */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-6 opacity-10">
              <Clock className="w-16 h-16 text-yellow-600" />
            </div>
            <p className="text-sm font-semibold text-slate-500 mb-1">Locked in Escrow</p>
            <h3 className="text-3xl font-extrabold text-yellow-600 mb-4">TZS {lockedBalance.toLocaleString()}</h3>
            <div className="flex items-center text-xs font-bold text-yellow-700 bg-yellow-50 w-fit px-2 py-1 rounded">
              Awaiting buyer approval
            </div>
          </div>

          {/* Card 3: Active Disputes */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-6 opacity-10">
              <AlertCircle className="w-16 h-16 text-red-600" />
            </div>
            <p className="text-sm font-semibold text-slate-500 mb-1">Active Disputes</p>
            <h3 className="text-3xl font-extrabold text-red-600 mb-4">{activeDisputes}</h3>
            <div className="flex items-center text-xs font-bold text-red-700 bg-red-50 w-fit px-2 py-1 rounded">
              Requires your attention
            </div>
          </div>
        </div>

        {/* Transactions Table */}
        <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
          <div className="p-6 border-b border-slate-200 flex justify-between items-center bg-slate-50/50">
            <h3 className="text-lg font-bold text-slate-900">Recent Transactions</h3>
            <Link href="/dashboard/transactions" className="text-sm font-semibold text-indigo-600 hover:underline">
              View All
            </Link>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-white border-b border-slate-200 text-xs uppercase tracking-wider text-slate-500">
                  <th className="p-4 font-semibold">Transaction Details</th>
                  <th className="p-4 font-semibold">Amount</th>
                  <th className="p-4 font-semibold">Status</th>
                  <th className="p-4 font-semibold">Date</th>
                  <th className="p-4 font-semibold text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {transactions.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="p-10 text-center text-slate-500">
                      <div className="flex flex-col items-center justify-center">
                        <ShoppingBag className="w-10 h-10 text-slate-300 mb-3" />
                        <p className="font-medium text-slate-600">No transactions yet.</p>
                        <p className="text-sm mt-1">Create a payment link to get started.</p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  transactions.slice(0, 10).map((tx) => (
                    <tr key={tx.id} className="hover:bg-slate-50 transition-colors group">
                      <td className="p-4">
                        <p className="font-bold text-slate-900">{tx.description.substring(0, 30)}...</p>
                        <p className="text-xs text-slate-500 mt-0.5">ID: {tx.id.slice(-8).toUpperCase()}</p>
                      </td>
                      <td className="p-4 font-bold text-slate-900">
                        TZS {tx.amount.toLocaleString()}
                      </td>
                      <td className="p-4">
                        <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold ${
                          tx.status === 'COMPLETED' ? 'bg-green-100 text-green-700' :
                          tx.status === 'PAID' ? 'bg-blue-100 text-blue-700' :
                          tx.status === 'SHIPPED' ? 'bg-purple-100 text-purple-700' :
                          tx.status === 'DISPUTED' ? 'bg-red-100 text-red-700' :
                          'bg-slate-100 text-slate-700'
                        }`}>
                          {tx.status === 'COMPLETED' && <CheckCircle2 className="w-3 h-3 mr-1" />}
                          {tx.status}
                        </span>
                      </td>
                      <td className="p-4 text-sm text-slate-600">
                        {new Date(tx.createdAt).toLocaleDateString('en-US', {
                          month: 'short', day: 'numeric', year: 'numeric'
                        })}
                      </td>
                      <td className="p-4 text-right">
                        <Link href={`/tx/${tx.id}`} className="text-indigo-600 font-semibold text-sm opacity-0 group-hover:opacity-100 transition-opacity hover:underline">
                          Copy Link
                        </Link>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}