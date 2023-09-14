import { BsTrash } from 'react-icons/bs'
import { Link } from 'react-router-dom'
import { useCart } from '../../context/cartContext'

const CartProduct = ({ item }: CartProductProps) => {

  const { removeFromCart, incrementItem, decrementItem } = useCart()

  return (
    <div className='d-flex justify-content-between align-items-center p-2 gap-5'>
      <Link to={`/products/${item.product.id}`} className='d-flex align-items-center text-decoration-none text-dark'>
        <img src={item.product.image} alt={item.product.title} className='img-fluid cart-image' />
        <div>
          <p className="ms-2">{item.product.title}</p>
          <small className='ms-2'>{item.quantity} x {item.product.price}</small>
        </div>
      </Link>


      <div className='buttons d-flex gap-1'>
        <div className="btn-group btn-group-sm" role='group'>
          <button className='btn btn-sm btn-primary' onClick={() => decrementItem(item.product.id)}>-</button>
          <button className='btn btn-sm btn-primary' onClick={() => incrementItem(item.product.id)}>+</button>
        </div>
        <button className='btn btn-sm btn-danger' onClick={() => removeFromCart(item.product.id)}><BsTrash /></button>
      </div>
    </div>
  )
}

export default CartProduct