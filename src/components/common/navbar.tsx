'use client'

import { useCallback, useState } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import Link from 'next/link'
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { FaBars, FaChevronDown, FaTimes } from 'react-icons/fa'
import { Box, Button, Text } from '.'
import { useUser } from '@/hooks/use-user'
import { signOut } from '@/lib/auth-client'

// Module scope: plain strings, so no new prop identity on each render.
const MENU_PANEL_CLASS =
  'absolute right-0 z-50 mt-2 w-44 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black/5 focus:outline-none'
const MENU_ITEM_CLASS =
  'block w-full px-4 py-2 text-left text-base text-primary transition duration-200 data-[focus]:bg-accent data-[focus]:text-secondary'
const MOBILE_ITEM_CLASS =
  'block w-full px-3 py-2 text-left rounded-md text-lg font-medium hover:text-accent text-primary transition duration-200'

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
    { name: 'Favorites', route: '/favorites', hidden: !isSignedIn },
    { name: 'My Reviews', route: '/my-reviews', hidden: !isSignedIn }
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
          {primaryNavItems
            .filter(item => !item.hidden)
            .map(filteredItem => (
              <Link
                key={filteredItem.name}
                href={filteredItem.route}
                className={`px-3 py-2 rounded-md text-lg font-medium ${
                  pathname === filteredItem.route ||
                  pathname === filteredItem.secondaryRoute
                    ? 'bg-secondary text-white hover:text-white'
                    : 'hover:text-accent text-primary'
                } transition duration-200`}
              >
                {filteredItem.name}
              </Link>
            ))}
        </Box>

        {/* Auth controls */}
        <Box className="hidden md:flex items-center space-x-3">
          {isSignedIn ? (
            <Menu as="div" className="relative">
              <MenuButton className="flex items-center gap-2 rounded-md px-2 py-1 text-primary hover:text-accent focus:outline-none transition duration-200">
                <Text>Hi, {displayName}</Text>
                <FaChevronDown className="h-3 w-3" aria-hidden />
              </MenuButton>
              <MenuItems className={MENU_PANEL_CLASS}>
                <MenuItem>
                  <Link href="/profile" className={MENU_ITEM_CLASS}>
                    Profile
                  </Link>
                </MenuItem>
                <MenuItem>
                  <button
                    type="button"
                    onClick={handleSignOut}
                    className={MENU_ITEM_CLASS}
                  >
                    Sign out
                  </button>
                </MenuItem>
              </MenuItems>
            </Menu>
          ) : (
            <Link
              href="/login"
              className={`px-3 py-2 rounded-md text-lg font-medium transition duration-200 ${
                pathname === '/login'
                  ? 'bg-secondary text-white hover:text-white'
                  : 'hover:text-accent text-primary'
              } 
              `}
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
              {isSignedIn ? (
                <>
                  <MenuItem>
                    <Link
                      href="/profile"
                      className={MOBILE_ITEM_CLASS}
                      onClick={toggleMenu}
                    >
                      Profile
                    </Link>
                  </MenuItem>
                  <MenuItem>
                    <button
                      type="button"
                      className={MOBILE_ITEM_CLASS}
                      onClick={handleSignOut}
                    >
                      Sign out ({displayName})
                    </button>
                  </MenuItem>
                </>
              ) : (
                <MenuItem>
                  <Link
                    href="/login"
                    className={MOBILE_ITEM_CLASS}
                    onClick={toggleMenu}
                  >
                    Log in
                  </Link>
                </MenuItem>
              )}
            </MenuItems>
          </Menu>
        </Box>
      )}
    </nav>
  )
}

export default Navbar
