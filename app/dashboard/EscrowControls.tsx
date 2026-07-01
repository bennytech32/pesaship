'use client';

import { markAsDeposited } from '../actions/escrowActions';
import { CreditCard, ShieldCheck, Phone } from 'lucide-react';
import { useTransition, useState } from 'react';

export default function EscrowControls({ id, status, amount, isBuyer }: { id: string, status: string, amount: number, isBuyer: boolean }) {
  const [isPending, startTransition] = useTransition();
  const [phoneNumber, setPhoneNumber] = useState('');

  const handlePayment = (e: React.FormEvent) => {
    e.preventDefault();
    // Inazuia kama namba haijawekwa
    if (!phoneNumber) return;

    startTransition(() => { 
      // Kama action yako ya markAsDeposited inahitaji kupokea namba, unaweza kuipitisha hivi: markAsDeposited(id, phoneNumber)
      // Kwa sasa tunatumia id kama mwanzo
      markAsDeposited(id); 
    });
  };

  // --- STAGE 1: WAITING FOR DEPOSIT ---
  if (status === 'PENDING') {
     if (isBuyer) {
        return (
           <form onSubmit={handlePayment} className="flex flex-col gap-3 w-full md:w-auto">
             <div className="relative">
               <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                 <Phone className="w-4 h-4 text-slate-400" />
               </div>
               <input
                 type="tel"
                 required
                 placeholder="Namba ya Simu (Mfn: 07...)"
                 value={phoneNumber}
                 onChange={(e) => setPhoneNumber(e.target.value)}
                 className="w-full pl-10 pr-4 py-3 bg-white border border-slate-200 rounded-xl font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-green-500 transition"
               />
             </div>
             <button
               type="submit"
               disabled={isPending || !phoneNumber}
               className="bg-green-600 hover:bg-green-700 text-white px-6 py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition disabled:opacity-50 shadow-lg shadow-green-200"
             >
               <CreditCard className="w-5 h-5" />
               {isPending ? 'Processing...' : `Deposit TZS ${amount.toLocaleString()}`}
             </button>
           </form>
        );
     } else {
        return (
          <div className="bg-gray-100 text-gray-500 px-6 py-4 rounded-xl font-bold text-sm border border-gray-200 text-center">
            Waiting for Buyer to Deposit
          </div>
        );
     }
  }

  // --- STAGE 2: FUNDS SECURED ---
  if (status === 'DEPOSITED') {
      return (
          <div className="bg-green-50 text-green-700 px-6 py-4 rounded-xl font-bold flex items-center gap-2 border border-green-200">
             <ShieldCheck className="w-5 h-5" /> Funds Secured in Escrow
          </div>
      );
  }

  return null;
}