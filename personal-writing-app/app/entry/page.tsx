import Link from 'next/link'

export default function EntryPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full">
        <h1 className="text-3xl font-bold mb-6 text-center">Welcome to Praxle-Draft</h1>
        <p className="mb-6 text-center">
          Your personal writing assistant for capturing ideas, organizing thoughts, and boosting productivity.
        </p>
        <div className="space-y-4">
          <Link href="/new-note" className="block w-full bg-blue-500 text-white text-center py-2 rounded-md hover:bg-blue-600 transition-colors">
            Create Your First Note
          </Link>
          <Link href="/notebooks" className="block w-full bg-green-500 text-white text-center py-2 rounded-md hover:bg-green-600 transition-colors">
            Explore Notebooks
          </Link>
          <Link href="/tour" className="block w-full bg-gray-300 text-gray-800 text-center py-2 rounded-md hover:bg-gray-400 transition-colors">
            Take a Tour
          </Link>
        </div>
      </div>
    </div>
  )
}

