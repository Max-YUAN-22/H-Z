"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Menu, X, Home, Image, Clock } from 'lucide-react';

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Timeline', href: '/timeline' },
    { name: 'Gallery', href: '/gallery' },
    { name: 'Anniversary', href: '/anniversary' },
  ];

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-white py-4 shadow-md border-b border-gray-100`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-serif font-bold text-xl shadow-lg bg-rose-500`}>
              H
            </div>
            <Heart 
                size={20} 
                className={`text-rose-500`} 
                fill="#f43f5e"
            />
            <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-serif font-bold text-xl shadow-lg bg-blue-500`}>
              Z
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link 
                key={link.name} 
                href={link.href}
                className={`text-sm font-medium tracking-wide transition-colors relative group ${
                    pathname === link.href ? 'text-rose-500' : 'text-gray-600 hover:text-rose-500'
                }`}
              >
                {link.name}
                <span className={`absolute -bottom-1 left-0 w-0 h-0.5 transition-all duration-300 group-hover:w-full bg-rose-500`} />
              </Link>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden p-2 text-gray-600"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen 
                ? <X size={24} className={'text-gray-800'} /> 
                : <Menu size={24} className={'text-gray-800'} />
            }
          </button>
        </div>
      </motion.header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
            <motion.div 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="fixed inset-0 z-40 bg-white pt-24 px-6 md:hidden"
            >
                <div className="flex flex-col gap-6">
                    {navLinks.map((link) => (
                        <Link 
                            key={link.name}
                            href={link.href}
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="text-2xl font-serif text-gray-800 border-b border-gray-100 pb-4"
                        >
                            {link.name}
                        </Link>
                    ))}
                </div>
            </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
