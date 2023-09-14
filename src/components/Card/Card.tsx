import { Link } from 'react-router-dom';
import './Card.scss';
import { BsCart } from 'react-icons/bs'
import { useProductContext } from '../../context/productContext';
import Skeleton from "react-loading-skeleton"
import 'react-loading-skeleton/dist/skeleton.css'
import { useCart } from '../../context/cartContext';



const Card = ({ product }: CardProps) => {

  const { loading } = useProductContext()
  const { addToCart } = useCart()

  const handleAddToCart = () => {
    console.log('Adding product to cart:', product);
    addToCart(product);
  };


  const maxTitleLength = 25

  const truncatedTitle =
    product.title.length > maxTitleLength
      ? product.title.slice(0, maxTitleLength) + '...'
      : product.title;

  return (
    <>
      <div className="card shadow" style={{ width: '15rem', height: '430px' }}>
        <Link to={`/products/${product.id}`}
          className="image-container"
          style={{ padding: '1rem', cursor: 'pointer' }}>
          {
            loading ? (
              <Skeleton width={200} height={280} />
            ) : (
              <img
                src={product?.image}
                className="card-img-top" loading="lazy"
              />
            )
          }
        </Link>
        <div className="card-body d-flex flex-column">
          <h5 className="card-title" title={product.title}>
            {
              loading ? (
                <Skeleton count={2} />
              ) : (
                truncatedTitle
              )
            }
          </h5>
          <div className='d-flex align-items-center justify-content-between mt-auto'>
            {
              loading ? (
                <Skeleton containerClassName='flex-1' />
              ) : (
                <>
                  USD {product.price}
                  <BsCart size={20} onClick={handleAddToCart} style={{ cursor: 'pointer' }} />
                </>
              )
            }
          </div>
        </div>
      </div>
    </>
  )
}

export default Card