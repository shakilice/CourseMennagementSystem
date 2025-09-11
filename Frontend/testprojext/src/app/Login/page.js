
'use client';

import Link from "next/link";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useRouter } from "next/navigation"; 
import { useAuth } from "../component/Context";

export default function Login() {
  const router=useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const {login }=useAuth();
  const [message,setMessage]=useState('')
  const [error ,setError]=useState('')
  const [formData, setFormData] = useState({
    username: "",
    passwort: ""
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setError('');
  setMessage('');
  };
  const handleSubmit = async (e) => {
  e.preventDefault();
  setError('');
  setMessage('');
  try {
    const res = await fetch('http://localhost:8081/userlogin/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });

    if (!res.ok) {
      // Error response is plain text
      console.log("here")
      const text = await res.text();
      setError(text.trim() || 'Login failed');
      return;
    }
     console.log("something")
    // Success response is JSON
    const data = await res.json();
     login(formData.username);
      router.push("/"); 
    setMessage(data.message || 'Login succesful!');

  } catch (err) {
    setError('server not response. Try again later');

  }
};
  return (
    <div className="flex min-h-screen items-center justify-center ">
      <form  onSubmit={handleSubmit} className="max-w-md w-full mx-auto p-6 bg-cyan-50 rounded-lg shadow-2xl shadow-emerald-300">
        <h2 className="text-2xl text-black text-center font-bold mb-10">Log in to your existing profile</h2>

        <div className="mb-4 flex gap-3">
          <label className="block text-sm font-bold text-gray-700 mb-1" htmlFor="username">
            User Name
          </label>
          <div className="flex-1">
            <input
              id="username"
              name="username"
              type="text"
              value={formData.username}
              onChange={handleChange}
              required
              placeholder="Email or Username"
              className="w-full border text-gray-700 border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              style={{ minWidth: 260, maxWidth: 400 }}
            />
          </div>
        </div>

        <div className="mb-4 flex gap-5">
          <label className="block text-sm font-bold text-gray-700 mb-1" htmlFor="passwort">
            Password
          </label>
          <div className="relative flex-1">
            <input
              id="passwort"
              name="passwort"
              type={showPassword ? "text" : "password"}
              required
              placeholder="Passwort"
              value={formData.passwort}
              onChange={handleChange}
              className="w-full text-gray-700 border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 pr-12"
              style={{ minWidth: 260, maxWidth: 400 }}
            />
            <button
              type="button"
              tabIndex={-1}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
              onClick={() => setShowPassword(prev => !prev)}
              aria-label={showPassword ? 'Hide password' : 'Show password'}
              style={{ background: "none", border: "none", padding: 0 }}
            >
              {showPassword ? <FaEyeSlash size={22} /> : <FaEye size={22} />}
            </button>
          </div>
        </div>
           {error && <p className="text-red-500 text-sm mb-0 text-center">{error}</p>}
          {message && <p className="text-green-500 text-sm  mb-0 text-center">{message}</p>}
        
        <div className="ml-20 flex mt-10 gap-1 text-gray-700 mb-2">
          <input type="checkbox" />
          <p>remember me for a month</p>
        </div>
        <button
          type="submit"
          className="ml-20 w-50 bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition"
        >
          Login
        </button>
        <Link href="/Forget_passwort" className=" w-40 ml-15 text-center text-blue-700">
          <p className="w-40 ml-20 text-blue-500">Forgot your passwort?</p>
        </Link>
      </form>
    </div>
  );
}