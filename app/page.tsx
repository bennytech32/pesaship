import Link from 'next/link';
import { ShieldCheck, Lock, Truck, CheckCircle, ArrowRight, Menu, Bell, Smartphone, MapPin, Mail, Phone, HelpCircle, Quote } from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white font-sans text-slate-900 selection:bg-blue-100">
      
      {/* --- 1. Clean Navigation --- */}
      <nav className="fixed w-full bg-white/90 backdrop-blur-sm border-b border-slate-100 z-50">
        <div className="max-w-7xl mx-auto px-6 h-20 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="bg-blue-600 p-1.5 rounded-lg">
              <ShieldCheck className="w-6 h-6 text-white" />
            </div>
            <div className="text-2xl font-bold tracking-tight text-slate-900">
              Pesa<span className="text-blue-600">Ship</span>
            </div>
          </div>
          
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
            <a href="#how-it-works" className="hover:text-blue-600 transition">How it Works</a>
            <a href="#testimonials" className="hover:text-blue-600 transition">Reviews</a>
            <Link href="/login" className="hover:text-blue-600 transition font-bold">Log In</Link>
            <Link href="/login" className="bg-slate-900 text-white px-6 py-2.5 rounded-full hover:bg-slate-800 transition font-semibold shadow-md">
              Start Transaction
            </Link>
          </div>
        </div>
      </nav>

      {/* --- 2. Hero Section --- */}
      <header className="pt-32 pb-24 px-6 bg-gradient-to-b from-blue-50/60 to-white overflow-hidden">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
          
          {/* Left: Copy */}
          <div className="text-center lg:text-left">
            <div className="inline-flex items-center gap-2 bg-white border border-slate-200 text-slate-600 px-4 py-1.5 rounded-full text-sm font-semibold mb-8 shadow-sm">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
              </span>
              PesaShip Live: Trusted by 12,000+ Tanzanians
            </div>
            
            <h1 className="text-5xl md:text-7xl font-extrabold text-slate-900 mb-6 leading-tight">
              Trust in Every <br/>
              <span className="text-blue-600">Transaction.</span>
            </h1>
            
            <p className="text-xl text-slate-500 mb-10 leading-relaxed max-w-xl mx-auto lg:mx-0">
              Don't send money to strangers. We hold your funds in a secure escrow vault until you receive the product.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link href="/login" className="px-8 py-4 bg-blue-600 text-white text-lg font-bold rounded-xl shadow-xl shadow-blue-200 hover:bg-blue-700 transition flex items-center justify-center gap-2">
                Start Secure Transfer <ArrowRight className="w-5 h-5" />
              </Link>
              <button className="px-8 py-4 bg-white text-slate-700 text-lg font-bold rounded-xl border border-slate-200 hover:bg-slate-50 transition flex items-center justify-center gap-2">
                Learn More
              </button>
            </div>
          </div>

          {/* Right: CSS Animated Phone */}
          <div className="relative flex justify-center lg:justify-end">
            <div className="relative border-gray-900 bg-gray-900 border-[12px] rounded-[2.5rem] h-[600px] w-[320px] shadow-2xl flex flex-col overflow-hidden">
              <div className="bg-white pt-4 px-6 pb-2 flex justify-between items-end text-xs font-bold text-slate-800">
                <span>9:41</span>
                <div className="flex gap-1">
                  <div className="w-4 h-3 bg-slate-800 rounded-sm"></div>
                  <div className="w-3 h-3 bg-slate-800 rounded-sm"></div>
                </div>
              </div>
              <div className="bg-blue-600 p-6 text-white pb-8 shadow-md z-10">
                <div className="flex justify-between items-center mb-6">
                  <Menu className="w-5 h-5" />
                  <Bell className="w-5 h-5" />
                </div>
                <div className="text-sm opacity-80 mb-1">Total Balance</div>
                <div className="text-3xl font-bold">TZS 1,250,000</div>
              </div>
              <div className="flex-1 bg-slate-50 p-4 space-y-4 relative">
                <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100">
                  <div className="flex justify-between mb-2">
                    <span className="font-bold text-slate-800 text-sm">Escrow #8821</span>
                    <span className="text-xs text-slate-400">Today</span>
                  </div>
                  <div className="h-2 w-20 bg-slate-100 rounded mb-3"></div>
                  <div className="flex items-center gap-2 text-xs font-bold text-green-600 bg-green-50 px-2 py-1 rounded w-fit">
                    <CheckCircle className="w-3 h-3" /> Funds Locked
                  </div>
                </div>
                <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 animate-pulse">
                  <div className="flex justify-between mb-2">
                    <span className="font-bold text-slate-800 text-sm">Escrow #8822</span>
                    <span className="text-xs text-slate-400">Pending</span>
                  </div>
                  <div className="flex items-center justify-between">
                     <div className="text-sm font-bold text-slate-900">iPhone 13 Pro</div>
                     <div className="text-sm font-bold text-slate-900">850k</div>
                  </div>
                  <div className="mt-3 w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
                    <div className="bg-blue-500 h-full w-2/3"></div>
                  </div>
                  <div className="mt-2 text-xs text-slate-400 text-right">Awaiting Delivery</div>
                </div>
              </div>
            </div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-100 rounded-full blur-3xl -z-10 opacity-60"></div>
          </div>
        </div>
      </header>

      {/* --- 3. Statistics Strip --- */}
      <section className="py-16 bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-around items-center text-center gap-8">
          <div>
            <div className="text-4xl font-bold text-blue-600 mb-2">TZS 250M+</div>
            <div className="text-slate-500 font-medium">Monthly GMV</div>
          </div>
          <div className="hidden md:block h-20 w-px bg-slate-200"></div>
          <div>
            <div className="text-4xl font-bold text-blue-600 mb-2">50+</div>
            <div className="text-slate-500 font-medium">Marketplace Partners</div>
          </div>
          <div className="hidden md:block h-20 w-px bg-slate-200"></div>
          <div>
            <div className="text-4xl font-bold text-blue-600 mb-2">12,000+</div>
            <div className="text-slate-500 font-medium">Users</div>
          </div>
        </div>
      </section>

      {/* --- 4. How It Works --- */}
      <section id="how-it-works" className="py-24 bg-white relative">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">Simple, Secure, Fast.</h2>
          <p className="text-slate-500 max-w-2xl mx-auto mb-20">We act as the trusted middleman so you never have to worry about who sends first.</p>
          <div className="grid md:grid-cols-3 gap-12">
            <div className="space-y-4">
              <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600 mx-auto"><Lock className="w-8 h-8" /></div>
              <h3 className="text-xl font-bold">1. Lock Funds</h3>
              <p className="text-slate-500 text-sm">Buyer deposits money into PesaShip. We secure it until delivery.</p>
            </div>
            <div className="space-y-4">
              <div className="w-16 h-16 bg-indigo-50 rounded-2xl flex items-center justify-center text-indigo-600 mx-auto"><Truck className="w-8 h-8" /></div>
              <h3 className="text-xl font-bold">2. Ship Item</h3>
              <p className="text-slate-500 text-sm">Seller delivers the product knowing payment is guaranteed.</p>
            </div>
            <div className="space-y-4">
              <div className="w-16 h-16 bg-teal-50 rounded-2xl flex items-center justify-center text-teal-600 mx-auto"><CheckCircle className="w-8 h-8" /></div>
              <h3 className="text-xl font-bold">3. Release Cash</h3>
              <p className="text-slate-500 text-sm">Once buyer approves, money is released to the seller instantly.</p>
            </div>
          </div>
        </div>
      </section>

      {/* --- 5. Footer --- */}
      <footer className="bg-slate-900 text-slate-400 py-16 px-6">
        <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-12">
          <div className="col-span-2">
            <div className="text-white font-bold text-2xl flex items-center gap-2 mb-6">
              <ShieldCheck className="text-blue-500" /> PesaShip
            </div>
            <p className="text-sm max-w-sm mb-6">Building trust in Tanzania's digital economy. Secure escrow technology for everyday trade.</p>
            <div className="space-y-2 text-xs">
              <div className="flex items-center gap-2"><MapPin className="w-3 h-3 text-blue-500"/> Dar es Salaam, TZ</div>
              <div className="flex items-center gap-2"><Phone className="w-3 h-3 text-blue-500"/> +255 745 517 500</div>
            </div>
          </div>
          <div>
            <h4 className="text-white font-bold mb-6">Company</h4>
            <ul className="space-y-3 text-sm">
              <li>About Us</li>
              <li>Pricing</li>
              <li>Terms</li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-bold mb-6">Support</h4>
            <ul className="space-y-3 text-sm">
              <li>Help Center</li>
              <li>Contact</li>
              <li>Disputes</li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto border-t border-slate-800 mt-16 pt-8 text-center text-xs">
          &copy; {new Date().getFullYear()} PesaShip Tanzania. All rights reserved.
        </div>
      </footer>
    </div>
  );
}