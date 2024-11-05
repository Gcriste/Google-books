"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Menu, MenuItems } from "@headlessui/react";
import { FaBars, FaTimes } from "react-icons/fa";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const toggleMenu = () => setIsOpen(!isOpen);

  const primaryNavItems = [
    { name: "Search", route: "/search", secondaryRoute: "/" },
    { name: "Favorites", route: "/favorites" },
    { name: "My Reviews", route: "/my-reviews" },
  ];

  return (
    <nav className="shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-16">
        {/* Logo */}
        <Link
          href="/"
          className="text-2xl font-bold hover:text-accent transition duration-200"
        >
          Google Books API
        </Link>

        {/* Primary Navigation */}
        <div className="hidden md:flex space-x-4">
          {primaryNavItems.map((item) => (
            <Link
              key={item.name}
              href={item.route}
              className={`px-3 py-2 rounded-md text-lg font-medium ${
                pathname === item.route || pathname === item.secondaryRoute
                  ? "bg-secondary text-white"
                  : "hover:text-accent text-primary"
              } transition duration-200`}
            >
              {item.name}
            </Link>
          ))}
        </div>

        {/* Hamburger Icon */}
        <div className="md:hidden">
          <button
            onClick={toggleMenu}
            className="text-white focus:outline-none"
          >
            {isOpen ? (
              <FaTimes className="h-6 w-6" />
            ) : (
              <FaBars className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <Menu as="div" className="md:hidden bg-secondary">
          <MenuItems static className="px-4 pt-2 pb-3 space-y-1 text-primary">
            {primaryNavItems.map((item) => (
              <MenuItems key={item.name}>
                {({ open }) => (
                  <Link
                    href={item.route}
                    className={`block px-3 py-2 rounded-md text-base font-medium ${
                      open ? "bg-primary" : "hover:text-accent"
                    } transition duration-200`}
                    onClick={() => setIsOpen(false)}
                  >
                    {item.name}
                  </Link>
                )}
              </MenuItems>
            ))}
          </MenuItems>
        </Menu>
      )}
    </nav>
  );
};

export default Navbar;
