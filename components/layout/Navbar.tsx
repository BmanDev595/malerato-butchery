// components/layout/Navbar.tsx
'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { ShoppingCart, User, Menu, LogOut } from 'lucide-react'
import { useCart } from '../../context/CartContext'

interface UserData {
  id: string
  name: string
  email: string
  role: string
}

export default function Navbar() {
  const { cartCount } = useCart()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [logoError, setLogoError] = useState(false)
  const [user, setUser] = useState<UserData | null>(null)
  const [loading, setLoading] = useState(true)

  // Check if user is logged in
  useEffect(() => {
    checkAuthStatus()
  }, [])

  const checkAuthStatus = async () => {
    try {
      const response = await fetch('/api/auth/me', {
        credentials: 'include'
      })
      
      if (response.ok) {
        const userData = await response.json()
        setUser(userData)
      }
    } catch (error) {
      console.error('Auth check failed:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', {
        method: 'POST',
        credentials: 'include'
      })
      setUser(null)
      setIsMobileMenuOpen(false)
      // Optional: Redirect to home page after logout
      window.location.href = '/'
    } catch (error) {
      console.error('Logout failed:', error)
    }
  }

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo with Tagline */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-9 h-9 rounded-full overflow-hidden flex items-center justify-center">
              {logoError ? (
                <span className="text-white font-bold text-lg">M</span>
              ) : (
                <img 
                  src="/logo.png" 
                  alt="Malerato Butchery Logo"
                  className="w-20 h-20 object-contain p-0 m-0"
                  onError={() => setLogoError(true)}
                />
              )}
            </div>

            <div className="flex flex-col leading-tight">
              <span className="text-lg md:text-2xl font-bold text-gray-800">
                Malerato<span className="hidden sm:inline"> Butchery</span>
              </span>
              <span className="text-[10px] sm:text-xs text-red-600 font-semibold tracking-wide uppercase">
                Premium Quality Meats
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
            {user?.role === 'admin' && (
              <Link href="/admin" className="text-gray-700 hover:text-red-600 font-medium">
                Admin
              </Link>
            )}
          </div>

          {/* Icons & User Menu */}
          <div className="flex items-center space-x-6">
            {/* Shopping Cart */}
            <Link href="/cart" className="relative">
              <ShoppingCart className="w-6 h-6 text-gray-700 hover:text-red-600" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {cartCount > 99 ? '99+' : cartCount}
                </span>
              )}
            </Link>

            {/* User Area - Shows different content based on auth state */}
            {loading ? (
              <div className="w-6 h-6 animate-pulse bg-gray-200 rounded"></div>
            ) : user ? (
              <div className="hidden md:flex items-center space-x-4">
                {/* User Dropdown (Desktop) */}
                <div className="relative group">
                  <button className="flex items-center space-x-2 text-gray-700 hover:text-red-600">
                    <User className="w-5 h-5" />
                    <span className="font-medium">{user.name.split(' ')[0]}</span>
                  </button>
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 border">
                    <div className="px-4 py-2 border-b">
                      <p className="font-semibold">{user.name}</p>
                      <p className="text-sm text-gray-500">{user.email}</p>
                    </div>
                    {user.role === 'admin' && (
                      <Link 
                        href="/admin" 
                        className="block px-4 py-2 hover:bg-gray-50"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        Admin Dashboard
                      </Link>
                    )}
                    <Link 
                      href="/profile" 
                      className="block px-4 py-2 hover:bg-gray-50"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      My Profile
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 hover:bg-gray-50 text-red-600 flex items-center"
                    >
                      <LogOut className="w-4 h-4 mr-2" />
                      Logout
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="hidden md:flex items-center space-x-4">
                <Link 
                  href="/auth/login" 
                  className="text-gray-700 hover:text-red-600 font-medium"
                >
                  Login
                </Link>
                <Link 
                  href="/auth/register" 
                  className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 font-medium"
                >
                  Register
                </Link>
              </div>
            )}

            {/* Mobile Menu Button */}
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
              
              {/* Auth Links for Mobile */}
              {loading ? (
                <div className="py-2 text-center text-gray-500">Loading...</div>
              ) : user ? (
                <>
                  <div className="py-2 border-t">
                    <p className="font-semibold">{user.name}</p>
                    <p className="text-sm text-gray-500">{user.email}</p>
                  </div>
                  {user.role === 'admin' && (
                    <Link 
                      href="/admin" 
                      className="text-gray-700 hover:text-red-600"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Admin Dashboard
                    </Link>
                  )}
                  <Link 
                    href="/profile" 
                    className="text-gray-700 hover:text-red-600"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    My Profile
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="text-left text-red-600 hover:text-red-700 flex items-center"
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link href="/auth/login" className="text-gray-700 hover:text-red-600" onClick={() => setIsMobileMenuOpen(false)}>
                    Login
                  </Link>
                  <Link href="/auth/register" className="text-gray-700 hover:text-red-600" onClick={() => setIsMobileMenuOpen(false)}>
                    Register
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}