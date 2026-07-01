"use client";

import { useState } from "react";
import Link from "next/link";
import { User, ShoppingBag, Globe, ShieldCheck, ArrowRight } from "lucide-react";

// Mfumo wa Lugha (Dictionary)
const translations = {
  en: {
    title: "Choose Your Role",
    subtitle: "To ensure a secure and seamless transaction, please tell us how you are participating in this deal.",
    buyerTitle: "I am a Buyer",
    buyerDesc: "I want to pay securely and ensure my funds are protected in the escrow vault until I receive my item.",
    sellerTitle: "I am a Seller",
    sellerDesc: "I want to sell with confidence, knowing the funds are securely held before I ship the product.",
    loginPrompt: "Already have an account?",
    loginLink: "Log in here",
    langSwitch: "Kiswahili",
  },
  sw: {
    title: "Chagua Jukumu Lako",
    subtitle: "Ili kuhakikisha usalama wa muamala wako, tafadhali tuambie wewe ni nani katika biashara hii.",
    buyerTitle: "Mimi ni Mnunuzi",
    buyerDesc: "Nataka kulipia kwa usalama na kuhakikisha pesa yangu inalindwa hadi nipokee mzigo wangu.",
    sellerTitle: "Mimi ni Muuzaji",
    sellerDesc: "Nataka kuuza kwa ujasiri, nikijua pesa imehifadhiwa salama kabla sijatuma mzigo.",
    loginPrompt: "Tayari una akaunti?",
    loginLink: "Ingia hapa",
    langSwitch: "English",
  }
};

export default function RoleSelectionPage() {
  // Lugha ya kuanzia ni Kiingereza ('en')
  const [lang, setLang] = useState<"en" | "sw">("en");
  const t = translations[lang];

  const toggleLanguage = () => {
    setLang(lang === "en" ? "sw" : "en");
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6 text-slate-900 font-sans selection:bg-blue-100">
      
      {/* Kitufe cha Lugha (Language Toggle) */}
      <div className="absolute top-6 right-6">
        <button 
          onClick={toggleLanguage}
          className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-full text-sm font-medium text-slate-600 hover:text-blue-600 hover:border-blue-200 hover:bg-blue-50 transition-all shadow-sm"
        >
          <Globe className="w-4 h-4" />
          {t.langSwitch}
        </button>
      </div>

      <div className="max-w-3xl w-full">
        {/* Kichwa (Header) */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-2xl mb-6 shadow-lg shadow-blue-200">
            <ShieldCheck className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-4 text-slate-900">
            {t.title}
          </h1>
          <p className="text-slate-500 text-lg max-w-xl mx-auto leading-relaxed">
            {t.subtitle}
          </p>
        </div>

        {/* Kadi za Kuchagua (Role Cards) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          
          {/* Mnunuzi (Buyer Card) */}
          <Link href="/register?role=BUYER" className="group">
            <div className="h-full bg-white border border-slate-200 hover:border-blue-500 rounded-3xl p-8 flex flex-col transition-all duration-300 hover:shadow-xl hover:shadow-blue-900/5 relative overflow-hidden">
              <div className="bg-blue-50 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <User className="w-8 h-8 text-blue-600" />
              </div>
              <h2 className="text-2xl font-bold mb-3 text-slate-900">{t.buyerTitle}</h2>
              <p className="text-slate-500 leading-relaxed flex-grow">
                {t.buyerDesc}
              </p>
              <div className="mt-8 flex items-center text-blue-600 font-semibold group-hover:translate-x-2 transition-transform">
                Continue as Buyer <ArrowRight className="w-5 h-5 ml-2" />
              </div>
            </div>
          </Link>

          {/* Muuzaji (Seller Card) */}
          <Link href="/register?role=SELLER" className="group">
            <div className="h-full bg-white border border-slate-200 hover:border-indigo-500 rounded-3xl p-8 flex flex-col transition-all duration-300 hover:shadow-xl hover:shadow-indigo-900/5 relative overflow-hidden">
              <div className="bg-indigo-50 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <ShoppingBag className="w-8 h-8 text-indigo-600" />
              </div>
              <h2 className="text-2xl font-bold mb-3 text-slate-900">{t.sellerTitle}</h2>
              <p className="text-slate-500 leading-relaxed flex-grow">
                {t.sellerDesc}
              </p>
              <div className="mt-8 flex items-center text-indigo-600 font-semibold group-hover:translate-x-2 transition-transform">
                Continue as Seller <ArrowRight className="w-5 h-5 ml-2" />
              </div>
            </div>
          </Link>

        </div>

        {/* Sehemu ya Login chini */}
        <div className="text-center border-t border-slate-200 pt-8">
          <p className="text-slate-500 font-medium">
            {t.loginPrompt}{" "}
            <Link href="/login" className="text-blue-600 hover:text-blue-700 hover:underline font-bold transition">
              {t.loginLink}
            </Link>
          </p>
        </div>
      </div>
      
    </div>
  );
}