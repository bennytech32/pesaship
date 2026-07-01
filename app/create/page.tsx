"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import { createTransaction } from "@/app/actions/createTransaction";
import { 
  ShieldCheck, 
  ArrowLeft, 
  DollarSign, 
  Mail, 
  FileText, 
  Loader2, 
  CheckCircle, 
  Copy,
  ArrowRight,
  Scale,
  CheckSquare,
  Package,
  Clock,
  ImagePlus,
  X,
  Truck
} from "lucide-react";

export default function CreateTransactionPage() {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState("");
  const [successData, setSuccessData] = useState<{ id: string; msg: string } | null>(null);
  const [copied, setCopied] = useState(false);

  // Hatua za fomu (1: Jaza Taarifa, 2: Soma Mkataba/Preview, 3: Success)
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [agreed, setAgreed] = useState(false);

  // Form States
  const [itemName, setItemName] = useState("");
  const [condition, setCondition] = useState("New");
  const [quantity, setQuantity] = useState("1");
  const [itemPrice, setItemPrice] = useState("");
  const [description, setDescription] = useState("");
  const [buyerEmail, setBuyerEmail] = useState("");
  
  // Shipping States Mpya
  const [shippingType, setShippingType] = useState("Standard");
  const [shippingCost, setShippingCost] = useState("0");
  const [shippingDeadline, setShippingDeadline] = useState("3");
  const [inspectionPeriod, setInspectionPeriod] = useState("2");

  // Local Image State
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  // Hesabu (Calculations)
  const parsedPrice = parseFloat(itemPrice) || 0;
  const parsedQty = parseInt(quantity) || 1;
  const parsedShipping = parseFloat(shippingCost) || 0;
  
  const subTotal = parsedPrice * parsedQty;
  const totalAmount = subTotal + parsedShipping;
  const escrowFee = totalAmount * 0.025; // 2.5% PesaShip Fee
  const sellerReceives = totalAmount - escrowFee;

  // Image Handler (Local Preview)
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);
    }
  };

  const removeImage = () => {
    setImagePreview(null);
  };

  // Anapobonyeza Next kwenda kwenye Mkataba (Preview)
  const handleProceedToContract = (e: React.FormEvent) => {
    e.preventDefault();
    if (totalAmount < 1000) {
      setError("Total transaction amount must be at least TZS 1,000.");
      return;
    }
    setError("");
    setStep(2); // Mpeleke kwenye mkataba
  };

  // Anapokubali Mkataba na Kutengeneza Link
  const handleAcceptAndGenerate = async () => {
    if (!agreed) return;
    setError("");

    // Tunachanganya taarifa zote pamoja na aina ya Shipping ili zihifadhiwe
    const comprehensiveDescription = `
      Item: ${itemName} (${condition}) x${quantity} | 
      Shipping: ${shippingType} (TZS ${parsedShipping.toLocaleString()}) | 
      Shipping Deadline: ${shippingDeadline} days | 
      Inspection: ${inspectionPeriod} days | 
      Details: ${description}
    `.trim();

    const formData = new FormData();
    formData.append("amount", totalAmount.toString());
    formData.append("description", comprehensiveDescription);
    if (buyerEmail) formData.append("buyerEmail", buyerEmail);
    // (Kama API yako inapokea file, unaweza ku-append image file hapa)

    startTransition(async () => {
      const result = await createTransaction(formData);
      
      if (!result.success) {
        setError(result.error || "Failed to create transaction.");
        setStep(1);
      } else {
        setSuccessData({
          id: result.transactionId || "",
          msg: result.message || "Contract secured and link generated!"
        });
        setStep(3);
      }
    });
  };

  const copyToClipboard = () => {
    if (!successData) return;
    const link = `${window.location.origin}/tx/${successData.id}`;
    navigator.clipboard.writeText(link);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans flex flex-col justify-between selection:bg-indigo-100">
      
      {/* Top Header */}
      <header className="bg-white border-b border-slate-200 px-6 py-4">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <Link href="/dashboard" className="flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-slate-900 transition">
            <ArrowLeft className="w-4 h-4" /> Back to Dashboard
          </Link>
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-indigo-600" />
            <span className="text-xs font-bold tracking-wider text-slate-400 uppercase">PesaShip Escrow</span>
          </div>
        </div>
      </header>

      <main className="flex-grow flex items-center justify-center p-6">
        <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          
          <div className="lg:col-span-2 bg-white border border-slate-200 rounded-3xl p-6 md:p-8 shadow-xl shadow-slate-200/50 relative overflow-hidden">
            
            {/* ==========================================
                STEP 1: TRANSACTION DETAILS FORM
                ========================================== */}
            {step === 1 && (
              <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="mb-6 border-b border-slate-100 pb-4">
                  <h1 className="text-2xl font-black tracking-tight text-slate-900">Define Transaction Terms</h1>
                  <p className="text-sm text-slate-500 mt-1">Provide exact details to generate the smart contract.</p>
                </div>

                {error && <div className="mb-6 p-4 bg-red-50 text-red-600 text-sm rounded-xl font-medium border border-red-100">{error}</div>}

                <form onSubmit={handleProceedToContract} className="space-y-6">
                  
                  {/* Product Info & Image Upload */}
                  <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 space-y-4">
                    <div className="flex justify-between items-center">
                      <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2"><Package className="w-4 h-4"/> Product Details</h3>
                    </div>
                    
                    {/* Image Upload Area */}
                    <div className="mb-4">
                      <label className="block text-xs font-bold text-slate-700 mb-1.5">Product Image (Optional)</label>
                      {imagePreview ? (
                        <div className="relative w-32 h-32 rounded-xl overflow-hidden border border-slate-200 shadow-sm group">
                          <img src={imagePreview} alt="Product Preview" className="w-full h-full object-cover" />
                          <button type="button" onClick={removeImage} className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity">
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      ) : (
                        <div className="relative w-full border-2 border-dashed border-slate-300 rounded-xl p-6 text-center hover:bg-slate-100 transition cursor-pointer">
                          <input type="file" accept="image/*" onChange={handleImageChange} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
                          <ImagePlus className="w-8 h-8 text-slate-400 mx-auto mb-2" />
                          <span className="text-sm font-medium text-slate-500">Tap or drag to upload product image</span>
                        </div>
                      )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1.5">Item Name</label>
                        <input type="text" required value={itemName} onChange={(e) => setItemName(e.target.value)} placeholder="e.g. MacBook Pro M2" className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500/20 text-sm" />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1.5">Condition</label>
                        <select value={condition} onChange={(e) => setCondition(e.target.value)} className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500/20 text-sm">
                          <option value="New">New</option>
                          <option value="Used">Used</option>
                          <option value="Refurbished">Refurbished</option>
                          <option value="Digital Good">Digital Good</option>
                        </select>
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1.5">Item Description & Flaws</label>
                      <textarea required value={description} onChange={(e) => setDescription(e.target.value)} rows={2} placeholder="Describe the item accurately..." className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500/20 text-sm" />
                    </div>
                  </div>

                  {/* Financial Breakdown */}
                  <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 space-y-4">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2"><DollarSign className="w-4 h-4"/> Financials</h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1.5">Price Per Item (TZS)</label>
                        <input type="number" required min="1000" value={itemPrice} onChange={(e) => setItemPrice(e.target.value)} placeholder="0" className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm font-bold" />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1.5">Quantity</label>
                        <input type="number" required min="1" value={quantity} onChange={(e) => setQuantity(e.target.value)} className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm font-bold" />
                      </div>
                    </div>
                  </div>

                  {/* Shipping & Timelines */}
                  <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 space-y-4">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2"><Truck className="w-4 h-4"/> Shipping & Timelines</h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-2">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1.5">Shipping Method</label>
                        <select value={shippingType} onChange={(e) => setShippingType(e.target.value)} className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500/20 text-sm font-semibold">
                          <option value="Standard">Standard (Self-Negotiated)</option>
                          <option value="Premium">Premium (PesaShip Handles Logistics)</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1.5">Shipping Cost (TZS)</label>
                        <input type="number" required min="0" value={shippingCost} onChange={(e) => setShippingCost(e.target.value)} placeholder="0" className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm font-bold" />
                      </div>
                    </div>

                    {shippingType === "Premium" && (
                      <div className="p-3 bg-indigo-50 border border-indigo-100 rounded-xl flex items-start gap-2">
                        <ShieldCheck className="w-5 h-5 text-indigo-600 shrink-0" />
                        <p className="text-xs text-indigo-800 font-medium">With Premium, PesaShip will handle pickup, tracking, and secure delivery to the buyer. Additional logistics fees may apply.</p>
                      </div>
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1.5">Shipping Deadline (Days)</label>
                        <input type="number" required min="1" max="30" value={shippingDeadline} onChange={(e) => setShippingDeadline(e.target.value)} className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm" />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1.5">Inspection Period (Days)</label>
                        <input type="number" required min="1" max="14" value={inspectionPeriod} onChange={(e) => setInspectionPeriod(e.target.value)} className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm" />
                      </div>
                    </div>
                  </div>

                  <button type="submit" className="w-full py-4 px-4 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg shadow-slate-200">
                    Preview Smart Contract <ArrowRight className="w-4 h-4" />
                  </button>
                </form>
              </div>
            )}

            {/* ==========================================
                STEP 2: SMART CONTRACT PREVIEW
                ========================================== */}
            {step === 2 && (
              <div className="animate-in fade-in slide-in-from-right-8 duration-500 flex flex-col h-[70vh] lg:h-auto">
                <div className="flex items-center justify-between mb-6 border-b border-slate-100 pb-4 shrink-0">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 bg-indigo-50 text-indigo-600 rounded-xl border border-indigo-100">
                      <Scale className="w-6 h-6" />
                    </div>
                    <div>
                      <h1 className="text-xl font-black text-slate-900">Escrow Transaction Contract</h1>
                      <p className="text-xs text-slate-500 font-mono mt-1">Review binding terms before generating link.</p>
                    </div>
                  </div>
                  {/* Picha kwenye preview kama ipo */}
                  {imagePreview && (
                    <img src={imagePreview} alt="Item" className="w-14 h-14 object-cover rounded-lg border border-slate-200 shadow-sm" />
                  )}
                </div>

                <div className="flex-grow overflow-y-auto pr-3 mb-6 space-y-6 text-sm text-slate-700 font-medium leading-relaxed custom-scrollbar bg-white">
                  
                  {/* Part 1 */}
                  <div>
                    <h3 className="font-bold text-slate-900 mb-2 uppercase text-[11px] tracking-widest bg-slate-100 p-2 rounded">1. Product Details & Financial Breakdown</h3>
                    <div className="grid grid-cols-2 gap-y-2 text-xs px-2">
                      <div className="text-slate-500">Item Name:</div> <div className="font-semibold text-slate-900">{itemName || "-"}</div>
                      <div className="text-slate-500">Condition:</div> <div className="font-semibold text-slate-900">{condition}</div>
                      <div className="text-slate-500">Quantity:</div> <div className="font-semibold text-slate-900">{quantity}</div>
                      <div className="col-span-2 border-t border-dashed border-slate-200 my-1"></div>
                      <div className="text-slate-500">Item Total:</div> <div className="font-semibold text-slate-900">TZS {subTotal.toLocaleString()}</div>
                      <div className="text-slate-500">Shipping Mode:</div> <div className={`font-semibold ${shippingType === 'Premium' ? 'text-indigo-600' : 'text-slate-900'}`}>{shippingType}</div>
                      <div className="text-slate-500">Shipping Cost:</div> <div className="font-semibold text-slate-900">TZS {parsedShipping.toLocaleString()}</div>
                      <div className="text-slate-500">Escrow Fee:</div> <div className="font-semibold text-indigo-600">TZS {escrowFee.toLocaleString()}</div>
                      <div className="text-slate-900 font-bold">Total Deposit:</div> <div className="font-bold text-slate-900 text-sm bg-yellow-100 inline-block px-1 rounded">TZS {totalAmount.toLocaleString()}</div>
                    </div>
                  </div>

                  {/* Part 2 */}
                  <div>
                     <h3 className="font-bold text-slate-900 mb-2 uppercase text-[11px] tracking-widest bg-slate-100 p-2 rounded">2. Transaction Timeline & Triggers</h3>
                     <ul className="list-disc pl-5 space-y-2 text-xs px-2">
                       <li><strong>Shipping Deadline:</strong> Seller must ship the item and provide tracking within <strong>{shippingDeadline} days</strong> of deposit confirmation.</li>
                       <li><strong>Inspection Period:</strong> Buyer has <strong>{inspectionPeriod} days</strong> to inspect the item upon confirmed delivery.</li>
                       <li><strong>Release of Funds:</strong> PesaShip releases funds when Buyer accepts the item, or the Inspection Period expires without dispute.</li>
                     </ul>
                  </div>

                  {/* Part 3 */}
                  <div>
                    <h3 className="font-bold text-slate-900 mb-2 uppercase text-[11px] tracking-widest bg-slate-100 p-2 rounded">3. Terms of Service</h3>
                    <div className="space-y-3 text-xs px-2">
                      <p><strong>Seller:</strong> Accurately represent items. Fulfill orders timely. Bear risk of loss during transit unless Premium shipping is selected.</p>
                      <p><strong>Buyer:</strong> Inspect goods promptly. Remorse is not a valid ground for rejection. Responsible for return shipping if applicable.</p>
                    </div>
                  </div>

                </div>

                {/* Agreement Checkbox */}
                <div className="pt-4 border-t border-slate-200 shrink-0 bg-white">
                  <label className="flex items-start gap-3 cursor-pointer group mb-4 p-3 bg-slate-50 rounded-xl border border-slate-200 hover:border-indigo-300 transition">
                    <div className="relative flex items-center justify-center mt-0.5 shrink-0">
                      <input 
                        type="checkbox" 
                        checked={agreed}
                        onChange={(e) => setAgreed(e.target.checked)}
                        className="peer w-5 h-5 appearance-none border-2 border-slate-300 rounded hover:border-indigo-500 checked:bg-indigo-600 checked:border-indigo-600 transition-colors cursor-pointer"
                      />
                      <CheckSquare className="absolute w-3.5 h-3.5 text-white opacity-0 peer-checked:opacity-100 pointer-events-none" />
                    </div>
                    <span className="text-sm text-slate-700 font-bold group-hover:text-slate-900 transition">
                      I have reviewed the terms above and agree to bind this transaction under the PesaShip Digital Escrow Agreement.
                    </span>
                  </label>

                  <div className="flex gap-3">
                    <button 
                      onClick={() => setStep(1)}
                      disabled={isPending}
                      className="px-6 py-3.5 bg-white border-2 border-slate-200 hover:bg-slate-50 text-slate-700 font-bold rounded-xl transition-all"
                    >
                      Edit Details
                    </button>
                    <button 
                      onClick={handleAcceptAndGenerate}
                      disabled={!agreed || isPending}
                      className="flex-1 py-3.5 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl shadow-lg shadow-indigo-200 transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isPending ? <><Loader2 className="w-5 h-5 animate-spin" /> Securing Contract...</> : "Accept & Generate Link"}
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* ==========================================
                STEP 3: SUCCESS STATE
                ========================================== */}
            {step === 3 && successData && (
              <div className="text-center py-10 animate-in zoom-in-95 duration-500">
                <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-5 border border-green-200 shadow-sm shadow-green-100">
                  <Scale className="w-10 h-10 text-green-600 absolute opacity-20" />
                  <CheckCircle className="w-10 h-10 text-green-600 relative z-10" />
                </div>
                <h2 className="text-3xl font-black text-slate-900">Contract Executed!</h2>
                <p className="text-slate-500 text-sm mt-2 px-4 max-w-sm mx-auto">Your smart contract is securely logged. Copy the link below and send it to your buyer.</p>
                
                <div className="mt-8 bg-slate-50 border-2 border-dashed border-slate-300 p-2 rounded-2xl flex items-center justify-between gap-3 max-w-md mx-auto">
                  <span className="text-sm font-mono text-slate-700 truncate select-all pl-3">
                    {typeof window !== "undefined" && `${window.location.origin}/tx/${successData.id}`}
                  </span>
                  <button 
                    onClick={copyToClipboard}
                    className={`px-5 py-3 rounded-xl text-sm font-bold transition-all flex items-center gap-2 shrink-0 shadow-sm ${
                      copied ? "bg-green-600 text-white" : "bg-indigo-600 hover:bg-indigo-700 text-white"
                    }`}
                  >
                    <Copy className="w-4 h-4" />
                    {copied ? "Copied!" : "Copy Link"}
                  </button>
                </div>

                <div className="mt-10 pt-6 border-t border-slate-100">
                  <button 
                    onClick={() => { setStep(1); setAgreed(false); setItemName(""); setDescription(""); setItemPrice(""); setShippingCost("0"); setImagePreview(null); }}
                    className="text-sm font-semibold text-slate-500 hover:text-indigo-600 transition"
                  >
                    Create another escrow contract
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Right Column: Live Pricing Sidebar */}
          <div className="lg:col-span-1 bg-slate-900 text-white rounded-3xl p-6 shadow-xl sticky top-28">
            <h3 className="font-bold text-lg mb-6 text-slate-100 flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-indigo-400" /> Payment Summary
            </h3>
            
            <div className="space-y-4">
              <div className="flex justify-between items-center text-sm">
                <span className="text-slate-400">Item(s) Subtotal</span>
                <span className="font-medium">TZS {subTotal.toLocaleString()}</span>
              </div>
              
              <div className="flex justify-between items-center text-sm">
                <span className="text-slate-400">Shipping ({shippingType})</span>
                <span className="font-medium">TZS {parsedShipping.toLocaleString()}</span>
              </div>
              
              <hr className="border-slate-800 my-2" />

              <div className="flex justify-between items-center text-sm">
                <span className="text-slate-300 font-bold">Total Deposit</span>
                <span className="font-bold text-white bg-slate-800 px-2 py-1 rounded">TZS {totalAmount.toLocaleString()}</span>
              </div>

              <div className="flex justify-between items-center text-sm pt-2">
                <span className="text-slate-400 flex items-center gap-1">
                  Escrow Fee <span className="bg-indigo-500/20 text-[10px] px-1.5 py-0.5 rounded text-indigo-300 font-bold border border-indigo-500/30">2.5%</span>
                </span>
                <span className="font-bold text-yellow-400">- TZS {escrowFee.toLocaleString()}</span>
              </div>
              
              <div className="pt-4 mt-2 border-t border-slate-800">
                <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mb-1">Seller Payout</p>
                <p className="text-3xl font-black text-green-400 tracking-tight">
                  TZS {sellerReceives.toLocaleString()}
                </p>
              </div>
            </div>
          </div>

        </div>
      </main>

      <style dangerouslySetInnerHTML={{__html: `
        .custom-scrollbar::-webkit-scrollbar { width: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: #f8fafc; border-radius: 8px; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 8px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #94a3b8; }
      `}} />
    </div>
  );
}