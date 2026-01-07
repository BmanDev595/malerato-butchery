'use client'

import Link from 'next/link'
import { useState } from 'react'
import { ShoppingCart, User, Menu } from 'lucide-react'
import { useCart } from '../../context/CartContext'

export default function Navbar() {
  const { cartCount } = useCart()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [logoError, setLogoError] = useState(false)

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo with Tagline - Shows on ALL devices */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-18 h-18 rounded-full overflow-hidden flex items-center justify-center bg-white-600">
              {logoError ? (
                <span className="text-white font-bold text-lg">M</span>
              ) : (
                <img 
                  src="/logo.png" 
                  alt="Malerato Butchery Logo"
                  className="w-full h-full object-contain p-0.5"
                  onError={() => setLogoError(true)}
                />
              )}
            </div>

            {/* Brand Name & Tagline Container */}
            <div className="flex flex-col leading-tight">
              {/* Main Brand Name */}
              <span className="text-lg md:text-2xl font-bold text-gray-800">
                Malerato<span className="hidden sm:inline"> Butchery</span>
              </span>
              
              {/* Tagline - Shows on ALL devices */}
              <span className="text-[10px] sm:text-xs text-red-600 font-semibold tracking-wide uppercase">
                Premium Meats
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-gray-700 hover:text-red-600 font-medium">
              Home
            </Link>
            <Link href="/products" className="text-gray-700 hover:text-red-600 font-medium">
              Products
            </Link>
            <Link href="/about" className="text-gray-700 hover:text-red-600 font-medium">
              About
            </Link>
            <Link href="/contact" className="text-gray-700 hover:text-red-600 font-medium">
              Contact
            </Link>
          </div>

          {/* Icons */}
          <div className="flex items-center space-x-6">
            <Link href="/cart" className="relative">
              <ShoppingCart className="w-6 h-6 text-gray-700 hover:text-red-600" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {cartCount > 99 ? '99+' : cartCount}
                </span>
              )}
            </Link>
            <Link href="/auth/login">
              <User className="w-6 h-6 text-gray-700 hover:text-red-600" />
            </Link>
            <button 
              className="md:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t">
            <div className="flex flex-col space-y-3">
              <Link href="/" className="text-gray-700 hover:text-red-600" onClick={() => setIsMobileMenuOpen(false)}>
                Home
              </Link>
              <Link href="/products" className="text-gray-700 hover:text-red-600" onClick={() => setIsMobileMenuOpen(false)}>
                Products
              </Link>
              <Link href="/about" className="text-gray-700 hover:text-red-600" onClick={() => setIsMobileMenuOpen(false)}>
                About
              </Link>
              <Link href="/contact" className="text-gray-700 hover:text-red-600" onClick={() => setIsMobileMenuOpen(false)}>
                Contact
              </Link>
              {/* Add login/register links to mobile menu */}
              <Link href="/auth/login" className="text-gray-700 hover:text-red-600" onClick={() => setIsMobileMenuOpen(false)}>
                Login
              </Link>
              <Link href="/auth/register" className="text-gray-700 hover:text-red-600" onClick={() => setIsMobileMenuOpen(false)}>
                Register
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}