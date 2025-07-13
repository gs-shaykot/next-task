'use client';

import Link from 'next/link';
import React, { useContext } from 'react';
import { Pacifico } from 'next/font/google';
import { usePathname, useRouter } from 'next/navigation';
import { AuthContext } from '../context/AuthProvider';

const pacifico = Pacifico({
  subsets: ['latin'],
  weight: ['400'],
});

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { user, logOut } = useContext(AuthContext);

  // Hide Navbar on /login and /signup
  if (pathname === '/login' || pathname === '/signup') {
    return null;
  }

  const handleLogout = async () => {
    try {
      await logOut();
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const NavItems = () => (
    <>
      <li><Link href="/" className="font-semibold">Home</Link></li>
      <li><Link href="/colleges" className="font-semibold">Colleges</Link></li>
      <li><Link href={user ? "/admission" : "/login"} className="font-semibold">Admission</Link></li>
      {
        user ?
          <li><Link href="/myColleges" className="font-semibold">My College</Link></li> :
          <></>
      }

    </>
  );

  return (
    <div>
      <div className="container mx-auto navbar bg-base-100 shadow-sm">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              <NavItems />
            </ul>
          </div>
          <Link href="/" className={`text-2xl font-bold ${pacifico.className} text-blue-600`}>
            CollegeHub
          </Link>
        </div>

        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            <NavItems />
          </ul>
        </div>

        <div className="navbar-end">
          {user?.email ? (
            <div className="dropdown dropdown-end">
              <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                <div className="w-10 rounded-full">
                  <img alt="Profile" src={user?.photoURL} referrerPolicy="no-referrer" />
                </div>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
              >
                <li><a>Profile</a></li>
                <li>
                  <button onClick={handleLogout}>Logout</button>
                </li>
              </ul>
            </div>
          ) : (
            <Link href="/login" className="btn btn-primary text-white">Login</Link>
          )}
        </div>
      </div>
    </div>
  );
}
