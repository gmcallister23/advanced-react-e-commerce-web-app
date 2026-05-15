import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import 'bootstrap/dist/css/bootstrap.min.css';
import { ProductProvider } from "./context/ProductContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Cart from "./pages/Cart";
import { AuthProvider } from "./context/AuthContext";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Logout from "./pages/Logout";

const client = new QueryClient()

function App() {

  return (
    <QueryClientProvider client={client}>
      <ProductProvider>
        <AuthProvider>
          <BrowserRouter>
            <Routes>
              <Route path='/' element = {<Home />} />
              <Route path='/profile' element = {<Profile />} />
              <Route path='/cart' element = {<Cart />} />
              <Route path='/register' element = {<Register />} />
              <Route path='/login' element = {<Login />} />
              <Route path='/cart' element = {<Logout />} />

            </Routes>
          </BrowserRouter>
        </AuthProvider>
      </ProductProvider>
    </QueryClientProvider>
  )
}

export default App
