import { getSession } from '@/lib/session'
import ClientHeader from '@/components/ClientHeader'
import SearchProducts from '@/components/SearchProducts'

export default async function HomePage() {
  const session = await getSession()

  return (
    <main className="max-w-7xl mx-auto px-6 py-10 space-y-10">
      <ClientHeader session={session} />      {/* ✅ 处理 logo + 登录/登出 */}
      <SearchProducts session={session} />    {/* ✅ 专注于搜索 */}
    </main>
  )
}