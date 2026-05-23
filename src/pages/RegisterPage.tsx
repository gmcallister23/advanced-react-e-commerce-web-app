import React from 'react'
import NavBar from '../components/Navbar/NavBar';
import Register from '../components/Register';

const RegisterPage = () => {
  return (
    <div className='pt-5'>
        
        <nav>
            <NavBar />
        </nav>
        
        <Register />
    </div>
  )
}

export default RegisterPage;