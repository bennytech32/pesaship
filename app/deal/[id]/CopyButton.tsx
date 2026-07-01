'use client';

import { useState } from 'react';
import { Copy, CheckCircle2 } from 'lucide-react';

export default function CopyButton({ inviteLink }: { inviteLink: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(inviteLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex items-center gap-2 mt-4">
      <input 
        type="text" 
        readOnly 
        value={inviteLink}
        className="flex-1 bg-slate-50 border border-slate-200 text-slate-600 px-4 py-3 rounded-xl text-sm outline-none font-mono"
      />
      <button 
        onClick={handleCopy}
        className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm transition-all ${
          copied ? 'bg-green-600 text-white' : 'bg-slate-900 text-white hover:bg-slate-800'
        }`}
      >
        {copied ? <CheckCircle2 className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
        {copied ? 'Copied!' : 'Copy'}
      </button>
    </div>
  );
}