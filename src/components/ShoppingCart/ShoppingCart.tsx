import './ShoppingCart.scss';
import { useCart } from '../../context/cartContext';
import CartProduct from './CartProduct';

const ShoppingCart = () => {

  const { cart } = useCart()
  console.log(cart);

  return (
    <div onClick={e => e.stopPropagation()}>
      {cart.totalItems < 1 && (
        <div className='p-2 text-center'>
          Your cart is empty!
        </div>
      )}
      {cart.items.map(item => <CartProduct key={'cart' + item.product.id} item={item} />)}
      <div className="dropdown-divider"></div>
      <div className="d-flex justify-content-between align-items-center p-2">
        <div>
          <p className='m-0'>Total Price: {cart.totalPrice}</p>
        </div>
        <div>
          <button className='btn btn-warning'>Clear Cart</button>
          <button className='btn btn-info ms-2'>Checkout</button>
        </div>
      </div>
    </div>
  )
}

export default ShoppingCart