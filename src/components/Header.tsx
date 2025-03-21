import React from 'react'
import Button from './Button'
import { useRouter } from 'next/navigation';

const Header = () => {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    router.push('/login');
  };
  
  return (
    <header className='bg-gray-50 text-black'>
      <div className='container px-4 md:px-0 mx-auto flex items-center justify-between w-full h-20'>
        <h1 className='font-semibold text-lg'>My Note App</h1>
        <Button onClick={handleLogout} title="Logout" type="button" />
      </div>
    </header>
  )
}

export default Header