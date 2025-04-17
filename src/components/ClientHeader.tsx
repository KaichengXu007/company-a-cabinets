'use client'

import Link from 'next/link'
import SignOutButton from './SignOutButton'

export default function ClientHeader({ session }: { session: any }) {
  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* 左侧 Logo 和联系方式 */}
        <div>
          <h1 className="text-2xl font-bold text-blue-800">Company A Cabinets</h1>
          <p className="text-sm text-gray-500 hidden sm:block">
            Contact us: info@companya.com | +1 (555) 123-4567
          </p>
        </div>

        {/* 右侧按钮区域 */}
        <div className="flex items-center gap-3">
          {session?.user?.role === 'admin' && (
            <Link
              href="/admin/products"
              className="bg-blue-100 text-blue-800 px-4 py-2 rounded-md hover:bg-blue-200 transition font-medium shadow-sm"
            >
              Admin Panel
            </Link>
          )}

          {session?.user?.role === 'user' && (
            <Link
              href="/dashboard"
              className="bg-blue-100 text-blue-800 px-4 py-2 rounded-md hover:bg-blue-200 transition font-medium shadow-sm"
            >
              My Dashboard
            </Link>
          )}

          {!session ? (
            <Link
              href="/login"
              className="bg-blue-100 text-blue-800 px-4 py-2 rounded-md hover:bg-blue-200 transition font-medium shadow-sm"
            >
              Login
            </Link>
          ) : (
            <SignOutButton />
          )}
        </div>
      </div>
    </header>
  )
}