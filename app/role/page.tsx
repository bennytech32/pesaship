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
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4 sm:p-6 text-slate-900 font-sans selection:bg-blue-100 relative">
      
      {/* Kitufe cha Lugha (Language Toggle) - Mobile Adjusted */}
      <div className="absolute top-4 right-4 sm:top-6 sm:right-6 z-10">
        <button 
          onClick={toggleLanguage}
          className="flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 bg-white border border-slate-200 rounded-full text-xs sm:text-sm font-medium text-slate-600 hover:text-blue-600 hover:border-blue-200 hover:bg-blue-50 transition-all shadow-sm"
        >
          <Globe className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          {t.langSwitch}
        </button>
      </div>

      <div className="max-w-3xl w-full mt-12 sm:mt-0">
        {/* Kichwa (Header) */}
        <div className="text-center mb-8 sm:mb-12">
          <div className="inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 bg-blue-600 rounded-2xl mb-4 sm:mb-6 shadow-lg shadow-blue-200">
            <ShieldCheck className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight mb-3 sm:mb-4 text-slate-900 px-2">
            {t.title}
          </h1>
          <p className="text-slate-500 text-sm sm:text-lg max-w-xl mx-auto leading-relaxed px-4 sm:px-0">
            {t.subtitle}
          </p>
        </div>

        {/* Kadi za Kuchagua (Role Cards) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mb-8 sm:mb-12">
          
          {/* Mnunuzi (Buyer Card) */}
          <Link href="/register?role=BUYER" className="group">
            <div className="h-full bg-white border border-slate-200 hover:border-blue-500 rounded-2xl sm:rounded-3xl p-6 sm:p-8 flex flex-col transition-all duration-300 hover:shadow-xl hover:shadow-blue-900/5 relative overflow-hidden">
              <div className="bg-blue-50 w-12 h-12 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl flex items-center justify-center mb-4 sm:mb-6 group-hover:scale-110 transition-transform">
                <User className="w-6 h-6 sm:w-8 sm:h-8 text-blue-600" />
              </div>
              <h2 className="text-xl sm:text-2xl font-bold mb-2 sm:mb-3 text-slate-900">{t.buyerTitle}</h2>
              <p className="text-sm sm:text-base text-slate-500 leading-relaxed flex-grow">
                {t.buyerDesc}
              </p>
              <div className="mt-6 sm:mt-8 flex items-center text-blue-600 font-semibold group-hover:translate-x-2 transition-transform text-sm sm:text-base">
                Continue as Buyer <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 ml-2" />
              </div>
            </div>
          </Link>

          {/* Muuzaji (Seller Card) */}
          <Link href="/register?role=SELLER" className="group">
            <div className="h-full bg-white border border-slate-200 hover:border-indigo-500 rounded-2xl sm:rounded-3xl p-6 sm:p-8 flex flex-col transition-all duration-300 hover:shadow-xl hover:shadow-indigo-900/5 relative overflow-hidden">
              <div className="bg-indigo-50 w-12 h-12 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl flex items-center justify-center mb-4 sm:mb-6 group-hover:scale-110 transition-transform">
                <ShoppingBag className="w-6 h-6 sm:w-8 sm:h-8 text-indigo-600" />
              </div>
              <h2 className="text-xl sm:text-2xl font-bold mb-2 sm:mb-3 text-slate-900">{t.sellerTitle}</h2>
              <p className="text-sm sm:text-base text-slate-500 leading-relaxed flex-grow">
                {t.sellerDesc}
              </p>
              <div className="mt-6 sm:mt-8 flex items-center text-indigo-600 font-semibold group-hover:translate-x-2 transition-transform text-sm sm:text-base">
                Continue as Seller <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 ml-2" />
              </div>
            </div>
          </Link>

        </div>

        {/* Sehemu ya Login chini */}
        <div className="text-center border-t border-slate-200 pt-6 sm:pt-8 pb-4">
          <p className="text-sm sm:text-base text-slate-500 font-medium">
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