"use client";

import { useState, useTransition } from "react";
import { submitKyc } from "@/app/actions/submitKyc";
import { 
  ShieldCheck, 
  CreditCard, 
  Building2, 
  UploadCloud, 
  AlertCircle, 
  CheckCircle2,
  Loader2,
  Info
} from "lucide-react";

export default function KycVerificationPage() {
  const [activeTab, setActiveTab] = useState<"NIDA" | "BUSINESS">("NIDA");
  const [isPending, startTransition] = useTransition();
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  // States za NIDA
  const [nidaNumber, setNidaNumber] = useState("");
  
  // States za Biashara
  const [tinNumber, setTinNumber] = useState("");
  const [businessName, setBusinessName] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    setSuccessMsg("");

    const formData = new FormData();
    formData.append("kycType", activeTab);
    
    if (activeTab === "NIDA") {
      if (nidaNumber.length !== 20) {
        setErrorMsg("Namba ya NIDA inapaswa kuwa na tarakimu 20.");
        return;
      }
      formData.append("nidaNumber", nidaNumber);
    } else {
      if (tinNumber.length < 9) {
        setErrorMsg("Tafadhali weka TIN namba sahihi.");
        return;
      }
      formData.append("businessName", businessName);
      formData.append("tinNumber", tinNumber);
    }

    startTransition(async () => {
      const result = await submitKyc(formData);
      if (result.success) {
        setSuccessMsg(result.message || "Imefanikiwa!");
        // Safisha fomu
        setNidaNumber("");
        setTinNumber("");
        setBusinessName("");
      } else {
        setErrorMsg(result.error || "Kuna kosa limetokea.");
      }
    });
  };

  return (
    <div className="p-6 md:p-8 max-w-5xl mx-auto w-full">
      
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-black text-slate-900 flex items-center gap-2">
          <ShieldCheck className="w-7 h-7 text-indigo-600" />
          KYC & Identity Verification
        </h1>
        <p className="text-slate-500 mt-1">
          To comply with Tanzanian financial regulations and activate Pro Escrow features, please verify your identity or business.
        </p>
      </div>

      {/* Alarms / Messages */}
      {successMsg && (
        <div className="mb-6 p-4 bg-green-50 border border-green-200 text-green-700 rounded-xl flex items-center gap-3 shadow-sm animate-in fade-in">
          <CheckCircle2 className="w-5 h-5 text-green-600 shrink-0" />
          <p className="font-semibold text-sm">{successMsg}</p>
        </div>
      )}

      {errorMsg && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-xl flex items-center gap-3 shadow-sm animate-in fade-in">
          <AlertCircle className="w-5 h-5 text-red-600 shrink-0" />
          <p className="font-semibold text-sm">{errorMsg}</p>
        </div>
      )}

      <div className="bg-white border border-slate-200 rounded-3xl shadow-xl shadow-slate-200/50 overflow-hidden">
        
        {/* TABS HEADER */}
        <div className="flex border-b border-slate-200">
          <button 
            onClick={() => {setActiveTab("NIDA"); setErrorMsg(""); setSuccessMsg("");}}
            className={`flex-1 py-4 flex items-center justify-center gap-2 font-bold text-sm transition-colors ${
              activeTab === "NIDA" 
                ? "bg-indigo-50/50 text-indigo-600 border-b-2 border-indigo-600" 
                : "text-slate-500 hover:text-slate-700 hover:bg-slate-50"
            }`}
          >
            <CreditCard className="w-4 h-4" /> Personal (NIDA)
          </button>
          <button 
            onClick={() => {setActiveTab("BUSINESS"); setErrorMsg(""); setSuccessMsg("");}}
            className={`flex-1 py-4 flex items-center justify-center gap-2 font-bold text-sm transition-colors ${
              activeTab === "BUSINESS" 
                ? "bg-indigo-50/50 text-indigo-600 border-b-2 border-indigo-600" 
                : "text-slate-500 hover:text-slate-700 hover:bg-slate-50"
            }`}
          >
            <Building2 className="w-4 h-4" /> Business / Company
          </button>
        </div>

        {/* TAB CONTENT: NIDA */}
        {activeTab === "NIDA" && (
          <div className="p-6 md:p-8 animate-in slide-in-from-left-2 duration-300">
            <div className="flex items-start gap-3 p-4 bg-blue-50 border border-blue-100 rounded-xl mb-6">
              <Info className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
              <p className="text-sm text-blue-800">
                Personal accounts are suitable for individual merchants. You must provide a valid Tanzanian National ID (NIDA) number and upload a clear photo of your ID card.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">NIDA Number (20 Digits)</label>
                <input 
                  type="text" 
                  maxLength={20}
                  required
                  value={nidaNumber}
                  onChange={(e) => setNidaNumber(e.target.value.replace(/[^0-9]/g, ''))} // Ruhusu namba pekee
                  placeholder="e.g. 19900101123456789012" 
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 text-sm font-semibold tracking-widest" 
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">ID Front Image</label>
                  <div className="border-2 border-dashed border-slate-300 rounded-xl p-6 text-center hover:bg-slate-50 transition cursor-pointer relative group">
                    <input type="file" accept="image/*" required className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" />
                    <UploadCloud className="w-8 h-8 text-slate-400 mx-auto mb-2 group-hover:text-indigo-500 transition-colors" />
                    <span className="text-sm font-medium text-slate-500 group-hover:text-indigo-600">Upload Front Side</span>
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">ID Back Image</label>
                  <div className="border-2 border-dashed border-slate-300 rounded-xl p-6 text-center hover:bg-slate-50 transition cursor-pointer relative group">
                    <input type="file" accept="image/*" required className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" />
                    <UploadCloud className="w-8 h-8 text-slate-400 mx-auto mb-2 group-hover:text-indigo-500 transition-colors" />
                    <span className="text-sm font-medium text-slate-500 group-hover:text-indigo-600">Upload Back Side</span>
                  </div>
                </div>
              </div>

              <button 
                type="submit" 
                disabled={isPending}
                className="w-full py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl shadow-lg shadow-indigo-200 transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isPending ? <><Loader2 className="w-5 h-5 animate-spin" /> Submitting...</> : "Submit Personal KYC"}
              </button>
            </form>
          </div>
        )}

        {/* TAB CONTENT: BUSINESS */}
        {activeTab === "BUSINESS" && (
          <div className="p-6 md:p-8 animate-in slide-in-from-right-2 duration-300">
            <div className="flex items-start gap-3 p-4 bg-indigo-50 border border-indigo-100 rounded-xl mb-6">
              <Building2 className="w-5 h-5 text-indigo-600 shrink-0 mt-0.5" />
              <p className="text-sm text-indigo-800">
                Business verification is for registered companies. You will need your TIN (Tax Identification Number) and a scanned copy of your BRELA Certificate or Business License.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Registered Business Name</label>
                  <input 
                    type="text" 
                    required
                    value={businessName}
                    onChange={(e) => setBusinessName(e.target.value)}
                    placeholder="e.g. PesaShip Solutions Ltd" 
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 text-sm font-semibold" 
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">TIN Number (TRA)</label>
                  <input 
                    type="text" 
                    required
                    value={tinNumber}
                    onChange={(e) => setTinNumber(e.target.value.replace(/[^0-9]/g, ''))} // Ruhusu namba pekee
                    placeholder="e.g. 123456789" 
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 text-sm font-semibold tracking-widest" 
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Business License / BRELA Certificate</label>
                <div className="border-2 border-dashed border-slate-300 rounded-xl p-8 text-center hover:bg-slate-50 transition cursor-pointer relative group">
                  <input type="file" accept="image/*,.pdf" required className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" />
                  <UploadCloud className="w-10 h-10 text-slate-400 mx-auto mb-3 group-hover:text-indigo-500 transition-colors" />
                  <span className="block text-sm font-bold text-slate-600 group-hover:text-indigo-600">Upload Registration Document</span>
                  <span className="block text-xs text-slate-400 mt-1">PDF, JPG, or PNG up to 5MB</span>
                </div>
              </div>

              <button 
                type="submit" 
                disabled={isPending}
                className="w-full py-4 bg-indigo-900 hover:bg-indigo-800 text-white font-bold rounded-xl shadow-lg shadow-slate-300 transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isPending ? <><Loader2 className="w-5 h-5 animate-spin" /> Submitting...</> : "Submit Business KYC"}
              </button>
            </form>
          </div>
        )}

      </div>
    </div>
  );
}