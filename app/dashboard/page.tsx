import { getServerSession } from "next-auth";
import { authOptions } from "../auth"; 
import { redirect } from "next/navigation";
import { PrismaClient } from '@prisma/client';
import EscrowControls from './EscrowControls';
import { ShieldCheck, Clock, Truck, CheckCircle, ArrowRight, Wallet, ShoppingBag, Share2, MessageCircle } from 'lucide-react';
import Link from 'next/link';

const prisma = new PrismaClient();
export const dynamic = 'force-dynamic';

export default async function Dashboard() {
  
  const session = await getServerSession(authOptions);
  if (!session || !session.user) redirect("/login");

  const userId = (session.user as any).id;

  // 1. Fetch ALL transactions for this user
  let transactions: any[] = [];
  try {
    transactions = await prisma.transaction.findMany({
      where: { OR: [{ buyerId: userId }, { sellerId: userId }] },
      orderBy: { createdAt: 'desc' },
    });
  } catch (error) {
    console.error("Database Error:", error);
  }

  // 2. Separate them for calculations
  const buyingList = transactions.filter(tx => tx.buyerId === userId);
  const sellingList = transactions.filter(tx => tx.sellerId === userId);
  const totalSpent = buyingList.reduce((acc, curr) => acc + curr.total, 0);
  const totalEarned = sellingList.reduce((acc, curr) => acc + curr.total, 0);
  
  // 3. Find the currently active deal
  const activeTransaction = transactions.find(tx => tx.status !== 'COMPLETED');
  const isWaitingForPartner = activeTransaction && (!activeTransaction.buyerId || !activeTransaction.sellerId);

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex justify-between items-end">
         <h1 className="text-2xl font-bold text-gray-800">Welcome, {session.user.name}</h1>
      </div>
      
      {/* --- STATS ROW --- */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex justify-between">
           <div><p className="text-gray-500 text-sm font-medium">Total Spent</p><h3 className="text-2xl font-bold mt-1 text-slate-800">TZS {totalSpent.toLocaleString()}</h3></div>
           <div className="bg-blue-50 p-3 rounded-xl"><ShoppingBag className="w-5 h-5 text-blue-600"/></div>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex justify-between">
           <div><p className="text-gray-500 text-sm font-medium">Expected Earnings</p><h3 className="text-2xl font-bold mt-1 text-slate-800">TZS {totalEarned.toLocaleString()}</h3></div>
           <div className="bg-green-50 p-3 rounded-xl"><Wallet className="w-5 h-5 text-green-600"/></div>
        </div>
        <div className="bg-gradient-to-br from-slate-800 to-slate-900 p-6 rounded-2xl shadow-lg text-white flex flex-col justify-between">
            <h3 className="font-bold text-lg">Start New Deal</h3>
            <Link href="/create" className="bg-white/10 hover:bg-white/20 p-3 rounded-xl text-center text-sm font-bold transition flex items-center justify-center gap-2 mt-2">
              Create Escrow <ArrowRight className="w-4 h-4"/>
            </Link>
        </div>
      </div>

      {/* --- FEATURED ACTIVE DEAL --- */}
      {activeTransaction && (
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
          <div className="bg-blue-600 text-white p-6 flex justify-between items-center">
            <div>
              <span className="bg-white/20 text-xs px-2 py-1 rounded font-bold uppercase tracking-wider mb-2 inline-block">
                {activeTransaction.buyerId === userId ? "You are Buying" : "You are Selling"}
              </span>
              <h2 className="text-xl font-bold">{activeTransaction.description}</h2>
            </div>
            <div className="text-right">
                <p className="text-white/80 text-xs uppercase">Transaction Value</p>
                <p className="text-2xl font-bold mt-1">TZS {activeTransaction.total.toLocaleString()}</p>
            </div>
          </div>
          
          <div className="p-6 flex flex-col md:flex-row items-center justify-between gap-6">
             <div className="flex items-center gap-4 w-full">
               <StatusIcon status={activeTransaction.status}/>
               <div>
                 <p className="font-bold text-gray-800 text-lg">{activeTransaction.status}</p>
                 <p className="text-sm text-gray-500">
                   {isWaitingForPartner ? "Waiting for the other party to join." : "Transaction is locked and active."}
                 </p>
               </div>
             </div>
             
             {/* --- SMART ESCROW CONTROLS --- */}
             {!isWaitingForPartner ? (
                <EscrowControls 
                  id={activeTransaction.id} 
                  status={activeTransaction.status} 
                  amount={activeTransaction.total} 
                  isBuyer={activeTransaction.buyerId === userId} // Passing the role securely!
                />
             ) : (
                <div className="bg-yellow-50 text-yellow-700 px-4 py-2 rounded-lg font-bold text-sm border border-yellow-200">
                  Awaiting Partner
                </div>
             )}
          </div>

          {/* --- SHARE INVITATION BANNER --- */}
          {isWaitingForPartner && (
            <div className="bg-slate-50 border-t border-slate-100 p-6 flex flex-col md:flex-row items-center justify-between gap-4">
               <div>
                 <h4 className="font-bold text-slate-800 flex items-center gap-2">
                   <Share2 className="w-4 h-4 text-blue-500" /> Share Invitation Link
                 </h4>
                 <p className="text-sm text-slate-500 mt-1">Send this link to the {activeTransaction.buyerId ? 'Seller' : 'Buyer'} to start.</p>
               </div>
               <div className="flex gap-3 w-full md:w-auto">
                 <a 
                   href={`https://wa.me/?text=Join%20my%20secure%20PesaShip%20transaction:%20http://localhost:3000/invite/${activeTransaction.id}`} 
                   target="_blank" rel="noreferrer"
                   className="bg-green-500 hover:bg-green-600 text-white px-5 py-2.5 rounded-xl text-sm font-bold flex items-center justify-center gap-2 transition flex-1"
                 >
                   <MessageCircle className="w-4 h-4" /> WhatsApp
                 </a>
                 <Link 
                   href={`/invite/${activeTransaction.id}`} 
                   className="bg-white border border-slate-200 text-slate-700 hover:bg-slate-100 px-5 py-2.5 rounded-xl text-sm font-bold transition flex-1 text-center"
                 >
                   Preview
                 </Link>
               </div>
            </div>
          )}
        </div>
      )}

      {/* --- ALL TRANSACTIONS TABLE --- */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-100"><h3 className="font-bold text-gray-800">History</h3></div>
        <div className="overflow-x-auto">
          <table className="w-full text-left whitespace-nowrap">
            <thead className="bg-gray-50/50">
              <tr>
                <th className="p-4 text-xs font-bold text-gray-500 uppercase pl-6">Item</th>
                <th className="p-4 text-xs font-bold text-gray-500 uppercase">Role</th>
                <th className="p-4 text-xs font-bold text-gray-500 uppercase">Status</th>
                <th className="p-4 text-xs font-bold text-gray-500 uppercase text-right pr-6">Amount</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {transactions.map((tx) => {
                const isBuyer = tx.buyerId === userId;
                return (
                  <tr key={tx.id} className="hover:bg-slate-50 transition-colors">
                    <td className="p-4 font-medium text-gray-800 pl-6">{tx.description}</td>
                    <td className="p-4"><span className={`px-2 py-1 rounded text-xs font-bold ${isBuyer ? 'bg-blue-100 text-blue-700' : 'bg-purple-100 text-purple-700'}`}>{isBuyer ? 'BUYER' : 'SELLER'}</span></td>
                    <td className="p-4"><StatusBadge status={tx.status} /></td>
                    <td className="p-4 text-right font-mono text-gray-600 pr-6">TZS {tx.total.toLocaleString()}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          {transactions.length === 0 && <div className="p-12 text-center text-gray-400">No transactions found.</div>}
        </div>
      </div>
    </div>
  );
}

// Helpers
function StatusBadge({ status }: { status: string }) {
  const colors: any = { PENDING: "bg-yellow-100 text-yellow-800", DEPOSITED: "bg-green-100 text-green-800", IN_TRANSIT: "bg-blue-100 text-blue-800", COMPLETED: "bg-gray-100 text-gray-800" };
  return <span className={`px-2 py-1 rounded text-xs font-bold ${colors[status]}`}>{status}</span>;
}

function StatusIcon({ status }: { status: string }) {
  if (status === 'PENDING') return <Clock className="text-yellow-500 w-10 h-10" />;
  if (status === 'DEPOSITED') return <ShieldCheck className="text-green-500 w-10 h-10" />;
  if (status === 'IN_TRANSIT') return <Truck className="text-blue-500 w-10 h-10" />;
  return <CheckCircle className="text-gray-400 w-10 h-10" />;
}