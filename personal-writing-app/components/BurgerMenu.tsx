'use client'

import React, { useState } from 'react'
import Link from 'next/link'

const BurgerMenu: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false)

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  return (
    <div className="relative">
      <button
        className="fixed top-4 left-4 z-50 p-2 bg-gray-800 text-white rounded-md"
        onClick={toggleMenu}
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      </button>
      {isOpen && (
        <div className="fixed top-0 left-0 w-64 h-full bg-gray-800 text-white p-4 z-40">
          <nav>
            <ul className="space-y-4">
              <li>
                <Link href="/" className="text-lg hover:text-gray-300">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/new-note" className="text-lg hover:text-gray-300">
                  New Note
                </Link>
              </li>
              <li>
                <Link href="/notebooks" className="text-lg hover:text-gray-300">
                  Notebooks
                </Link>
              </li>
              <li>
                <Link href="/search" className="text-lg hover:text-gray-300">
                  Search
                </Link>
              </li>
              <li>
                <Link href="/tour" className="text-lg hover:text-gray-300">
                  Tour
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      )}
    </div>
  )
}

export default BurgerMenu

