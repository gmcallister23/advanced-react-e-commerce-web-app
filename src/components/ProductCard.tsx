import type { Product } from '../types/types';
import { Rating } from '@smastrom/react-rating';
import { useDispatch } from 'react-redux';
import { addItem } from '../cart/cartSlice';
import type { CartItem } from '../types/types';



const ProductCard: React.FC<{product: Product}> = ({product}) => {

  const  dispatch = useDispatch();
  const toCartItem = (product: Product): CartItem => ({
    id: product.id,
    title: product.title,
    price: product.price,
    image: product.image,
    quantity: 1,

  })

  return (
    <div className="col-md-4 p-2 d-flex flex-column align-items-center gap-3 shadow-sm border rounded">
        <h3>{product.title}</h3>
        <img src={product.image} alt={product.title} className="w-25 "/>
        <h5>${product.price}</h5>
        <h5 className="bg-secondary-subtle p-2 border rounded">{product.category.toUpperCase()}</h5>
        <Rating style={{ maxWidth: 250 }} value={product.rating.rate} readOnly />
        <p>{product.description}</p>
        <button onClick={() => {console.log("Added to cart", product);
        console.log("CART ITEM BEING SENT", toCartItem(product))
        dispatch(addItem(toCartItem(product)))}}>Add to Cart</button>
    </div>
  )
}

export default ProductCard;