// components/SignupForm.tsx
'use client';

import { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

export default function Signup() {
  const [formData, setFormData] = useState({
    email: '',
    fname: '',
    lname: '',
    username: '',
    gender: '',
    passwort: '',
    confirmPassword: '',
    role: '',
  });

  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (e ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
   setError('');
  setMessage('');
  };

 const handleSubmit = async (e) => {
  e.preventDefault();
  setError('');
  setMessage('');

  if (formData.passwort !== formData.confirmPassword) {
    setError('Passwords did not match');
    return;
  }

  const { confirmPassword, ...dataToSend } = formData;
  try {
    const res = await fetch('http://localhost:8081/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(dataToSend),
    });

    if (!res.ok) {
      // Error response is plain text
      console.log("here")
      const text = await res.text();
      setError(text.trim() || 'Signup failed');
      return;
    }

    // Success response is JSON
    const data = await res.json();
    setMessage(data.message || 'Account created successfully!');

  } catch (err) {
    setError('Network error: ' + err.message);
  }
};

  return (
    <>
      <div className="flex flex-col justify-start mb-0">
        <form
          onSubmit={handleSubmit}
          className="max-w-md w-full mx-auto py-15 px-4 text-center text-gray-800 bg-fuchsia-50 rounded shadow-2xl shadow-emerald-400 space-y-3 font-sans text-sm"
        >
          <h2 className="text-xl font-semibold mb-2">Sign Up</h2>

          <div className="flex flex-col gap-4">
            <div className="flex flex-col items-start w-full">
              <label className="font-bold mb-0.5 text-xs" htmlFor="firstName">First Name</label>
              <input
                id="firstName"
                type="text"
                name="fname"
                placeholder="First Name"
                value={formData.fname}
                onChange={handleChange}
                className="border border-gray-300 px-2 py-1 rounded w-full text-xs focus:border-blue-400 focus:ring-2 focus:ring-blue-400 focus:outline-none"
              />
            </div>
            <div className="flex flex-col items-start w-full">
              <label className="font-bold mb-0.5 text-xs" htmlFor="lastName">Last Name</label>
              <input
                id="lastName"
                type="text"
                name="lname"
                placeholder="Last Name"
                value={formData.lname}
                onChange={handleChange}
                className="border border-gray-300 px-2 py-1 rounded w-full text-xs focus:border-blue-400 focus:ring-2 focus:ring-blue-400 focus:outline-none"
              />
            </div>
          </div>

          <div className="flex flex-col items-start w-full">
            <label className="font-bold mb-0.5 text-xs flex items-center gap-1" htmlFor="email">
              Email <span className="text-red-500">*</span>
            </label>
            <input
              id="email"
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 px-2 py-1 rounded text-xs focus:border-blue-400 focus:ring-2 focus:ring-blue-400 focus:outline-none"
            />
          </div>

          <div className="flex flex-col items-start w-full">
            <label className="font-bold mb-0.5 text-xs flex items-center gap-1" htmlFor="username">
              Username <span className="text-red-500">*</span>
            </label>
            <input
              id="username"
              type="text"
              name="username"
              placeholder="Username"
              value={formData.username}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 px-2 py-1 rounded text-xs focus:border-blue-400 focus:ring-2 focus:ring-blue-400 focus:outline-none"
            />
          </div>

          <div className="flex flex-col items-start gap-1">
            <label className="font-bold mb-0.5 text-xs flex items-center gap-1">Gender</label>
            <div className="flex gap-2">
              <label className="flex items-center gap-1 text-xs">
                <input
                  type="radio"
                  name="gender"
                  value="male"
                  checked={formData.gender === 'male'}
                  onChange={handleChange}
                  required
                  className="focus:outline-none"
                />
                Male
              </label>
              <label className="flex items-center gap-1 text-xs">
                <input
                  type="radio"
                  name="gender"
                  value="female"
                  checked={formData.gender === 'female'}
                  onChange={handleChange}
                  className="focus:outline-none"
                />
                Female
              </label>
              <label className="flex items-center gap-1 text-xs">
                <input
                  type="radio"
                  name="gender"
                  value="other"
                  checked={formData.gender === 'other'}
                  onChange={handleChange}
                  className="focus:outline-none"
                />
                Other
              </label>
            </div>
          </div>

          <div className="flex flex-col gap-2 w-full">
            <div className="flex flex-col items-start w-full">
              <label className="font-bold mb-0.5 text-xs flex items-center gap-1" htmlFor="password">
                Password <span className="text-red-500">*</span>
              </label>
              <div className="relative w-full">
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  name="passwort"
                  placeholder="Password"
                  value={formData.passwort}
                  onChange={handleChange}
                  required
                  className="border border-gray-300 px-2 py-1 rounded text-xs w-full pr-8 focus:border-blue-400 focus:ring-2 focus:ring-blue-400 focus:outline-none"
                />
                <button
                  type="button"
                  tabIndex={-1}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
                  onClick={() => setShowPassword((prev) => !prev)}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <FaEyeSlash size={16} /> : <FaEye size={16} />}
                </button>
              </div>
            </div>
            <div className="flex flex-col items-start w-full">
              <label className="font-bold mb-0.5 text-xs flex items-center gap-1" htmlFor="confirmPassword">
                Confirm Password <span className="text-red-500">*</span>
              </label>
              <div className="relative w-full">
                <input
                  id="confirmPassword"
                  type={showConfirmPassword ? 'text' : 'password'}
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                  className="border border-gray-300 px-2 py-1 rounded text-xs w-full pr-8 focus:border-blue-400 focus:ring-2 focus:ring-blue-400 focus:outline-none"
                />
                <button
                  type="button"
                  tabIndex={-1}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
                  onClick={() => setShowConfirmPassword((prev) => !prev)}
                  aria-label={showConfirmPassword ? 'Hide password' : 'Show password'}
                >
                  {showConfirmPassword ? <FaEyeSlash size={16} /> : <FaEye size={16} />}
                </button>
              </div>
            </div>
          </div>

          <div className="flex flex-col items-start">
            <label className="font-bold mb-0.5 text-xs flex items-center gap-1" htmlFor="role">
              Role <span className="text-red-500">*</span>
            </label>
            <select
              id="role"
              name="role"
              value={formData.role}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 px-2 py-1 rounded text-xs focus:border-blue-400 focus:ring-2 focus:ring-blue-400 focus:outline-none"
            >
              <option value="" disabled className="text-xs py-1">Select Role</option>
              <option value="Student" className="text-xs py-1">Student</option>
              <option value="creator" className="text-xs py-1">Course creator</option>
  
            </select>
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}
          {message && <p className="text-green-500 text-sm">{message}</p>}

          <button
            type="submit"
            className="w-2/4 h-10 mx-auto block bg-gray-400 text-white py-1.5 rounded transition-colors duration-300 hover:bg-blue-600 hover:text-white text-sm"
          >
            Create Account
          </button>
        </form>
      </div>
    </>
  );
}
