import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ShieldCheck, Lock, ShoppingBag, ArrowRight, Smartphone, CreditCard, Loader2, CheckCircle2 } from "lucide-react";
import { joinTransaction } from "@/app/actions/joinTransaction";
import { payTransaction } from "@/app/actions/payTransaction";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function TransactionLinkPage({ params }: PageProps) {
  const { id } = await params;
  const session = await auth();

  // 1. Vuta maelezo ya muamala
  const tx = await prisma.transaction.findUnique({
    where: { id: id },
    include: { seller: true },
  });

  if (!tx) notFound();

  // 2. Mtafute huyu mtumiaji anayeangalia hii link sasa hivi
  const currentUser = session?.user?.email 
    ? await prisma.user.findUnique({ where: { email: session.user.email } }) 
    : null;

  // 3. Je, huyu anayeangalia ndiye Mnunuzi aliyeshikilia hii deal?
  const isAssignedBuyer = currentUser && tx.buyerId === currentUser.id;

  // Server Actions Handlers
  const handleJoin = async () => {
    "use server";
    await joinTransaction(id);
  };

  const handlePayment = async () => {
    "use server";
    await payTransaction(id);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6 font-sans text-slate-900">
      
      {/* Brand Header */}
      <div className="flex items-center gap-2 mb-8">
        <div className="bg-blue-600 p-1.5 rounded-lg">
          <ShieldCheck className="w-6 h-6 text-white" />
        </div>
        <div className="text-2xl font-extrabold tracking-tight">
          Pesa<span className="text-blue-600">Ship</span> Checkout
        </div>
      </div>

      {/* Main Secure Invoice Card */}
      <div className="bg-white border border-slate-200 shadow-xl shadow-slate-200/50 rounded-3xl p-8 max-w-md w-full relative overflow-hidden">
        
        {/* Top Decorative Escrow Seal */}
        <div className="absolute top-0 right-0 bg-blue-50 text-blue-600 px-4 py-1.5 rounded-bl-2xl font-bold text-xs tracking-wider flex items-center gap-1">
          <Lock className="w-3.5 h-3.5" /> ESCROW VAULT
        </div>

        <div className="mb-6 mt-2">
          <p className="text-xs uppercase font-bold tracking-wider text-slate-400">Paying To</p>
          <h2 className="text-xl font-extrabold text-slate-900 flex items-center gap-2 mt-0.5">
            <ShoppingBag className="w-5 h-5 text-indigo-600" />
            {tx.seller?.fullName || "Verified Merchant"}
          </h2>
        </div>

        <hr className="border-slate-100 my-4" />

        {/* Product/Deal Details */}
        <div className="space-y-4 mb-8">
          <div>
            <p className="text-xs uppercase font-bold tracking-wider text-slate-400">Order Description</p>
            <p className="text-slate-700 font-medium mt-1 bg-slate-50 p-3 rounded-xl border border-slate-100">
              {tx.description}
            </p>
          </div>

          <div>
            <p className="text-xs uppercase font-bold tracking-wider text-slate-400">Total Amount</p>
            <p className="text-3xl font-black text-blue-600 tracking-tight mt-1">
              TZS {tx.amount.toLocaleString()}
            </p>
          </div>
        </div>

        {/* LOGIC YA KUONYESHA VITU TOFAUTI KULINGANA NA STATUS */}
        
        {!session ? (
          // 1. Kama hajalogin, mlazimishe alogin kwanza
          <Link 
            href={`/login?callbackUrl=/tx/${id}`}
            className="w-full py-3.5 px-4 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl shadow-md transition-all flex items-center justify-center gap-2"
          >
            Log In as Buyer to Pay <ArrowRight className="w-4 h-4" />
          </Link>

        ) : tx.status === "PAID" || tx.status === "SHIPPED" || tx.status === "COMPLETED" ? (
          // 2. Kama Deal ishalipiwa (Success Screen)
          <div className="text-center bg-green-50 border border-green-200 rounded-2xl p-6">
            <CheckCircle2 className="w-12 h-12 text-green-600 mx-auto mb-3" />
            <h3 className="font-bold text-green-800 text-lg">Funds Secured Safely!</h3>
            <p className="text-sm text-green-700 mt-2 font-medium">
              Your money is locked in Escrow. You can view the status in your dashboard.
            </p>
            <Link href="/dashboard/buyer" className="mt-4 inline-block text-blue-600 font-bold hover:underline text-sm">
              Go to My Dashboard &rarr;
            </Link>
          </div>

        ) : isAssignedBuyer && tx.status === "AWAITING_PAYMENT" ? (
          // 3. Kama ni Mnunuzi, na anadaiwa (Payment Gateway UI)
          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200">
            <p className="text-sm font-bold text-slate-800 mb-3 flex items-center gap-2">
              <CreditCard className="w-4 h-4 text-slate-500"/> Select Payment Method
            </p>
            <div className="grid grid-cols-2 gap-3 mb-4">
              <button className="bg-white border-2 border-green-500 p-3 rounded-xl flex flex-col items-center gap-2 hover:bg-green-50 transition">
                <Smartphone className="w-6 h-6 text-green-600"/>
                <span className="text-xs font-bold text-slate-700">Mobile Money</span>
              </button>
              <button className="bg-white border border-slate-200 p-3 rounded-xl flex flex-col items-center gap-2 opacity-50 cursor-not-allowed">
                <CreditCard className="w-6 h-6 text-slate-400"/>
                <span className="text-xs font-bold text-slate-500">Bank Card</span>
              </button>
            </div>
            
            <form action={handlePayment}>
              <button 
                type="submit"
                className="w-full py-3.5 px-4 bg-green-600 hover:bg-green-700 text-white font-bold rounded-xl shadow-lg shadow-green-200 transition-all flex items-center justify-center gap-2"
              >
                Deposit TZS {tx.amount.toLocaleString()} <Lock className="w-4 h-4" />
              </button>
            </form>
          </div>

        ) : tx.buyerId && !isAssignedBuyer ? (
          // 4. Kama mtu mwingine ashadaka hii link
          <div className="w-full py-3.5 text-center bg-slate-100 border border-slate-200 text-slate-500 font-bold rounded-xl text-sm">
            This secure link has already been claimed.
          </div>

        ) : (
          // 5. Kama ipo wazi kabisa (Hakuna Buyer bado)
          <form action={handleJoin}>
            <button 
              type="submit"
              className="w-full py-3.5 px-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-lg shadow-blue-100 transition-all flex items-center justify-center gap-2"
            >
              Secure This Deal & Pay <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        )}
      </div>

      <div className="text-center mt-6">
        <p className="text-xs text-slate-400 font-medium max-w-xs leading-relaxed">
          Powered by PesaShip Escrow Technology. Protecting buyers and sellers across Tanzania.
        </p>
      </div>

    </div>
  );
}