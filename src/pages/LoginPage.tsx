import React from 'react'
import NavBar from '../components/Navbar/NavBar';
import Login from '../components/Login';

const LoginPage = () => {
  return (
    <div>
      <nav>
        <NavBar />
      </nav>
      <h1>Login</h1>
      
      <Login />
      
    </div>
  )
}

export default LoginPage;