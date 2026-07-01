import Link from 'next/link';
import { ShieldCheck, Lock, Truck, CheckCircle, ArrowRight, Menu, Bell, Smartphone, MapPin, Mail, Phone, HelpCircle, Quote } from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white font-sans text-slate-900 selection:bg-blue-100 antialiased overflow-x-hidden">
      
      {/* --- 1. Clean Navigation (Mobile Optimized) --- */}
      <nav className="fixed w-full bg-white/95 backdrop-blur-md border-b border-slate-100 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-20 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="bg-blue-600 p-1.5 rounded-lg flex-shrink-0">
              <ShieldCheck className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            </div>
            <div className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900">
              Pesa<span className="text-blue-600">Ship</span>
            </div>
          </div>
          
          {/* Mobile Buttons always visible, Main Menu items hidden on mobile */}
          <div className="flex items-center gap-3 text-sm font-medium">
            <Link href="/login" className="text-slate-600 hover:text-blue-600 transition px-2 py-1">
              Log In
            </Link>
            <Link href="/role" className="bg-slate-900 text-white px-4 sm:px-6 py-2 sm:py-2.5 rounded-full hover:bg-slate-800 transition font-semibold shadow-md text-xs sm:text-sm">
              Start Deal
            </Link>
          </div>
        </div>
      </nav>

      {/* --- 2. Hero Section (Clean Stack on Mobile) --- */}
      <header className="pt-28 sm:pt-36 pb-16 sm:pb-24 px-4 sm:px-6 bg-gradient-to-b from-blue-50/60 to-white overflow-hidden">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          
          {/* Left: Copy */}
          <div className="text-center lg:text-left">
            <div className="inline-flex items-center gap-2 bg-white border border-slate-200 text-slate-600 px-3 sm:px-4 py-1.5 rounded-full text-xs sm:text-sm font-semibold mb-6 sm:mb-8 shadow-sm">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
              </span>
              Trusted by 12,000+ Tanzanians
            </div>
            
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-extrabold text-slate-900 mb-6 leading-tight tracking-tight">
              Trust in Every <br className="hidden sm:block" />
              <span className="text-blue-600">Transaction.</span>
            </h1>
            
            <p className="text-base sm:text-xl text-slate-500 mb-8 sm:mb-10 leading-relaxed max-w-xl mx-auto lg:mx-0 px-2 sm:px-0">
              Don't send money to strangers. We hold your funds in a secure escrow vault until you receive the product.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start px-4 sm:px-0">
              <Link href="/role" className="w-full sm:w-auto px-6 sm:px-8 py-3.5 sm:py-4 bg-blue-600 text-white text-base sm:text-lg font-bold rounded-xl shadow-xl shadow-blue-200 hover:bg-blue-700 transition-all flex items-center justify-center gap-2">
                Start Secure Transfer <ArrowRight className="w-5 h-5" />
              </Link>
              <button className="w-full sm:w-auto px-6 sm:px-8 py-3.5 sm:py-4 bg-white text-slate-700 text-base sm:text-lg font-bold rounded-xl border border-slate-200 hover:bg-slate-50 transition flex items-center justify-center gap-2">
                Learn More
              </button>
            </div>
          </div>

          {/* Right: Hidden on Mobile, Beautiful on Desktop */}
          <div className="hidden lg:flex justify-center lg:justify-end relative">
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
                  <div className="flex items-center gap-2 text-xs font-bold text-green-600 bg-green-50 px-2 py-1 rounded w-fit">
                    <CheckCircle className="w-3 h-3" /> Funds Locked
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* --- 3. Statistics Strip (Grid on Mobile) --- */}
      <section className="py-10 sm:py-16 bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-3 md:flex md:flex-row justify-around items-center text-center gap-2 sm:gap-8">
          <div>
            <div className="text-lg sm:text-4xl font-bold text-blue-600 mb-1">250M+</div>
            <div className="text-[10px] sm:text-sm text-slate-500 font-medium">Monthly GMV</div>
          </div>
          <div className="hidden md:block h-20 w-px bg-slate-200"></div>
          <div>
            <div className="text-lg sm:text-4xl font-bold text-blue-600 mb-1">50+</div>
            <div className="text-[10px] sm:text-sm text-slate-500 font-medium">Partners</div>
          </div>
          <div className="hidden md:block h-20 w-px bg-slate-200"></div>
          <div>
            <div className="text-lg sm:text-4xl font-bold text-blue-600 mb-1">12K+</div>
            <div className="text-[10px] sm:text-sm text-slate-500 font-medium">Users</div>
          </div>
        </div>
      </section>

      {/* --- 4. How It Works (Responsive Stack) --- */}
      <section id="how-it-works" className="py-16 sm:py-24 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12 sm:mb-20">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-4">Simple, Secure, Fast.</h2>
            <p className="text-slate-500 max-w-2xl mx-auto text-sm sm:text-base">
              We act as the trusted middleman so you never have to worry about who sends first.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 sm:gap-12">
            <div className="text-center p-4 bg-slate-50/50 rounded-2xl md:bg-transparent">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600 mx-auto mb-4 sm:mb-6 shadow-sm">
                <Lock className="w-8 h-8 sm:w-10 sm:h-10" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold mb-2 text-slate-900">1. Lock the Funds</h3>
              <p className="text-sm sm:text-base text-slate-500 leading-relaxed">
                The buyer deposits money into PesaShip. We hold it securely so the seller knows the money is real.
              </p>
            </div>
            <div className="text-center p-4 bg-slate-50/50 rounded-2xl md:bg-transparent">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-indigo-50 rounded-2xl flex items-center justify-center text-indigo-600 mx-auto mb-4 sm:mb-6 shadow-sm">
                <Truck className="w-8 h-8 sm:w-10 sm:h-10" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold mb-2 text-slate-900">2. Ship the Item</h3>
              <p className="text-sm sm:text-base text-slate-500 leading-relaxed">
                The seller delivers the product or service, confident that the payment is secured.
              </p>
            </div>
            <div className="text-center p-4 bg-slate-50/50 rounded-2xl md:bg-transparent">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-teal-50 rounded-2xl flex items-center justify-center text-teal-600 mx-auto mb-4 sm:mb-6 shadow-sm">
                <CheckCircle className="w-8 h-8 sm:w-10 sm:h-10" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold mb-2 text-slate-900">3. Release Payment</h3>
              <p className="text-sm sm:text-base text-slate-500 leading-relaxed">
                The buyer inspects the goods. Once approved, PesaShip releases the money instantly.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* --- 5. Use Cases (Buyer vs Seller Grid) --- */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-4">Built for Both Sides</h2>
            <p className="text-sm sm:text-base text-slate-500">Whether you are buying a phone or selling a service, we protect you.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 sm:gap-8">
            <div className="bg-slate-50 p-6 sm:p-10 rounded-3xl border border-slate-100">
              <h3 className="text-xl sm:text-2xl font-bold mb-4">For Sellers & Merchants</h3>
              <ul className="space-y-3 text-sm sm:text-base text-slate-600">
                <li className="flex gap-3 items-start">
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span>Stop hearing "I will pay you after delivery."</span>
                </li>
                <li className="flex gap-3 items-start">
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span>Avoid fake mobile money payment screenshots.</span>
                </li>
              </ul>
            </div>

            <div className="bg-slate-50 p-6 sm:p-10 rounded-3xl border border-slate-100">
              <h3 className="text-xl sm:text-2xl font-bold mb-4">For Buyers & Clients</h3>
              <ul className="space-y-3 text-sm sm:text-base text-slate-600">
                <li className="flex gap-3 items-start">
                  <CheckCircle className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
                  <span>Never lose money to an Instagram or Facebook scammer again.</span>
                </li>
                <li className="flex gap-3 items-start">
                  <CheckCircle className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
                  <span>Inspect the item completely before money is released.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* --- 6. Testimonials (Vertical Scroll on Mobile) --- */}
      <section id="testimonials" className="py-16 sm:py-24 bg-white border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-10 text-center">Trusted by Tanzania's Hustlers</h2>
          <div className="grid md:grid-cols-3 gap-6 sm:gap-8">
            <div className="bg-slate-50 p-6 sm:p-8 rounded-2xl">
              <div className="text-yellow-400 mb-3 text-sm">★★★★★</div>
              <p className="text-sm sm:text-base text-slate-600 mb-6 italic">"I sell phones on Instagram. Before PesaShip, clients were afraid. Now I send a link and they pay immediately."</p>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-slate-300 rounded-full flex items-center justify-center font-bold text-slate-600 text-sm">J</div>
                <div>
                  <div className="font-bold text-slate-900 text-sm">Juma M.</div>
                  <div className="text-xs text-slate-500">Kariakoo Dealer</div>
                </div>
              </div>
            </div>
            <div className="bg-slate-50 p-6 sm:p-8 rounded-2xl">
              <div className="text-yellow-400 mb-3 text-sm">★★★★★</div>
              <p className="text-sm sm:text-base text-slate-600 mb-6 italic">"I bought a laptop from Arusha. I was scared. We used PesaShip, I checked the laptop, then released cash. Simple."</p>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-slate-300 rounded-full flex items-center justify-center font-bold text-slate-600 text-sm">S</div>
                <div>
                  <div className="font-bold text-slate-900 text-sm">Sarah K.</div>
                  <div className="text-xs text-slate-500">Student, UDSM</div>
                </div>
              </div>
            </div>
            <div className="bg-slate-50 p-6 sm:p-8 rounded-2xl">
              <div className="text-yellow-400 mb-3 text-sm">★★★★★</div>
              <p className="text-sm sm:text-base text-slate-600 mb-6 italic">"The fees are very fair compared to getting scammed. It is the only way I do business with upcountry customers."</p>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-slate-300 rounded-full flex items-center justify-center font-bold text-slate-600 text-sm">E</div>
                <div>
                  <div className="font-bold text-slate-900 text-sm">Emmanuel D.</div>
                  <div className="text-xs text-slate-500">Mwanza</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- 8. Final CTA (Fluid on Mobile) --- */}
      <section className="py-12 sm:py-20 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto bg-blue-600 rounded-[2rem] sm:rounded-[3rem] p-8 sm:p-20 text-center text-white relative overflow-hidden shadow-2xl shadow-blue-200">
          <div className="relative z-10">
            <h2 className="text-3xl sm:text-5xl font-bold mb-4 sm:mb-6">Ready to do business safely?</h2>
            <p className="text-blue-100 text-sm sm:text-lg mb-8 sm:mb-10 max-w-2xl mx-auto">
              Join thousands of Tanzanians who trust PesaShip for their daily transactions. No signup fees.
            </p>
            <Link href="/role" className="w-full sm:w-auto inline-block bg-white text-blue-600 px-8 py-3.5 sm:py-4 rounded-full font-bold text-base sm:text-lg hover:bg-blue-50 transition shadow-xl">
              Start Your First Escrow
            </Link>
          </div>
        </div>
      </section>

      {/* --- 9. Footer (Clean Stack) --- */}
      <footer className="bg-slate-900 text-slate-300 py-12 sm:py-16 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-12 mb-12">
            <div className="sm:col-span-2">
              <div className="text-xl sm:text-2xl font-bold text-white mb-4 flex items-center gap-2">
                <ShieldCheck className="text-blue-500"/> PesaShip
              </div>
              <p className="text-slate-400 max-w-sm mb-6 text-sm leading-relaxed">
                Building trust in Tanzania's digital economy. We protect both buyers and sellers from fraud with automated escrow technology.
              </p>
              <div className="space-y-2 text-xs sm:text-sm">
                <div className="flex items-center gap-3">
                  <MapPin className="w-4 h-4 text-blue-500 flex-shrink-0" />
                  <span>TanHouse, Dar es Salaam, Tanzania</span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-blue-500 flex-shrink-0" />
                  <span>+255 745 517 500</span>
                </div>
              </div>
            </div>
            <div>
              <h4 className="font-bold text-white text-sm sm:text-base mb-4">Company</h4>
              <ul className="space-y-3 text-xs sm:text-sm">
                <li><Link href="/about" className="hover:text-blue-400 transition">About Us</Link></li>
                <li><a href="#how-it-works" className="hover:text-blue-400 transition">How it Works</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-white text-sm sm:text-base mb-4">Legal</h4>
              <ul className="space-y-3 text-xs sm:text-sm">
                <li><Link href="/legal#terms" className="hover:text-blue-400 transition">Terms of Service</Link></li>
                <li><Link href="/legal#privacy" className="hover:text-blue-400 transition">Privacy Policy</Link></li>
                <li className="pt-2">
                  <Link href="/legal" className="text-blue-500 font-bold hover:text-blue-400 transition flex items-center gap-1">
                    Terms, Privacy & Escrow Agreement <ArrowRight className="w-4 h-4" />
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="pt-6 border-t border-slate-800 flex flex-col sm:flex-row justify-between items-center text-xs text-slate-500 gap-4">
            <div>&copy; {new Date().getFullYear()} PesaShip Tanzania. All rights reserved.</div>
          </div>
        </div>
      </footer>
    </div>
  );
}