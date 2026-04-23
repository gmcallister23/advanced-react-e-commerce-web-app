import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import 'bootstrap/dist/css/bootstrap.min.css';
import { ProductProvider } from "./context/ProductContext";

function App() {
  

  return (
    <ProductProvider>
    <BrowserRouter>
      <Routes>
        <Route path='/' element = {<Home />} />
        <Route path='/profile' element = {<Profile />} />
      </Routes>
    </BrowserRouter>
    </ProductProvider>
  )
}

export default App
