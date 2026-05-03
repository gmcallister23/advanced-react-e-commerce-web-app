import type React from "react";
import { useProductContext } from "../context/ProductContext";
import type { Product } from "../types/types";
import NavBar from "../components/NavBar";

const Profile: React.FC = () => {

    const {products, selectedCategory, dispatch} = useProductContext();

    return (
        <div className="pt-5">
            
            <NavBar />
            
            {products.map((product:Product)=> (
            <h1>
                {product.title}
            </h1>
        ))}
        <h1>Hello</h1>
        </div>
    );

};
export default Profile;