import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import 'bootstrap/dist/css/bootstrap.min.css';
import { ProductProvider } from "./context/ProductContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Cart from "./pages/Cart";
import { AuthProvider } from "./context/AuthContext";
import Register from "./pages/RegisterPage";
import Login from "./pages/LoginPage";
import Logout from "./pages/LogoutPage";
import { Navbar } from "react-bootstrap";
import ProductPage from "./pages/ProductPage";
import EditProductPage from "./pages/EditProductPage";
import EditProductForm from './components/EditProductForm';

const client = new QueryClient()

function App() {

  return (
    <QueryClientProvider client={client}>
      <ProductProvider>
        <AuthProvider>
          <BrowserRouter>
            {/*<Navbar> Navbar is imported to each page as a component right now*/}
            <Routes>
              <Route path='/' element = {<Home />} />
              <Route path='/profile' element = {<Profile />} />
              <Route path='/product' element = {<ProductPage />} />
              <Route path='/editProduct' element= {<EditProductPage />} />
              <Route path='/cart' element = {<Cart />} />
              <Route path='/register' element = {<Register />} />
              <Route path='/login' element = {<Login />} />
              <Route path='/logout' element = {<Logout />} />
              <Route path='/edit/:id' element = {<EditProductForm />} />
            </Routes>
            {/*</Navbar>*/}
          </BrowserRouter>
        </AuthProvider>
      </ProductProvider>
    </QueryClientProvider>
  )
}

export default App
