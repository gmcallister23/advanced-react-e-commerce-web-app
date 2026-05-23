import React from 'react'
import NavBar from '../components/Navbar/NavBar';
import Login from '../components/Login';

const LoginPage = () => {
  return (
    <div className='pt-5'>
      <nav>
        <NavBar />
      </nav>
      
      <Login />
      
    </div>
  )
}

export default LoginPage;