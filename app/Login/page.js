"use client"

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import toast, { Toaster } from 'react-hot-toast';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      // Replace this with your actual login logic
      const response = await fakeLogin(username, password);

      if (response.error) {
        toast.error("Login failed. Please check your credentials."); // Error toast
      } else {
        setTimeout(() => {
          window.location.reload();
        }, 1500);
        toast.success("You have been logged in successfully!"); // Success toast

        // Determine user role and redirect accordingly
        if (response.role === 'SuperAdmin') {
          router.push("/SuperAdmin");
        } else if (response.role === 'Hr') {
          router.push("/Hr");
        } else if (response.role === 'Finance') {
          router.push("/Finance");
        } else {
          router.push("/");
        }
      }
    } catch (e) {
      console.error(e);
      setError("Check your credentials and try again.");
      toast.error("An error occurred. Please try again."); // Catch-all error toast
    }
  }

  return (
    <div>
      <Toaster /> {/* Toaster component to render toast notifications */}
      <div className="min-h-full flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <img
            className="mx-auto h-12 w-auto"
            src="/logo1.png"
            alt="Workflow"
          />
         
          
        </div>
        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <form className="space-y-6" onSubmit={handleLogin}>
              <div>
                <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                  Username
                </label>
                <div className="mt-1">
                  <input
                    id="username"
                    name="username"
                    type="text"
                    autoComplete="username"
                    required
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <div className="mt-1">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Sign in
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
async function fakeLogin(username, password) {
  // Simulate a login request
  return new Promise((resolve) => {
    setTimeout(() => {
      const users = [
        { username: 'admin', password: 'admin', role: 'SuperAdmin' },
        { username: 'user', password: 'user', role: 'Finance' },
        { username: 'john', password: 'doe123', role: 'Hr' },
   
      ];

      const user = users.find(u => u.username === username && u.password === password);

      if (user) {
        resolve({ role: user.role });
      } else {
        resolve({ error: 'Invalid credentials' });
      }
    }, 1000);
  });
}