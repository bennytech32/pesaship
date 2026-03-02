import { PrismaClient } from '@prisma/client';
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/auth"; 
import { redirect } from "next/navigation";
import { ShieldCheck, Lock, CheckCircle, UserPlus } from 'lucide-react';
import Link from 'next/link';

const prisma = new PrismaClient();

// Notice the type of params changed to a Promise
export default async function InvitePage({ params }: { params: Promise<{ id: string }> }) {
  
  // 1. MUST AWAIT PARAMS FIRST (Next.js 15+ Requirement)
  const resolvedParams = await params;
  const transactionId = resolvedParams.id;

  // 2. Fetch the transaction using the resolved ID
  const tx = await prisma.transaction.findUnique({ where: { id: transactionId } });
  
  if (!tx) {
    return <div className="min-h-screen flex items-center justify-center text-gray-500">Transaction not found or has been deleted.</div>;
  }

  // 3. Check if the transaction is already full
  const isFull = tx.buyerId && tx.sellerId;
  const missingRole = !tx.buyerId ? 'Buyer' : 'Seller';

  // 4. Check who is viewing this page
  const session = await getServerSession(authOptions);
  const userId = session?.user ? (session.user as any).id : null;
  const isCreator = userId && (tx.buyerId === userId || tx.sellerId === userId);

  // 5. Server Action to Accept the Deal
  async function acceptDeal() {
    'use server';
    const currentSession = await getServerSession(authOptions);
    if (!currentSession) redirect('/login'); 

    const currentUserId = (currentSession.user as any).id;

    // Assign them to the empty slot
    const updateData = !tx?.buyerId ? { buyerId: currentUserId } : { sellerId: currentUserId };

    await prisma.transaction.update({
      where: { id: transactionId },
      data: updateData
    });

    redirect('/dashboard'); 
  }

  return (
    <div className="min-h-screen bg-slate-50 flex justify-center items-center p-4">
      <div className="bg-white max-w-md w-full rounded-3xl shadow-xl overflow-hidden border border-slate-100">
        
        {/* Header */}
        <div className="bg-slate-900 text-white p-8 text-center relative overflow-hidden">
           <ShieldCheck className="w-12 h-12 text-blue-500 mx-auto mb-3 relative z-10" />
           <h1 className="text-2xl font-bold relative z-10">PesaShip Escrow</h1>
           <p className="text-slate-400 text-sm mt-1 relative z-10">You have been invited to a secure transaction</p>
           <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/20 rounded-full blur-2xl -mr-10 -mt-10"></div>
        </div>

        {/* Transaction Details */}
        <div className="p-8">
          <div className="bg-gray-50 rounded-xl p-5 border border-gray-100 space-y-4 mb-8">
             <div>
               <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">Item / Service</p>
               <p className="text-lg font-bold text-gray-800">{tx.description}</p>
             </div>
             <div className="pt-4 border-t border-gray-200 flex justify-between items-end">
               <div>
                 <p className="text-xs text-gray-400 font-bold uppercase tracking-wider mb-1">Total Value</p>
                 <p className="text-2xl font-bold text-blue-600">TZS {tx.total.toLocaleString()}</p>
               </div>
               <div className="text-right">
                 <p className="text-xs text-gray-400 font-bold uppercase tracking-wider mb-1">Your Role</p>
                 <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-xs font-bold uppercase">
                   {missingRole}
                 </span>
               </div>
             </div>
          </div>

          {/* Call to Action Logic */}
          {isFull ? (
             <div className="bg-gray-100 text-gray-500 p-4 rounded-xl text-center font-bold flex items-center justify-center gap-2">
               <CheckCircle className="w-5 h-5" /> Deal is already active
             </div>
          ) : isCreator ? (
             <div className="bg-blue-50 text-blue-700 p-4 rounded-xl text-center font-medium text-sm border border-blue-100">
               You created this deal. Waiting for the {missingRole} to join.
             </div>
          ) : !session ? (
             <Link href="/login" className="w-full bg-slate-900 text-white py-4 rounded-xl font-bold hover:bg-black transition flex items-center justify-center gap-2 shadow-lg">
               <Lock className="w-4 h-4" /> Log in to Accept Deal
             </Link>
          ) : (
             <form action={acceptDeal}>
               <button type="submit" className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold hover:bg-blue-700 transition flex items-center justify-center gap-2 shadow-lg shadow-blue-200">
                 <UserPlus className="w-5 h-5" /> Accept & Join as {missingRole}
               </button>
             </form>
          )}
        </div>
      </div>
    </div>
  );
}