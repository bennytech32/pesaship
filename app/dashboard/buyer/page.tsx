import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { 
  ShieldCheck, 
  Lock, 
  Package, 
  AlertTriangle, 
  CheckCircle2, 
  Plus
} from "lucide-react";

// Import Server Actions zetu mpya
import { releaseFunds } from "@/app/actions/releaseFunds";
import { openDispute } from "@/app/actions/openDispute";

export default async function BuyerDashboard() {
  const session = await auth();
  if (!session || !session.user?.email) redirect("/login");

  // Vuta taarifa za Mnunuzi na miamala yake yote ya manunuzi
  const buyer = await prisma.user.findUnique({
    where: { email: session.user.email },
    include: {
      buyingTransactions: {
        orderBy: { createdAt: 'desc' }
      }
    }
  });

  if (!buyer || buyer.role !== "BUYER") redirect("/dashboard");

  const transactions = buyer.buyingTransactions;

  // BUYER METRICS CALCULATIONS
  // 1. Funds Currently Protected in Escrow
  const protectedFunds = transactions
    .filter(t => t.status === "PAID" || t.status === "SHIPPED")
    .reduce((sum, t) => sum + t.amount, 0);

  // 2. Active Orders (Not completed yet)
  const activeOrders = transactions.filter(t => t.status !== "COMPLETED").length;

  // 3. Total Money Safely Transacted
  const totalTransacted = transactions
    .filter(t => t.status === "COMPLETED")
    .reduce((sum, t) => sum + t.amount, 0);

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 pb-12">
      
      {/* Top Navigation for Buyer */}
      <nav className="bg-white border-b border-slate-200 px-6 py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-xl shadow-md">
              {buyer.fullName?.charAt(0).toUpperCase() || "B"}
            </div>
            <div>
              <h1 className="font-bold text-slate-900 leading-tight">{buyer.fullName || "Buyer Account"}</h1>
              <p className="text-xs text-slate-500 font-medium">{buyer.email}</p>
            </div>
          </div>
          <div>
            <Link href="/create" className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg font-bold shadow-md shadow-blue-200 transition flex items-center gap-2 text-sm">
              <Plus className="w-4 h-4" /> New Escrow Deal
            </Link>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-6 mt-8">
        
        {/* Header */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-slate-900">Buyer Portal</h2>
          <p className="text-slate-500">Monitor your purchases and secure your payments.</p>
        </div>

        {/* Buyer Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {/* Card 1: Protected Funds */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-6 opacity-5">
              <Lock className="w-16 h-16 text-blue-600" />
            </div>
            <p className="text-sm font-semibold text-slate-500 mb-1">Protected in Escrow</p>
            <h3 className="text-3xl font-extrabold text-blue-600 mb-4">TZS {protectedFunds.toLocaleString()}</h3>
            <div className="flex items-center text-xs font-bold text-blue-700 bg-blue-50 w-fit px-2 py-1 rounded">
              <ShieldCheck className="w-3.5 h-3.5 mr-1 text-blue-600" /> 100% Secured Vault
            </div>
          </div>

          {/* Card 2: Active Shipments / Orders */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-6 opacity-5">
              <Package className="w-16 h-16 text-slate-600" />
            </div>
            <p className="text-sm font-semibold text-slate-500 mb-1">Active Orders</p>
            <h3 className="text-3xl font-extrabold text-slate-900 mb-4">{activeOrders}</h3>
            <div className="flex items-center text-xs font-bold text-slate-600 bg-slate-100 w-fit px-2 py-1 rounded">
              Awaiting delivery or confirmation
            </div>
          </div>

          {/* Card 3: Successfully Completed */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-6 opacity-5">
              <CheckCircle2 className="w-16 h-16 text-green-600" />
            </div>
            <p className="text-sm font-semibold text-slate-500 mb-1">Released Safely</p>
            <h3 className="text-3xl font-extrabold text-green-600 mb-4">TZS {totalTransacted.toLocaleString()}</h3>
            <div className="flex items-center text-xs font-bold text-green-700 bg-green-50 w-fit px-2 py-1 rounded">
              Successful transactions
            </div>
          </div>
        </div>

        {/* Transactions Table */}
        <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
          <div className="p-6 border-b border-slate-200 flex justify-between items-center bg-slate-50/50">
            <h3 className="text-lg font-bold text-slate-900">Your Purchase History</h3>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-white border-b border-slate-200 text-xs uppercase tracking-wider text-slate-500">
                  <th className="p-4 font-semibold">Item & Details</th>
                  <th className="p-4 font-semibold">Price</th>
                  <th className="p-4 font-semibold">Escrow Status</th>
                  <th className="p-4 font-semibold">Date</th>
                  <th className="p-4 font-semibold text-right">Protection Controls</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {transactions.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="p-10 text-center text-slate-500">
                      <div className="flex flex-col items-center justify-center">
                        <Package className="w-10 h-10 text-slate-300 mb-3" />
                        <p className="font-medium text-slate-600">No purchases found.</p>
                        <p className="text-sm mt-1">Start your first secure transaction above.</p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  transactions.map((tx) => (
                    <tr key={tx.id} className="hover:bg-slate-50 transition-colors">
                      <td className="p-4">
                        <p className="font-bold text-slate-900">{tx.description}</p>
                        <p className="text-xs text-slate-500 mt-0.5">Escrow ID: {tx.id.slice(-8).toUpperCase()}</p>
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
                          {tx.status}
                        </span>
                      </td>
                      <td className="p-4 text-sm text-slate-600">
                        {new Date(tx.createdAt).toLocaleDateString('en-US', {
                          month: 'short', day: 'numeric', year: 'numeric'
                        })}
                      </td>
                      
                      {/* ACTION BUTTONS (RELEASE OR DISPUTE) */}
                      <td className="p-4 text-right">
                        {tx.status === "PAID" || tx.status === "SHIPPED" ? (
                          <div className="flex justify-end gap-2">
                            {/* TUMEWEKA ASYNC ARROW FUNCTION KUZUIA TYPESCRIPT ERROR YENYE 'VOID' */}
                            <form action={async () => {
                              "use server";
                              await openDispute(tx.id);
                            }}>
                              <button 
                                type="submit" 
                                className="bg-red-50 hover:bg-red-100 text-red-600 px-3 py-1.5 text-xs font-bold rounded-lg border border-red-200 transition flex items-center gap-1"
                              >
                                <AlertTriangle className="w-3 h-3" /> Dispute
                              </button>
                            </form>

                            {/* TUMEWEKA ASYNC ARROW FUNCTION HAPA PIA */}
                            <form action={async () => {
                              "use server";
                              await releaseFunds(tx.id);
                            }}>
                              <button 
                                type="submit" 
                                className="bg-green-600 hover:bg-green-700 text-white px-3 py-1.5 text-xs font-bold rounded-lg shadow-sm shadow-green-100 transition flex items-center gap-1"
                              >
                                <CheckCircle2 className="w-3 h-3" /> Release Funds
                              </button>
                            </form>
                          </div>
                        ) : tx.status === "COMPLETED" ? (
                          <span className="text-xs text-slate-400 font-semibold flex items-center justify-end gap-1">
                            <CheckCircle2 className="w-3.5 h-3.5 text-green-500" /> Funds Released
                          </span>
                        ) : tx.status === "DISPUTED" ? (
                           <span className="text-xs text-red-500 font-bold flex items-center justify-end gap-1">
                            <AlertTriangle className="w-3.5 h-3.5" /> Under Review
                          </span>
                        ) : (
                          <span className="text-xs text-slate-400 font-medium">No actions required</span>
                        )}
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