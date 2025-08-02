import { Link, useLocation } from 'react-router-dom'
import { useState, useRef, useEffect } from 'react'

export default function Navbar() {
  const location = useLocation()
  const [profileOpen, setProfileOpen] = useState(false)
  const [profilePic, setProfilePic] = useState(null)
  const profileRef = useRef(null)

  // Only Home and Dashboard in main nav
  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Dashboard', path: '/dashboard' },
  ]

  // Close dropdown if clicked outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setProfileOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  useEffect(() => {
    const pic = localStorage.getItem('profilePic')
    setProfilePic(pic)
  }, [])

  return (
    <nav className="bg-secondary text-dominant shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-accent rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">Q</span>
            </div>
            <span className="text-xl font-bold tracking-wide">QuiSol</span>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex space-x-8 items-center">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                  location.pathname === item.path
                    ? 'bg-accent text-white'
                    : 'text-dominant hover:text-accent hover:bg-white hover:bg-opacity-10'
                }`}
              >
                {item.name}
              </Link>
            ))}

            {/* Profile Dropdown */}
            <div className="relative" ref={profileRef}>
              <button
                onClick={() => setProfileOpen((open) => !open)}
                className="ml-4 flex items-center justify-center w-10 h-10 rounded-full bg-accent text-white focus:outline-none"
              >
                {profilePic ? (
                  <img
                    src={profilePic}
                    alt="Profile"
                    className="w-10 h-10 rounded-full object-cover"
                  />
                ) : (
                  // Simple user icon SVG
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5.121 17.804A9 9 0 1112 21a9 9 0 01-6.879-3.196z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                )}
              </button>
              {profileOpen && (
                <div className="absolute right-0 mt-2 w-40 bg-white rounded-md shadow-lg py-2 z-20">
                  <Link
                    to="/login"
                    className="block px-4 py-2 text-gray-700 hover:bg-accent hover:text-white"
                    onClick={() => setProfileOpen(false)}
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    className="block px-4 py-2 text-gray-700 hover:bg-accent hover:text-white"
                    onClick={() => setProfileOpen(false)}
                  >
                    Register
                  </Link>
                </div>
              )}
            </div>
          </div>

          {/* Mobile menu button (unchanged) */}
          <div className="md:hidden">
            <button className="text-dominant hover:text-accent">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </nav>
  )
}
