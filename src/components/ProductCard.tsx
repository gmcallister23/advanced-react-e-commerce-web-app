import type { Product } from '../types/types';
import { Rating } from '@smastrom/react-rating';


const ProductCard: React.FC<{product: Product}> = ({product}) => {
  return (
    <div className="col-md-4 p-2 d-flex flex-column align-items-center gap-3 shadow-sm border rounded">
        <h3>{product.title}</h3>
        <img src={product.image} alt={product.title} className="w-25 "/>
        <h5>${product.price}</h5>
        <h5 className="bg-secondary-subtle p-2 border rounded">{product.category.toUpperCase()}</h5>
        return <Rating style={{ maxWidth: 250 }} value={product.rating.rate} readOnly />
        <p>{product.description}</p>
    </div>
  )
}

export default ProductCard;