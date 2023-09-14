import { Link, NavLink } from 'react-router-dom'
import ShoppingCart from '../ShoppingCart/ShoppingCart'
import { BsCart } from 'react-icons/bs'

const Navbar = () => {
  return (
    // <nav className="navbar navbar-expand-lg bg-body-tertiary">
    //   <div className="container-fluid">
    //     <Link className="navbar-brand" to="/">Electronics Galore</Link>
    //     <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
    //       <span className="navbar-toggler-icon"></span>
    //     </button>
    //     <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
    //       <div className="navbar-nav">
    //         <NavLink className="nav-link" aria-current="page" to="/">Home</NavLink>
    //         <NavLink className="nav-link" to="/products">Products</NavLink>
    //       </div>
    //     </div>
    //     <ShoppingCart />
    //   </div>
    // </nav>

    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <Link className="navbar-brand" to='/'>Electronics Galore</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavDropdown">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <NavLink className="nav-link active" aria-current="page" to='/'>Home</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to='/products'>Products</NavLink>
            </li>
            <li className="nav-item dropdown">
              <span className="nav-link" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                <BsCart />
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