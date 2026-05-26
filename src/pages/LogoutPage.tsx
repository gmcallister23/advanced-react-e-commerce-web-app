//import React from 'react'
import NavBar from '../components/Navbar/NavBar';
import Logout from '../components/Logout';

const LogoutPage  = () => {
  return (
    <div className='bg-warning-subtle vh-100'>
        <nav>
            <NavBar />
        </nav>
        <div className='flex-column align-items-center text-center'>
        <h1>Logout</h1>
        <Logout />
        </div>
    </div>
  )
}

export default LogoutPage;