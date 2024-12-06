'use client'

import { usePathname } from 'next/navigation'
import Link from 'next/link'

export default function Breadcrumb() {
  const pathname = usePathname()
  const paths = pathname.split('/').filter(Boolean)

  return (
    <nav className="text-sm breadcrumbs">
      <ul>
        <li><Link href="/">Home</Link></li>
        {paths.map((path, index) => {
          const href = `/${paths.slice(0, index + 1).join('/')}`
          return (
            <li key={path}>
              <Link href={href}>{decodeURIComponent(path)}</Link>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}

