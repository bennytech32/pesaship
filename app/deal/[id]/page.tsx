import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/options";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { 
  ShieldCheck, ArrowLeft, Lock, Clock, 
  Link as LinkIcon, Truck, CheckCircle2, 
  AlertTriangle, XCircle 
} from 'lucide-react';
import Link from 'next/link';
import CopyButton from "./CopyButton";
import { markAsShipped } from "@/app/actions/markAsShipped";
import { acceptItem } from "@/app/actions/acceptItem"; 
import { rejectItem } from "@/app/actions/rejectItem"; 

export default async function DealPreview({ params }: { params: Promise<{ id: string }> }) {
  // Await params for Next.js 15+
  const { id: txId } = await params; 

  const session = await getServerSession(authOptions);
  if (!session || !session.user?.email) redirect('/login');

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    select: { id: true }
  });

  if (!user) redirect('/login');

  const tx = await prisma.transaction.findUnique({
    where: { id: txId }, 
    include: {
      buyer: { select: { fullName: true, email: true } },
      seller: { select: { fullName: true, email: true } }
    }
  });

  if (!tx) {
    return <div className="p-10 text-center font-bold text-xl">Deal not found.</div>;
  }

  // Security Check
  if (tx.buyerId !== user.id && tx.sellerId !== user.id) {
    return <div className="p-10 text-center font-bold text-xl text-red-600">Unauthorized Access.</div>;
  }

  const isBuyer = tx.buyerId === user.id;
  const isSeller = tx.sellerId === user.id;
  const partnerMissing = !tx.buyerId || !tx.sellerId;
  
  const baseUrl = process.env.NODE_ENV === 'production' ? 'https://pesaship.vercel.app' : 'http://localhost:3000';
  const inviteLink = `${baseUrl}/join/${tx.id}`;

  // Server Action wrappers
  const handleShip = async () => {
    "use server";
    await markAsShipped(txId);
  };

  const handleAccept = async () => {
    "use server";
    await acceptItem(txId);
  };

  const handleReject = async (formData: FormData) => {
    "use server";
    await rejectItem(txId, formData);
  };

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      <nav className="bg-white border-b border-slate-200 px-6 py-4">
        <div className="max-w-3xl mx-auto flex items-center gap-4">
          <Link href="/dashboard" className="p-2 hover:bg-slate-100 rounded-full transition">
            <ArrowLeft className="w-5 h-5 text-slate-600" />
          </Link>
          <div className="font-bold text-lg text-slate-900 flex items-center gap-2">
            Deal <span className="text-slate-400 font-mono text-sm uppercase">#{tx.id.slice(-6)}</span>
          </div>
        </div>
      </nav>

      <main className="max-w-3xl mx-auto px-6 py-10">
        
        {/* SHARE LINK CARD */}
        {partnerMissing && (
          <div className="bg-blue-600 rounded-[2rem] p-8 mb-8 text-white shadow-xl shadow-blue-200">
            <div className="flex items-center gap-3 mb-2">
              <LinkIcon className="w-6 h-6 text-blue-300" />
              <h2 className="text-2xl font-black">Invite Your Partner</h2>
            </div>
            <p className="text-blue-100 mt-2">
              You are the {isBuyer ? 'Buyer' : 'Seller'}. Send this secure link to the {isBuyer ? 'Seller' : 'Buyer'} via WhatsApp or SMS so they can join the escrow.
            </p>
            <CopyButton inviteLink={inviteLink} />
          </div>
        )}

        {/* DEAL BREAKDOWN */}
        <div className="bg-white rounded-[2rem] shadow-sm border border-slate-100 p-8">
          <div className="flex justify-between items-start mb-8">
            <div>
              <h1 className="text-2xl font-black text-slate-900">{tx.description}</h1>
              <div className="flex items-center gap-2 mt-2">
                <span className={`px-3 py-1 text-xs font-bold uppercase tracking-wider rounded-full ${
                  tx.status === 'COMPLETED' ? 'bg-green-100 text-green-700' :
                  tx.status === 'REJECTED' ? 'bg-red-100 text-red-700' :
                  tx.status === 'SHIPPED' ? 'bg-purple-100 text-purple-700' :
                  tx.status === 'PAID' ? 'bg-blue-100 text-blue-700' :
                  'bg-amber-100 text-amber-700'
                }`}>
                  {tx.status.replace('_', ' ')}
                </span>
                <span className="text-sm text-slate-400 font-medium">
                  Created {new Date(tx.createdAt).toLocaleDateString()}
                </span>
              </div>
            </div>
            <div className={`p-4 rounded-2xl ${
              tx.status === 'COMPLETED' ? 'bg-green-50 text-green-600' :
              tx.status === 'REJECTED' ? 'bg-red-50 text-red-600' :
              tx.status === 'SHIPPED' ? 'bg-purple-50 text-purple-600' :
              tx.status === 'PAID' ? 'bg-blue-50 text-blue-600' :
              'bg-slate-50 text-slate-400'
            }`}>
              {tx.status === 'COMPLETED' ? <CheckCircle2 className="w-8 h-8" /> :
               tx.status === 'REJECTED' ? <XCircle className="w-8 h-8" /> :
               tx.status === 'SHIPPED' ? <Truck className="w-8 h-8" /> : 
               tx.status === 'PAID' ? <Lock className="w-8 h-8" /> : 
               <Clock className="w-8 h-8" />}
            </div>
          </div>

          <div className="border-t border-slate-100 pt-8 mb-8">
            <h3 className="text-sm font-black text-slate-400 uppercase tracking-widest mb-4">Financial Breakdown</h3>
            <div className="space-y-4">
              <div className="flex justify-between text-slate-600 font-medium">
                <span>Item Price</span>
                <span>TZS {tx.amount.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-slate-600 font-medium">
                <span>PesaShip Escrow Fee (2.5%)</span>
                <span>TZS {tx.fee.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-xl font-black text-slate-900 pt-4 border-t border-slate-100">
                <span>Total Locked</span>
                <span>TZS {tx.total.toLocaleString()}</span>
              </div>
            </div>
          </div>

          {/* ========================================= */}
          {/* DISPUTE BANNER (Shows if REJECTED)          */}
          {/* ========================================= */}
          {tx.status === 'REJECTED' && (
            <div className="mb-8 p-5 bg-red-50 border border-red-100 rounded-2xl">
              <div className="flex items-center gap-2 text-red-800 font-black mb-2">
                <AlertTriangle className="w-5 h-5" /> Dispute Opened
              </div>
              <p className="text-sm text-red-700 mb-2">The buyer rejected the item with the following reason:</p>
              <div className="bg-white p-3 rounded-xl border border-red-100 text-sm text-slate-700 italic">
                "{tx.rejectionReason}"
              </div>
              <p className="text-xs text-red-500 font-bold mt-3 uppercase tracking-wider">A PesaShip Admin is reviewing this case.</p>
            </div>
          )}

          {/* ========================================= */}
          {/* BUYER: PAY / LOCK FUNDS                   */}
          {/* ========================================= */}
          {isBuyer && tx.status === 'AWAITING_PAYMENT' && !partnerMissing && (
            <div className="mb-8 border-t border-slate-100 pt-8">
              <Link 
                href={`/checkout/${tx.id}`}
                className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white px-8 py-4 rounded-2xl font-black text-lg shadow-xl shadow-blue-200 hover:scale-[1.02] transition-transform"
              >
                Lock Funds Securely <Lock className="w-5 h-5" />
              </Link>
            </div>
          )}

          {/* ========================================= */}
          {/* SELLER: WAITING FOR BUYER TO PAY          */}
          {/* ========================================= */}
          {isSeller && tx.status === 'AWAITING_PAYMENT' && !partnerMissing && (
            <div className="mb-8 border-t border-slate-100 pt-8 text-center bg-blue-50 p-6 rounded-2xl">
              <Clock className="w-8 h-8 text-blue-500 mx-auto mb-2 animate-pulse" />
              <h3 className="font-bold text-blue-900">Waiting for Buyer</h3>
              <p className="text-sm text-blue-700 mt-1">Do not ship the item yet. We are waiting for the buyer to lock the funds in escrow.</p>
            </div>
          )}

          {/* ========================================= */}
          {/* SELLER: MARK AS SHIPPED                   */}
          {/* ========================================= */}
          {isSeller && tx.status === 'PAID' && (
            <div className="mb-8 border-t border-slate-100 pt-8">
              <form action={handleShip}>
                <button type="submit" className="w-full flex items-center justify-center gap-2 bg-slate-900 text-white px-8 py-4 rounded-2xl font-black text-lg shadow-xl hover:bg-black transition-transform active:scale-95">
                  Mark as Shipped / Delivered <Truck className="w-5 h-5" />
                </button>
              </form>
              <p className="text-center text-xs text-slate-500 mt-3 font-medium">
                Only click this once you have delivered the product or service to the buyer.
              </p>
            </div>
          )}

          {/* ========================================= */}
          {/* BUYER: WAITING FOR SELLER TO SHIP         */}
          {/* ========================================= */}
          {isBuyer && tx.status === 'PAID' && (
            <div className="mb-8 border-t border-slate-100 pt-8 text-center bg-purple-50 p-6 rounded-2xl border border-purple-100">
              <Truck className="w-8 h-8 text-purple-500 mx-auto mb-2 animate-pulse" />
              <h3 className="font-bold text-purple-900">Funds Secured! Waiting for Seller</h3>
              <p className="text-sm text-purple-700 mt-1">Your money is locked safely. We have notified the seller to deliver your item.</p>
            </div>
          )}

          {/* ========================================= */}
          {/* BUYER: ACCEPT OR REJECT DELIVERY          */}
          {/* ========================================= */}
          {isBuyer && tx.status === 'SHIPPED' && (
            <div className="mb-8 border-t border-slate-100 pt-8">
              <h3 className="text-lg font-black text-slate-900 mb-4">Confirm Delivery</h3>
              
              <form action={handleAccept} className="mb-4">
                <button type="submit" className="w-full flex items-center justify-center gap-2 bg-green-600 text-white px-8 py-4 rounded-2xl font-black text-lg shadow-xl shadow-green-200 hover:scale-[1.02] transition-transform active:scale-95">
                  Accept Item & Release Funds <CheckCircle2 className="w-6 h-6" />
                </button>
              </form>

              <div className="bg-red-50 p-6 rounded-2xl border border-red-100 mt-6">
                <h4 className="text-red-800 font-bold mb-3 flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5" /> Problem with the item?
                </h4>
                <form action={handleReject} className="flex flex-col gap-3">
                  <input 
                    type="text" 
                    name="rejectionReason" 
                    required 
                    placeholder="Why are you rejecting this delivery?" 
                    className="w-full px-4 py-3 rounded-xl border border-red-200 focus:outline-none focus:ring-2 focus:ring-red-500 bg-white text-slate-900" 
                  />
                  <button type="submit" className="w-full bg-red-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-red-700 transition">
                    Reject & Open Dispute
                  </button>
                </form>
              </div>
            </div>
          )}

          {/* ========================================= */}
          {/* SELLER: WAITING FOR BUYER TO ACCEPT       */}
          {/* ========================================= */}
          {isSeller && tx.status === 'SHIPPED' && (
            <div className="mb-8 border-t border-slate-100 pt-8 text-center bg-green-50 p-6 rounded-2xl border border-green-100">
              <CheckCircle2 className="w-8 h-8 text-green-500 mx-auto mb-2 animate-pulse" />
              <h3 className="font-bold text-green-900">Item Delivered!</h3>
              <p className="text-sm text-green-700 mt-1">Waiting for the buyer to inspect the item and release the funds to your account.</p>
            </div>
          )}

          {/* PARTICIPANTS */}
          <div className="grid grid-cols-2 gap-4 bg-slate-50 p-6 rounded-2xl border border-slate-100">
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase mb-1 flex items-center gap-1">
                Buyer {isBuyer && <span className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded text-[10px]">YOU</span>}
              </p>
              <p className="font-bold text-slate-900">{tx.buyer?.fullName || "Waiting to join..."}</p>
            </div>
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase mb-1 flex items-center gap-1">
                Seller {isSeller && <span className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded text-[10px]">YOU</span>}
              </p>
              <p className="font-bold text-slate-900">{tx.seller?.fullName || "Waiting to join..."}</p>
            </div>
          </div>
        </div>

      </main>
    </div>
  );
}