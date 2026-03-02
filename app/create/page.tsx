import { ShieldCheck, ArrowLeft, Info, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { createTransaction } from '../actions/createTransaction';

export default function CreateTransaction() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center py-12 px-6">
      <div className="max-w-xl w-full">
        <Link href="/dashboard" className="flex items-center gap-2 text-slate-500 hover:text-slate-900 transition mb-8 font-medium">
          <ArrowLeft className="w-4 h-4" /> Back to Dashboard
        </Link>

        <div className="bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden">
          <div className="bg-slate-900 p-8 text-white">
            <h1 className="text-2xl font-bold flex items-center gap-2">
              <ShieldCheck className="text-blue-500 w-7 h-7" /> New Escrow Deal
            </h1>
            <p className="text-slate-400 text-sm mt-1">Start a secure transaction in seconds.</p>
          </div>

          <form action={createTransaction} className="p-8 space-y-6">
            {/* Description */}
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">What are you trading?</label>
              <input 
                name="description"
                required
                placeholder="e.g. iPhone 13 Pro Max, Web Design Service"
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none transition text-slate-900"
              />
            </div>

            {/* Amount */}
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Transaction Amount (TZS)</label>
              <input 
                name="amount"
                type="number"
                required
                placeholder="0.00"
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none transition font-mono text-slate-900"
              />
            </div>

            {/* Role Selection */}
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-4">Your Role</label>
              <div className="grid grid-cols-2 gap-4">
                <label className="relative flex flex-col p-4 border rounded-2xl cursor-pointer hover:bg-slate-50 transition border-slate-200 has-[:checked]:border-blue-500 has-[:checked]:bg-blue-50">
                  <input type="radio" name="role" value="buyer" defaultChecked className="hidden" />
                  <span className="font-bold text-slate-900">I am Buying</span>
                  <span className="text-xs text-slate-500 mt-1">I will deposit the funds</span>
                </label>
                <label className="relative flex flex-col p-4 border rounded-2xl cursor-pointer hover:bg-slate-50 transition border-slate-200 has-[:checked]:border-blue-500 has-[:checked]:bg-blue-50">
                  <input type="radio" name="role" value="seller" className="hidden" />
                  <span className="font-bold text-slate-900">I am Selling</span>
                  <span className="text-xs text-slate-500 mt-1">I am providing goods/service</span>
                </label>
              </div>
            </div>

            {/* Fee Info */}
            <div className="bg-blue-50 p-4 rounded-xl flex gap-3">
              <Info className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
              <p className="text-xs text-blue-800 leading-relaxed">
                PesaShip charges a <strong>2.5% secure escrow fee</strong>. The total will be calculated automatically on the next step.
              </p>
            </div>

            <button type="submit" className="w-full bg-blue-600 text-white py-4 rounded-2xl font-bold text-lg hover:bg-blue-700 transition shadow-lg shadow-blue-100 flex items-center justify-center gap-2">
              Create & Get Invite Link <ArrowRight className="w-5 h-5" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}