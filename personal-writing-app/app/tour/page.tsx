import Link from 'next/link'
import BurgerMenu from '@/components/BurgerMenu'

export default function TourPage() {
  return (
    <div className="min-h-screen bg-gray-100">
      <BurgerMenu />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8 text-center">Welcome to Praxle-Draft</h1>
        <div className="space-y-8">
          <section className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4">1. Creating Notes</h2>
            <p className="mb-4">Start by creating a new note. Click on the "New Note" button in the navigation menu or on the home page.</p>
            <img src="/placeholder.svg?height=200&width=400" alt="Creating a new note" className="rounded-md shadow-sm" />
          </section>
          <section className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4">2. Organizing with Notebooks</h2>
            <p className="mb-4">Group your notes into notebooks for better organization. Use the "#" symbol followed by the notebook name in your note to add it to a notebook.</p>
            <img src="/placeholder.svg?height=200&width=400" alt="Organizing notes into notebooks" className="rounded-md shadow-sm" />
          </section>
          <section className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4">3. Searching and Filtering</h2>
            <p className="mb-4">Easily find your notes using the search functionality. You can search by title, content, or notebook name.</p>
            <img src="/placeholder.svg?height=200&width=400" alt="Searching and filtering notes" className="rounded-md shadow-sm" />
          </section>
          <section className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4">4. Version History</h2>
            <p className="mb-4">Praxle-Draft automatically saves versions of your notes. Access and restore previous versions from the version history panel.</p>
            <img src="/placeholder.svg?height=200&width=400" alt="Accessing version history" className="rounded-md shadow-sm" />
          </section>
          <div className="text-center">
            <Link href="/" className="inline-block bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 transition-colors">
              Start Writing
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

