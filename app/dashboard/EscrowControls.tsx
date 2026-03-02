'use client';

import { markAsDeposited } from '../actions/escrowActions';
import { CreditCard, Truck, CheckCircle, ShieldCheck } from 'lucide-react';
import { useTransition } from 'react';

export default function EscrowControls({ id, status, amount, isBuyer }: { id: string, status: string, amount: number, isBuyer: boolean }) {
  const [isPending, startTransition] = useTransition();

  // --- STAGE 1: WAITING FOR DEPOSIT ---
  if (status === 'PENDING') {
     if (isBuyer) {
        return (
           <button
             onClick={() => startTransition(() => markAsDeposited(id))}
             disabled={isPending}
             className="bg-green-600 hover:bg-green-700 text-white px-6 py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition disabled:opacity-50 w-full md:w-auto shadow-lg shadow-green-200"
           >
             <CreditCard className="w-5 h-5" />
             {isPending ? 'Processing...' : `Deposit TZS ${amount.toLocaleString()}`}
           </button>
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