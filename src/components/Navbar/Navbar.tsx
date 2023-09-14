import { Link, NavLink } from 'react-router-dom'
import ShoppingCart from '../ShoppingCart/ShoppingCart'
import { BsCart } from 'react-icons/bs'
import { useCart } from '../../context/cartContext'

const Navbar = () => {

  const { cart } = useCart()

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <Link className="navbar-brand" to='/'>Electronics Galore</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavDropdown">
          <ul className="navbar-nav">
            <li className="nav-item">
              <NavLink className="nav-link active" aria-current="page" to='/'>Home</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to='/products'>Products</NavLink>
            </li>
          </ul>
        </div>
        <div className="ml-auto">
          <ul className="navbar-nav">
            <li className="nav-item dropdown">
              <span className="nav-link" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                <BsCart size={20} />
                {cart.totalItems > 0 &&
                  <span className='position-absolut start-100 top-0 translate-middle badge rounded-pill bg-danger'>{cart.totalItems}</span>
                }
              </span>
              <ul className="dropdown-menu dropdown-menu-end shopping-cart">
                <ShoppingCart />
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Navbar