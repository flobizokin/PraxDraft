import BurgerMenu from '@/components/BurgerMenu'
import Canvas from '@/components/Canvas'
import Breadcrumb from '@/components/Breadcrumb'
import CommitDashboard from '@/components/CommitDashboard'

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-100">
      <BurgerMenu />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8 text-center">Praxle-Draft</h1>
        <div className="flex flex-col md:flex-row gap-8">
          <div className="md:w-2/3 bg-white rounded-lg shadow-md p-6">
            <Canvas />
          </div>
          <div className="md:w-1/3 bg-white rounded-lg shadow-md p-6">
            <CommitDashboard />
          </div>
        </div>
      </div>
    </main>
  )
}

