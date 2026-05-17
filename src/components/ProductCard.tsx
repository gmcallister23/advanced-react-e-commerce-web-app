import type { Product } from '../types/types';
import { Rating } from '@smastrom/react-rating';
import { useDispatch, useSelector } from 'react-redux';
i//mport { addItem } from '../cart/cartSlice';
import type { CartItem } from '../types/types';
import { addItem } from '../api/cartApi';



const ProductCard: React.FC<{product: Product}> = ({product}) => {

  //const  dispatch = useDispatch();
  
  const user = useSelector((state: any) => state.auth.user)

  

  const toCartItem = (product: Product): CartItem => ({
    id: product.id,
    title: product.title,
    price: product.price,
    image: product.image,
    quantity: 1,

  })

  const handleAddItem = async () => {

      if (!user) return;

      const cartItem = toCartItem(product);

      await addItem(user.uid, cartItem);

  }
  

  return (
    <div className="col-12 col-sm-6 col-lg-4">
    <div className="d-flex flex-column align-items-center p-2 shadow-sm border rounded bg-secondary-subtle h-100 overflow-auto">
        <h3>{product.title}</h3>
        <img src={product.image || '/placeholder.png'}  alt={product.title} className="w-25 "/>
        <h5>${product.price}</h5>
        <h5 className="bg-dark-subtle p-2 shadow-sm border border-black rounded">{product.category.toUpperCase()}</h5>
        {/*<Rating style={{ maxWidth: 250 }} value={product.rating.rate} readOnly /> */}
        <p style={{ height: '150px', overflowY:'auto'}}>{product.description}</p>
        <button className="btn bg-success-subtle border-black shadow-md mt-auto"onClick={() => {console.log("Added to cart", product);
        console.log("CART ITEM BEING SENT", toCartItem(product))
        handleAddItem();}}>Add to Cart</button>
    </div>
    </div>
    
  )
}

export default ProductCard;

//Photo by <a href="https://www.shopify.com/stock-photos/@thombradley?utm_campaign=photo_credit&amp;utm_content=Browse+Free+HD+Images+of+Tan+Colored+Hat+On+Monochrome+Background&amp;utm_medium=referral&amp;utm_source=credit">Thom Bradley</a> from <a href="https://www.shopify.com/stock-photos/hat?utm_campaign=photo_credit&amp;utm_content=Browse+Free+HD+Images+of+Tan+Colored+Hat+On+Monochrome+Background&amp;utm_medium=referral&amp;utm_source=credit">Burst</a>

//Photo by <a href="https://www.shopify.com/stock-photos/@lightleaksin?utm_campaign=photo_credit&amp;utm_content=Free+Mens+Denim+Fashion+Image%3A+Stunning+Photography&amp;utm_medium=referral&amp;utm_source=credit">Samantha Hurley</a> from <a href="https://www.shopify.com/stock-photos/watch?utm_campaign=photo_credit&amp;utm_content=Free+Mens+Denim+Fashion+Image%3A+Stunning+Photography&amp;utm_medium=referral&amp;utm_source=credit">Burst</a>

//Photo by <a href="https://www.shopify.com/stock-photos/@sarahpflugphoto?utm_campaign=photo_credit&amp;utm_content=Browse+Free+HD+Images+of+Watch+With+Leather+Strap+Near+Leaves&amp;utm_medium=referral&amp;utm_source=credit">Sarah Pflug</a> from <a href="https://www.shopify.com/stock-photos/calendar?utm_campaign=photo_credit&amp;utm_content=Browse+Free+HD+Images+of+Watch+With+Leather+Strap+Near+Leaves&amp;utm_medium=referral&amp;utm_source=credit">Burst</a>