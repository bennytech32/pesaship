import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Scale, Shield, FileText, AlertCircle } from 'lucide-react';

export default function LegalPage() {
  const lastUpdated = "July 1, 2026"; // Unaweza kubadilisha tarehe hapa

  return (
    <div className="min-h-screen bg-slate-50 pb-20 font-sans text-slate-800">
      {/* Navigation */}
      <nav className="bg-white border-b border-slate-200 px-6 py-4 sticky top-0 z-10">
        <div className="max-w-4xl mx-auto flex items-center gap-4">
          <Link href="/" className="p-2 hover:bg-slate-100 rounded-full transition">
            <ArrowLeft className="w-5 h-5 text-slate-600" />
          </Link>
          <div className="font-bold text-lg text-slate-900">
            PesaShip Legal Center
          </div>
        </div>
      </nav>

      <main className="max-w-4xl mx-auto px-6 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-black text-slate-900 mb-4">Legal & Compliance</h1>
          <p className="text-slate-500 font-medium">
            Everything you need to know about how we protect you, your data, and your money.
          </p>
          <p className="text-sm text-slate-400 mt-2">Last Updated: {lastUpdated}</p>
        </div>

        {/* Quick Links / Table of Contents */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm mb-12 grid grid-cols-1 md:grid-cols-4 gap-4">
          <a href="#terms" className="flex flex-col items-center justify-center p-4 rounded-2xl hover:bg-slate-50 transition text-center group">
            <FileText className="w-8 h-8 text-blue-500 mb-2 group-hover:scale-110 transition-transform" />
            <span className="font-bold text-sm text-slate-700">Terms of Service</span>
          </a>
          <a href="#privacy" className="flex flex-col items-center justify-center p-4 rounded-2xl hover:bg-slate-50 transition text-center group">
            <Shield className="w-8 h-8 text-green-500 mb-2 group-hover:scale-110 transition-transform" />
            <span className="font-bold text-sm text-slate-700">Privacy Policy</span>
          </a>
          <a href="#escrow" className="flex flex-col items-center justify-center p-4 rounded-2xl hover:bg-slate-50 transition text-center group">
            <Scale className="w-8 h-8 text-amber-500 mb-2 group-hover:scale-110 transition-transform" />
            <span className="font-bold text-sm text-slate-700">Escrow Agreement</span>
          </a>
          <a href="#dispute" className="flex flex-col items-center justify-center p-4 rounded-2xl hover:bg-slate-50 transition text-center group">
            <AlertCircle className="w-8 h-8 text-red-500 mb-2 group-hover:scale-110 transition-transform" />
            <span className="font-bold text-sm text-slate-700">Dispute Resolution</span>
          </a>
        </div>

        {/* Legal Document Content */}
        <div className="bg-white rounded-[2.5rem] p-8 md:p-12 border border-slate-200 shadow-sm space-y-16">
          
          {/* 1. TERMS OF SERVICE */}
          <section id="terms" className="scroll-mt-24">
            <h2 className="text-2xl font-black text-slate-900 mb-6 flex items-center gap-3">
              <FileText className="w-6 h-6 text-blue-500" /> 1. Terms of Service
            </h2>
            <div className="space-y-4 text-slate-600 leading-relaxed">
              <p>
                Welcome to PesaShip. By accessing or using our website, platform, and services (collectively, the "Services"), you agree to comply with and be bound by these Terms of Service. If you do not agree to these terms, please do not use our Services.
              </p>
              <h3 className="text-lg font-bold text-slate-800 mt-4">1.1 Eligibility and Account Registration</h3>
              <p>
                You must be at least 18 years old to use our Services. To access certain features, you must register for an account. You agree to provide accurate, current, and complete information during the registration process, including valid identification (e.g., NIDA number) where required for regulatory compliance.
              </p>
              <h3 className="text-lg font-bold text-slate-800 mt-4">1.2 Acceptable Use</h3>
              <p>
                You agree not to use PesaShip for any unlawful activities, including but not limited to fraud, money laundering, funding of terrorism, or the sale of illegal goods and services. We reserve the right to suspend or terminate accounts suspected of engaging in prohibited activities and to report such actions to relevant authorities.
              </p>
              <h3 className="text-lg font-bold text-slate-800 mt-4">1.3 Modifications to the Service</h3>
              <p>
                We reserve the right to modify, suspend, or discontinue any part of the Services at any time, with or without notice. We shall not be liable to you or any third party for any modification or discontinuation of the Service.
              </p>
            </div>
          </section>

          <hr className="border-slate-100" />

          {/* 2. PRIVACY POLICY */}
          <section id="privacy" className="scroll-mt-24">
            <h2 className="text-2xl font-black text-slate-900 mb-6 flex items-center gap-3">
              <Shield className="w-6 h-6 text-green-500" /> 2. Privacy Policy
            </h2>
            <div className="space-y-4 text-slate-600 leading-relaxed">
              <p>
                Your privacy is critically important to us. This Privacy Policy explains how PesaShip collects, uses, and protects your personal information.
              </p>
              <h3 className="text-lg font-bold text-slate-800 mt-4">2.1 Information We Collect</h3>
              <p>
                We collect information you provide directly to us, including your name, email address, phone number, physical address, and government-issued identification numbers (such as NIDA) for Know Your Customer (KYC) and Anti-Money Laundering (AML) compliance. We also collect transaction data related to your use of our escrow services.
              </p>
              <h3 className="text-lg font-bold text-slate-800 mt-4">2.2 How We Use Your Information</h3>
              <p>
                We use your data to provide, maintain, and improve our Services; to process transactions and send related notifications; to verify your identity; and to prevent fraudulent or illegal activity.
              </p>
              <h3 className="text-lg font-bold text-slate-800 mt-4">2.3 Data Security</h3>
              <p>
                We implement industry-standard security measures, including encryption and secure server hosting, to protect your personal information. However, no electronic transmission over the internet or information storage technology can be guaranteed to be 100% secure.
              </p>
            </div>
          </section>

          <hr className="border-slate-100" />

          {/* 3. ESCROW AGREEMENT */}
          <section id="escrow" className="scroll-mt-24">
            <h2 className="text-2xl font-black text-slate-900 mb-6 flex items-center gap-3">
              <Scale className="w-6 h-6 text-amber-500" /> 3. Escrow Agreement
            </h2>
            <div className="space-y-4 text-slate-600 leading-relaxed">
              <p>
                This Escrow Agreement governs the specific transaction between a Buyer, a Seller, and PesaShip acting as the neutral escrow agent.
              </p>
              <h3 className="text-lg font-bold text-slate-800 mt-4">3.1 Role of PesaShip</h3>
              <p>
                PesaShip acts as a trusted third party. We hold funds deposited by the Buyer securely in an escrow account until the transaction is completed. PesaShip does not own the funds, nor do we act as a buyer or seller in the underlying transaction.
              </p>
              <h3 className="text-lg font-bold text-slate-800 mt-4">3.2 Release of Funds</h3>
              <p>
                Funds will only be released to the Seller when the Buyer confirms receipt and acceptance of the agreed goods or services. If the Buyer does not explicitly accept or reject the delivery within a predefined inspection period, PesaShip reserves the right to auto-release the funds to the Seller based on proof of delivery.
              </p>
              <h3 className="text-lg font-bold text-slate-800 mt-4">3.3 Fees</h3>
              <p>
                PesaShip charges a non-refundable escrow fee (e.g., 2.5% of the transaction value) for providing the secure holding service. This fee is clearly displayed prior to the creation of the escrow transaction and is deducted automatically.
              </p>
            </div>
          </section>

          <hr className="border-slate-100" />

          {/* 4. DISPUTE RESOLUTION */}
          <section id="dispute" className="scroll-mt-24">
            <h2 className="text-2xl font-black text-slate-900 mb-6 flex items-center gap-3">
              <AlertCircle className="w-6 h-6 text-red-500" /> 4. Dispute Resolution
            </h2>
            <div className="space-y-4 text-slate-600 leading-relaxed">
              <p>
                In the event that a Buyer and Seller cannot agree on the outcome of a transaction, the following dispute resolution process applies.
              </p>
              <h3 className="text-lg font-bold text-slate-800 mt-4">4.1 Initiating a Dispute</h3>
              <p>
                If a Buyer rejects a delivery, or a Seller claims a Buyer is unjustly withholding approval, either party may click the "Dispute" button within the transaction dashboard. The funds will remain securely locked in escrow.
              </p>
              <h3 className="text-lg font-bold text-slate-800 mt-4">4.2 Negotiation & Evidence</h3>
              <p>
                Upon initiation of a dispute, PesaShip requires both parties to submit evidence (e.g., photos, tracking numbers, chat logs) within 48 hours. PesaShip encourages parties to reach an amicable resolution during this period.
              </p>
              <h3 className="text-lg font-bold text-slate-800 mt-4">4.3 Binding Arbitration by PesaShip</h3>
              <p>
                If the parties cannot resolve the issue, a PesaShip Administrator will review the evidence provided. The Administrator will make a final, binding decision to either refund the Buyer, release the funds to the Seller, or split the funds. By using our Services, you agree that PesaShip's decision in any dispute is final and legally binding.
              </p>
            </div>
          </section>

        </div>

        {/* Footer Contact */}
        <div className="mt-12 text-center text-slate-500 text-sm">
          <p>If you have any questions regarding our Legal Policies, please contact us at <a href="mailto:legal@pesaship.com" className="text-blue-600 font-bold hover:underline">legal@pesaship.com</a></p>
        </div>
      </main>
    </div>
  );
}