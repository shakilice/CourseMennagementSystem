import Link from "next/link";
import Image from "next/image";
import { useState, useRef, useEffect } from "react";

export default function CustomLayout({ user }) {
  const [open, setOpen] = useState(false);
  const menuRef = useRef();

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setOpen(false);
      }
    }
    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  return (
    <div className="bg-gray-800 text-white p-2 flex items-center justify-between text-sm  top-0 left-0 w-full z-[100] shadow-lg">
      <h1 className="text-base font-semibold">
        <Link href="/" className="text-inherit no-underline">Eassy larning</Link>
      </h1>
      <div className="flex gap-2 items-center">
        {user ? (
          <>
            <span className="font-semibold">Hi, {user}</span>
            <div className="relative" ref={menuRef}>
              <button
                onClick={() => setOpen((v) => !v)}
                className="focus:outline-none"
                aria-label="Open profile menu"
                type="button"
              >
                <Image
                  src="/profile.png"
                  alt="Profile"
                  width={48}
                  height={48}
                  className="rounded-full border border-white ml-2 cursor-pointer"
                  style={{ objectFit: "cover" }}
                  priority
                />
              </button>
              {open && (
                <div className="absolute right-0 mt-2 w-44 bg-white text-gray-800 rounded shadow-lg z-50 py-2 animate-fade-in">
                  <Link
                    href="/profile"
                    className="block px-4 py-2 hover:bg-gray-100"
                    onClick={() => setOpen(false)}
                  >
                    Your Profile
                  </Link>
                  <Link
                    href="/profile/edit"
                    className="block px-4 py-2 hover:bg-gray-100"
                    onClick={() => setOpen(false)}
                  >
                    Edit Profile
                  </Link>
                  <button
                    className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-red-600"
                    onClick={() => {
                      setOpen(false);
                      // Add your logout logic here
                    }}
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          </>
        ) : (
          <>
            <Link href="/Login" className="bg-green-400 text-sm font-medium px-2 py-1 rounded hover:bg-green-500 transition">Login</Link>
            <Link href="/Signup" className="bg-blue-400 text-sm font-medium px-2 py-1 rounded hover:bg-blue-500 transition">Signup</Link>
          </>
        )}
      </div>
    </div>
  );
}