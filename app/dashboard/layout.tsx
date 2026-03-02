'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, PlusCircle, Settings, LogOut, ShieldCheck, Menu } from 'lucide-react';
import { useState } from 'react';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { name: 'Overview', href: '/dashboard', icon: LayoutDashboard },
    { name: 'New Transaction', href: '/create', icon: PlusCircle },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar (Desktop) */}
      <aside className="hidden md:flex flex-col w-64 bg-slate-900 text-white min-h-screen fixed left-0 top-0 z-20">
        <div className="p-6 border-b border-slate-800 flex items-center gap-3">
          <ShieldCheck className="w-8 h-8 text-blue-500" />
          <span className="text-xl font-bold">PesaShip</span>
        </div>
        <nav className="flex-1 p-4 space-y-2">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className={`flex items-center gap-3 px-4 py-3 rounded-xl transition ${pathname === item.href ? 'bg-blue-600 text-white' : 'text-slate-400 hover:bg-slate-800'}`}>
              <item.icon className="w-5 h-5" /> <span className="font-medium">{item.name}</span>
            </Link>
          ))}
        </nav>
        <div className="p-4">
          <Link href="/api/auth/signout" className="flex items-center gap-3 px-4 py-3 text-red-400 hover:bg-slate-800 rounded-xl"><LogOut className="w-5 h-5" /> Sign Out</Link>
        </div>
      </aside>

      {/* Mobile Header */}
      <div className="md:hidden fixed top-0 w-full bg-slate-900 text-white z-50 p-4 flex justify-between items-center">
         <div className="flex items-center gap-2 font-bold"><ShieldCheck className="w-6 h-6 text-blue-500"/> PesaShip</div>
         <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}><Menu className="w-6 h-6" /></button>
      </div>

      {/* Main Content */}
      <main className="flex-1 md:ml-64 p-6 md:p-10 mt-16 md:mt-0">
        {children}
      </main>
    </div>
  );
}