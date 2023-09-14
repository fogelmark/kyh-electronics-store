import { BsCart } from 'react-icons/bs'
import './ShoppingCart.scss';

const ShoppingCart = () => {
  return (
    <div className="dropdown">
      <BsCart size={20} className="dropdown-toggle" type="button" data-bs-placement='bottom-end' data-bs-toggle="dropdown" aria-expanded="false" />
      <ul className="dropdown-menu dropdown-menu-end">
        <li><a className="dropdown-item" href="#">Action</a></li>
        <li><a className="dropdown-item" href="#">Another action</a></li>
        <li><a className="dropdown-item" href="#">Something else here</a></li>
        <li><p className='dropdown-item'>hej</p></li>
      </ul>
    </div>
  )
}

export default ShoppingCart