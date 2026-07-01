import { getServerSession } from "next-auth";
// 1. TUMEWEKA NJIA SAHIHI YA AUTHOPTIONS HAPA
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { ShieldCheck, Lock, AlertCircle, ArrowRight, UserPlus } from 'lucide-react';
import Link from 'next/link';
import { joinTransaction } from "@/app/actions/joinTransaction";

export default async function JoinDealPage({ params }: { params: Promise<{ id: string }> }) {
  const { id: txId } = await params;
  
  const session = await getServerSession(authOptions);

  const tx = await prisma.transaction.findUnique({
    where: { id: txId },
    include: {
      buyer: { select: { fullName: true } },
      seller: { select: { fullName: true } }
    }
  });

  // Handle missing/invalid link
  if (!tx) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 p-6">
        <div className="max-w-md bg-white p-10 rounded-[2rem] text-center shadow-sm">
          <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <h1 className="text-xl font-bold">Deal Not Found</h1>
          <p className="text-slate-500 mt-2">This invite link is invalid or has expired.</p>
        </div>
      </div>
    );
  }

  // Determine which role needs to be filled
  const isBuyerMissing = !tx.buyerId;
  const isSellerMissing = !tx.sellerId;
  const isFull = tx.buyerId && tx.sellerId;
  const missingRole = isBuyerMissing ? 'Buyer' : 'Seller';
  const creatorName = isBuyerMissing ? tx.seller?.fullName : tx.buyer?.fullName;

  // Check if the current logged-in user is ALREADY part of the deal
  let userDbId = null;
  if (session?.user?.email) {
    const user = await prisma.user.findUnique({ 
      where: { email: session.user.email },
      select: { id: true }
    });
    userDbId = user?.id;
  }

  if (userDbId && (tx.buyerId === userDbId || tx.sellerId === userDbId)) {
    // Kama tayari yumo, mpeleke moja kwa moja kwenye ukurasa wa Deal
    redirect(`/deal/${txId}`);
  }

  return (
    <div className="min-h-screen bg-slate-50 py-20 px-6 flex items-center justify-center">
      <div className="max-w-xl w-full">
        
        {/* Security Badge */}
        <div className="flex justify-center mb-8">
          <div className="bg-blue-100 text-blue-700 px-4 py-2 rounded-full font-bold text-sm flex items-center gap-2">
            <ShieldCheck className="w-4 h-4" /> Secure PesaShip Invitation
          </div>
        </div>

        <div className="bg-white rounded-[2.5rem] shadow-xl shadow-slate-200/50 border border-slate-100 p-8 md:p-12">
          
          <div className="text-center mb-10">
            <div className="bg-slate-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
              <UserPlus className="w-8 h-8 text-blue-600" />
            </div>
            <h1 className="text-3xl font-black text-slate-900 leading-tight">
              {creatorName || "A user"} invited you <br /> to join a secure deal.
            </h1>
            <p className="text-slate-500 mt-3 font-medium">
              You will be joining this transaction as the <strong className="text-slate-900">{missingRole}</strong>.
            </p>
          </div>

          {/* Deal Details Box */}
          <div className="bg-slate-50 rounded-3xl p-6 border border-slate-100 mb-10">
            <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4">Transaction Details</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center border-b border-slate-200 pb-4">
                <span className="text-slate-500 font-medium">Item/Service</span>
                <span className="font-bold text-slate-900">{tx.description}</span>
              </div>
              <div className="flex justify-between items-center border-b border-slate-200 pb-4">
                <span className="text-slate-500 font-medium">Item Price</span>
                <span className="font-bold text-slate-900">TZS {tx.amount.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-500 font-medium">PesaShip Escrow Fee</span>
                <span className="font-bold text-slate-900">TZS {tx.fee.toLocaleString()}</span>
              </div>
            </div>
          </div>

          {/* Action Area */}
          {isFull ? (
            <div className="bg-amber-50 text-amber-700 p-4 rounded-2xl text-center font-bold">
              This deal is already full and in progress.
            </div>
          ) : !session ? (
            // NOT LOGGED IN -> Send to login, then redirect back here
            <div className="space-y-4">
              <Link 
                href={`/login?callbackUrl=/join/${txId}`}
                className="w-full flex items-center justify-center gap-2 bg-slate-900 text-white px-8 py-4 rounded-2xl font-black text-lg shadow-lg hover:bg-black transition active:scale-95"
              >
                Log In to Accept Deal <ArrowRight className="w-5 h-5" />
              </Link>
              <p className="text-center text-sm text-slate-500">
                New to PesaShip? <Link href="/register" className="text-blue-600 font-bold hover:underline">Create an account</Link>
              </p>
            </div>
          ) : (
            // LOGGED IN -> Show the final Join button
            // 2. TUMEWEKA ASYNC ARROW FUNCTION KUZUIA TYPESCRIPT ERROR NA KUFANYA REDIRECT IFANYE KAZI
            <form action={async (formData) => {
              "use server";
              await joinTransaction(txId);
            }}>
              <button 
                type="submit"
                className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white px-8 py-4 rounded-2xl font-black text-lg shadow-xl shadow-blue-200 hover:scale-[1.02] transition-transform active:scale-95"
              >
                Accept & Join Deal <ShieldCheck className="w-5 h-5" />
              </button>
            </form>
          )}

          <div className="flex items-center justify-center gap-2 mt-8 text-xs font-bold text-slate-400 uppercase tracking-widest">
            <Lock className="w-3 h-3" /> Funds are protected until delivery
          </div>
        </div>

      </div>
    </div>
  );
}