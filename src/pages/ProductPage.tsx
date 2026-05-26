import NavBar from "../components/Navbar/NavBar";
import AddProduct from "../components/AddProduct";

const ProductPage = () => {
    return (
        <div className='vh-100 pt-3 bg-warning-subtle'>
            <nav>
                <NavBar />
            </nav>        
    
            <AddProduct />
        </div>
    )
}

export default ProductPage;