'use client'

import { useCallback, useState } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import Link from 'next/link'
import { Menu, MenuItem, MenuItems } from '@headlessui/react'
import { FaBars, FaTimes } from 'react-icons/fa'
import { Box, Button, Text } from '.'
import { useUser } from '@/hooks/use-user'
import { signOut } from '@/lib/auth-client'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()
  const router = useRouter()
  const { displayName, isSignedIn } = useUser()

  const toggleMenu = useCallback(() => setIsOpen(prev => !prev), [])

  const handleSignOut = useCallback(async () => {
    await signOut()
    router.push('/')
    router.refresh()
  }, [router])

  const primaryNavItems = [
    { name: 'Search', route: '/search', secondaryRoute: '/' },
    { name: 'Favorites', route: '/favorites' },
    { name: 'My Reviews', route: '/my-reviews' }
  ]

  return (
    <nav className="shadow-lg">
      <Box className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-16">
        <Link
          href="/"
          className="text-2xl font-bold hover:text-accent transition duration-200"
        >
          Google Books API
        </Link>

        {/* Primary Navigation */}
        <Box className="hidden md:flex space-x-4">
          {primaryNavItems.map(item => (
            <Link
              key={item.name}
              href={item.route}
              className={`px-3 py-2 rounded-md text-lg font-medium ${
                pathname === item.route || pathname === item.secondaryRoute
                  ? 'bg-secondary text-white hover:text-white'
                  : 'hover:text-accent text-primary'
              } transition duration-200`}
            >
              {item.name}
            </Link>
          ))}
        </Box>

        {/* Auth controls */}
        <Box className="hidden md:flex items-center space-x-3">
          {isSignedIn ? (
            <>
              <Text>Hi, {displayName}</Text>
              <Button variant="outline" size="small" onClick={handleSignOut}>
                Sign out
              </Button>
            </>
          ) : (
            <Link
              href="/login"
              className="px-3 py-2 rounded-md text-lg font-medium hover:text-accent text-primary transition duration-200"
            >
              Log in
            </Link>
          )}
        </Box>

        {/* Hamburger Icon */}
        <Box className="md:hidden">
          <Button onClick={toggleMenu} variant="ghost" className="text-primary">
            {isOpen ? (
              <FaTimes className="h-6 w-6" />
            ) : (
              <FaBars className="h-6 w-6" />
            )}
          </Button>
        </Box>
      </Box>

      {/* Mobile Menu */}
      {isOpen && (
        <Box className="md:hidden">
          <Menu>
            <MenuItems static className="px-4 pt-2 pb-3 space-y-1 text-primary">
              {primaryNavItems.map(item => (
                <MenuItem key={item.route}>
                  <Link
                    href={item.route}
                    className={`block px-3 py-2 rounded-md text-lg font-medium ${
                      pathname === item.route ||
                      pathname === item.secondaryRoute
                        ? 'bg-secondary text-white hover:text-white'
                        : 'hover:text-accent text-primary'
                    } transition duration-200`}
                    onClick={toggleMenu}
                  >
                    {item.name}
                  </Link>
                </MenuItem>
              ))}
              <MenuItem>
                {isSignedIn ? (
                  <Button
                    variant="ghost"
                    className="block px-3 py-2 text-lg font-medium text-primary"
                    onClick={handleSignOut}
                  >
                    Sign out ({displayName})
                  </Button>
                ) : (
                  <Link
                    href="/login"
                    className="block px-3 py-2 rounded-md text-lg font-medium hover:text-accent text-primary transition duration-200"
                    onClick={toggleMenu}
                  >
                    Log in
                  </Link>
                )}
              </MenuItem>
            </MenuItems>
          </Menu>
        </Box>
      )}
    </nav>
  )
}

export default Navbar
