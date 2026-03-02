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
            <Link href="/login" className="hover:text-blue-600 transition">Log In</Link>
            <Link href="/create" className="bg-slate-900 text-white px-6 py-2.5 rounded-full hover:bg-slate-800 transition font-semibold shadow-md">
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
              Trusted by 12,000+ Tanzanians
            </div>
            
            <h1 className="text-5xl md:text-7xl font-extrabold text-slate-900 mb-6 leading-tight">
              Trust in Every <br/>
              <span className="text-blue-600">Transaction.</span>
            </h1>
            
            <p className="text-xl text-slate-500 mb-10 leading-relaxed max-w-xl mx-auto lg:mx-0">
              Don't send money to strangers. We hold your funds in a secure escrow vault until you receive the product.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link href="/create" className="px-8 py-4 bg-blue-600 text-white text-lg font-bold rounded-xl shadow-xl shadow-blue-200 hover:bg-blue-700 hover:-translate-y-1 transition-all flex items-center justify-center gap-2">
                Start Secure Transfer <ArrowRight className="w-5 h-5" />
              </Link>
              <button className="px-8 py-4 bg-white text-slate-700 text-lg font-bold rounded-xl border border-slate-200 hover:bg-slate-50 transition flex items-center justify-center gap-2">
                Learn More
              </button>
            </div>
          </div>

          {/* Right: CSS Animated Phone */}
          <div className="relative flex justify-center lg:justify-end">
            <div className="relative border-gray-900 bg-gray-900 border-[12px] rounded-[2.5rem] h-[600px] w-[320px] shadow-2xl flex flex-col overflow-hidden transform transition-transform hover:scale-[1.02] duration-500">
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
                <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 animate-[pulse_3s_infinite]">
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
                <div className="absolute bottom-6 right-6 w-14 h-14 bg-blue-600 rounded-full shadow-lg shadow-blue-300 flex items-center justify-center text-white hover:scale-110 transition-transform cursor-pointer">
                   <ArrowRight className="w-6 h-6" />
                </div>
              </div>
              <div className="bg-white p-4 flex justify-center">
                 <div className="w-32 h-1 bg-slate-200 rounded-full"></div>
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
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Simple, Secure, Fast.</h2>
            <p className="text-slate-500 max-w-2xl mx-auto">
              We act as the trusted middleman so you never have to worry about who sends first.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-12">
            <div className="text-center group">
              <div className="w-20 h-20 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600 mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-sm">
                <Lock className="w-10 h-10" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-slate-900">1. Lock the Funds</h3>
              <p className="text-slate-500 leading-relaxed px-4">
                The buyer deposits money into PesaShip. We hold it securely so the seller knows the money is real.
              </p>
            </div>
            <div className="text-center group">
              <div className="w-20 h-20 bg-indigo-50 rounded-2xl flex items-center justify-center text-indigo-600 mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-sm">
                <Truck className="w-10 h-10" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-slate-900">2. Ship the Item</h3>
              <p className="text-slate-500 leading-relaxed px-4">
                The seller delivers the product or service, confident that the payment is secured.
              </p>
            </div>
            <div className="text-center group">
              <div className="w-20 h-20 bg-teal-50 rounded-2xl flex items-center justify-center text-teal-600 mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-sm">
                <CheckCircle className="w-10 h-10" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-slate-900">3. Release Payment</h3>
              <p className="text-slate-500 leading-relaxed px-4">
                The buyer inspects the goods. Once approved, PesaShip releases the money instantly.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* --- 5. Use Cases (Buyer vs Seller) --- */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Built for Both Sides of the Deal</h2>
            <p className="text-slate-500">Whether you are buying a phone or selling a service, we protect you.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* For Sellers */}
            <div className="bg-slate-50 p-10 rounded-3xl shadow-sm border border-slate-100 relative overflow-hidden group hover:border-blue-500 transition-colors">
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-100 rounded-bl-full -mr-8 -mt-8 transition-transform group-hover:scale-110"></div>
              <h3 className="text-2xl font-bold mb-4 relative z-10">For Sellers & Merchants</h3>
              <ul className="space-y-4 text-slate-600 relative z-10">
                <li className="flex gap-3">
                  <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0" />
                  <span>Stop hearing "I will pay you after delivery."</span>
                </li>
                <li className="flex gap-3">
                  <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0" />
                  <span>Show buyers you are legitimate.</span>
                </li>
                <li className="flex gap-3">
                  <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0" />
                  <span>Avoid fake payment screenshots.</span>
                </li>
              </ul>
            </div>

            {/* For Buyers */}
            <div className="bg-slate-50 p-10 rounded-3xl shadow-sm border border-slate-100 relative overflow-hidden group hover:border-indigo-500 transition-colors">
              <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-100 rounded-bl-full -mr-8 -mt-8 transition-transform group-hover:scale-110"></div>
              <h3 className="text-2xl font-bold mb-4 relative z-10">For Buyers & Clients</h3>
              <ul className="space-y-4 text-slate-600 relative z-10">
                <li className="flex gap-3">
                  <CheckCircle className="w-6 h-6 text-blue-500 flex-shrink-0" />
                  <span>Never lose money to a scammer again.</span>
                </li>
                <li className="flex gap-3">
                  <CheckCircle className="w-6 h-6 text-blue-500 flex-shrink-0" />
                  <span>Inspect the item before money is released.</span>
                </li>
                <li className="flex gap-3">
                  <CheckCircle className="w-6 h-6 text-blue-500 flex-shrink-0" />
                  <span>Instant refund if seller ghosts you.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* --- 6. Testimonials --- */}
      <section id="testimonials" className="py-24 bg-white border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-slate-900 mb-12 text-center">Trusted by Tanzania's Hustlers</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-slate-50 p-8 rounded-2xl">
              <div className="flex gap-1 text-yellow-400 mb-4">★★★★★</div>
              <p className="text-slate-600 mb-6 italic">"I sell phones on Instagram. Before PesaShip, clients were afraid. Now I send a link and they pay immediately."</p>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-slate-300 rounded-full flex items-center justify-center font-bold text-slate-600">J</div>
                <div>
                  <div className="font-bold text-slate-900">Juma M.</div>
                  <div className="text-xs text-slate-500">Kariakoo Dealer</div>
                </div>
              </div>
            </div>
            <div className="bg-slate-50 p-8 rounded-2xl">
              <div className="flex gap-1 text-yellow-400 mb-4">★★★★★</div>
              <p className="text-slate-600 mb-6 italic">"I bought a laptop from Arusha. I was scared. We used PesaShip, I checked the laptop, then released cash. Simple."</p>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-slate-300 rounded-full flex items-center justify-center font-bold text-slate-600">S</div>
                <div>
                  <div className="font-bold text-slate-900">Sarah K.</div>
                  <div className="text-xs text-slate-500">Student, UDSM</div>
                </div>
              </div>
            </div>
            <div className="bg-slate-50 p-8 rounded-2xl">
              <div className="flex gap-1 text-yellow-400 mb-4">★★★★★</div>
              <p className="text-slate-600 mb-6 italic">"The fees are very fair compared to getting scammed. It is the only way I do business with upcountry customers."</p>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-slate-300 rounded-full flex items-center justify-center font-bold text-slate-600">E</div>
                <div>
                  <div className="font-bold text-slate-900">Emmanuel D.</div>
                  <div className="text-xs text-slate-500">Mwanza</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- 7. FAQ --- */}
      <section className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Frequently Asked Questions</h2>
          </div>
          <div className="space-y-4">
            <details className="group bg-slate-50 p-6 rounded-2xl cursor-pointer">
              <summary className="flex justify-between items-center font-bold text-slate-900 list-none">
                <span>Is my money safe?</span>
                <span className="transition group-open:rotate-180">▼</span>
              </summary>
              <p className="text-slate-600 mt-4 leading-relaxed">
                Yes. Your funds are held in a licensed trust account. PesaShip cannot touch your money; we only release it when both parties agree.
              </p>
            </details>
            <details className="group bg-slate-50 p-6 rounded-2xl cursor-pointer">
              <summary className="flex justify-between items-center font-bold text-slate-900 list-none">
                <span>How much are the fees?</span>
                <span className="transition group-open:rotate-180">▼</span>
              </summary>
              <p className="text-slate-600 mt-4 leading-relaxed">
                We charge a flat fee of 2.5% per transaction. This can be paid by the buyer, the seller, or split 50/50.
              </p>
            </details>
            <details className="group bg-slate-50 p-6 rounded-2xl cursor-pointer">
              <summary className="flex justify-between items-center font-bold text-slate-900 list-none">
                <span>What happens if the seller sends a fake item?</span>
                <span className="transition group-open:rotate-180">▼</span>
              </summary>
              <p className="text-slate-600 mt-4 leading-relaxed">
                You click "Reject Item" in your dashboard. This freezes the money and opens a Dispute. Our admin team will review evidence. If fake, you get a 100% refund.
              </p>
            </details>
          </div>
        </div>
      </section>

      {/* --- 8. Final CTA --- */}
      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto bg-blue-600 rounded-[3rem] p-12 md:p-20 text-center text-white relative overflow-hidden shadow-2xl shadow-blue-200">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-white/20 to-transparent"></div>
          <div className="relative z-10">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to do business safely?</h2>
            <p className="text-blue-100 text-lg mb-10 max-w-2xl mx-auto">
              Join thousands of Tanzanians who trust PesaShip for their daily transactions. No signup fees.
            </p>
            <Link href="/create" className="inline-block bg-white text-blue-600 px-10 py-4 rounded-full font-bold text-lg hover:bg-blue-50 transition shadow-xl transform hover:-translate-y-1">
              Start Your First Escrow
            </Link>
          </div>
        </div>
      </section>

      {/* --- 9. Footer --- */}
      <footer className="bg-slate-900 text-slate-300 py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-12 mb-16">
            <div className="col-span-1 md:col-span-2">
              <div className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                <ShieldCheck className="text-blue-500"/> PesaShip
              </div>
              <p className="text-slate-400 max-w-sm mb-8 leading-relaxed">
                Building trust in Tanzania's digital economy. We protect both buyers and sellers from fraud with automated escrow technology.
              </p>
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-sm">
                  <MapPin className="w-4 h-4 text-blue-500" />
                  <span>TanHouse, Dar es Salaam, Tanzania</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Phone className="w-4 h-4 text-blue-500" />
                  <span>+255 745 517 500</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Mail className="w-4 h-4 text-blue-500" />
                  <span>support@pesaship.co.tz</span>
                </div>
              </div>
            </div>
            <div>
              <h4 className="font-bold text-white mb-6">Company</h4>
              <ul className="space-y-4 text-sm">
                <li><a href="#" className="hover:text-blue-400 transition">About Us</a></li>
                <li><a href="#" className="hover:text-blue-400 transition">How it Works</a></li>
                <li><a href="#" className="hover:text-blue-400 transition">Pricing</a></li>
                <li><a href="#" className="hover:text-blue-400 transition">Careers</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-white mb-6">Legal</h4>
              <ul className="space-y-4 text-sm">
                <li><a href="#" className="hover:text-blue-400 transition">Terms of Service</a></li>
                <li><a href="#" className="hover:text-blue-400 transition">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-blue-400 transition">Dispute Resolution</a></li>
                <li><a href="#" className="hover:text-blue-400 transition">Escrow Agreement</a></li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center text-sm text-slate-500">
            <div>&copy; {new Date().getFullYear()} PesaShip Tanzania. All rights reserved.</div>
            <div className="flex gap-6 mt-4 md:mt-0">
               <Smartphone className="w-5 h-5 hover:text-white cursor-pointer transition"/>
               <div className="hover:text-white cursor-pointer transition">English</div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}