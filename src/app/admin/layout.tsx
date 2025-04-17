import { ReactNode } from 'react'
import Link from 'next/link'
import SignOutButton from '@/components/SignOutButton'
import { getSession } from '@/lib/session'
import { redirect } from 'next/navigation'

export default async function AdminLayout({ children }: { children: ReactNode }) {
  const session = await getSession()

  if (!session) {
    redirect('/login') // 没登录就去登录页
  }
  
  if (session.user.role !== 'admin') {
    redirect('/') // 非管理员不要回 `/login`，改为回首页
  }

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-xl font-bold">Company A Admin</h1>
          <nav className="flex items-center gap-4">
            <Link href="/admin/products" className="text-blue-600 hover:underline">
              Products
            </Link>
            <Link href="/admin/inquiries" className="text-blue-600 hover:underline">
              Inquiries
            </Link>
            <Link href="/admin/users" className="text-blue-600 hover:underline">
              Users
            </Link>
            <Link href="/" className="text-gray-500 hover:underline">
              Home
            </Link>
            {/* 👤 用户名 */}
            {session?.user?.name && (
              <span className="text-sm text-gray-600">Welcome, {session.user.name}</span>
            )}
            <SignOutButton />
          </nav>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-10">{children}</main>
    </div>
  )
}