import React from 'react'
import NavBar from '../components/Navbar/NavBar';
import Logout from '../components/Logout';

const LogoutPage  = () => {
  return (
    <div>
        <nav>
            <NavBar />
        </nav>

        <h1>Logout</h1>
        <Logout />
    </div>
  )
}

export default LogoutPage;