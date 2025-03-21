'use client'
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Button from '@/components/Button';
import Loading from '@/components/Loading';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (isLoggedIn) {
      router.push('/');
    }
    setTimeout(() => {
      setLoading(false);
    }, 100);
  }, [router]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    if (username === 'admin' && password === 'admin') {
      localStorage.setItem('isLoggedIn', 'true');
      router.push('/');
    } else {
      setError('Invalid username or password');
    }
  };

  if (loading) return <Loading />

  return (
    <div className="container mx-auto flex items-center justify-center h-screen">
      <div className="bg-white text-black mx-auto p-6 border rounded-md w-[400px]">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label htmlFor="username" className="block text-gray-700">Username</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md"
              placeholder="Username"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-700">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md"
              placeholder="Password"
            />
          </div>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <div className="flex justify-center mt-4">
            <Button big={true} title="Login" type="submit" />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
