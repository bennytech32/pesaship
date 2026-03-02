import Link from 'next/link';
import { ShieldCheck, Lock, Truck } from 'lucide-react'; // Assuming lucide-react for icons

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Navigation */}
      <nav className="bg-white border-b py-4 px-6 flex justify-between items-center sticky top-0 z-50">
        <div className="text-2xl font-bold text-blue-700">PesaShip</div>
        <div className="space-x-4">
          <Link href="/login" className="text-gray-600 hover:text-gray-900">Login</Link>
          <Link href="/register" className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition">
            Start Escrow
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="flex-1 flex flex-col justify-center items-center text-center px-4 py-20 bg-white">
        <h1 className="text-5xl font-extrabold text-gray-900 mb-6 tracking-tight">
          Don't Send Money. <span className="text-blue-600">Lock It.</span>
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mb-10">
          The safest way to buy and sell in Tanzania. We hold the payment until you receive the product.
        </p>
        <div className="flex gap-4">
          <button className="px-8 py-4 bg-blue-600 text-white font-semibold rounded-xl shadow-lg hover:bg-blue-700 transition">
            Create Transaction
          </button>
          <button className="px-8 py-4 bg-gray-100 text-gray-700 font-semibold rounded-xl hover:bg-gray-200 transition">
            How it Works
          </button>
        </div>
      </header>

      {/* Trust Features */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">
          <FeatureCard 
            icon={<Lock className="w-8 h-8 text-blue-600" />}
            title="Funds Locked"
            desc="Money is held securely in PesaShip escrow until delivery is confirmed."
          />
          <FeatureCard 
            icon={<Truck className="w-8 h-8 text-blue-600" />}
            title="Verify Delivery"
            desc="Sellers only get paid after the buyer inspects and accepts the item."
          />
          <FeatureCard 
            icon={<ShieldCheck className="w-8 h-8 text-blue-600" />}
            title="Dispute Protection"
            desc="If things go wrong, our admin team mediates the refund instantly."
          />
        </div>
      </section>

      {/* Footer with Contact Info */}
      <footer className="bg-gray-900 text-gray-400 py-12 px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between">
          <div>
            <h3 className="text-white text-xl font-bold mb-4">PesaShip</h3>
            <p>Secure Escrow Services Tanzania.</p>
          </div>
          <div className="mt-8 md:mt-0">
            <h4 className="text-white font-semibold mb-2">Contact Us</h4>
            <p>TanHouse, Dar es Salaam</p>
            <p>Phone: +255 745 517 500</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({ icon, title, desc }: { icon: any, title: string, desc: string }) {
  return (
    <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
      <div className="mb-4">{icon}</div>
      <h3 className="text-xl font-bold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600">{desc}</p>
    </div>
  );
}