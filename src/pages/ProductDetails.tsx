import { BsCart } from "react-icons/bs"
import { useProductContext } from "../context/productContext"
import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import Skeleton from "react-loading-skeleton"
import 'react-loading-skeleton/dist/skeleton.css'
import axios from "axios"

const Products = () => {

  const { productId } = useParams()
  const parsedProductId = parseInt(productId || "", 10);
  const { loading, setLoading } = useProductContext()
  const [product, setProduct] = useState<Product | null>(null)

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const res = await axios.get(`https://fakestoreapi.com/products/${parsedProductId}`)
        setProduct(res.data)
        setLoading(false)
      } catch (error) {
        console.log('Error fetching product by ID: ', error);
        setLoading(true)
      }
    };

    fetchProductDetails();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [parsedProductId])

  return (
    <div className='my-5'>
      <h2 className='text-center my-5'>Product details</h2>
      <div className='d-flex justify-content-center'>
        <div className="card shadow" style={{ width: '35rem', height: '430px' }}>
          <div className="image-container" style={{ padding: '1rem', cursor: 'pointer' }}>
            {loading ? (
              <Skeleton width={200} height={280} />
            ) : (
              <img
                src={product?.image}
                className="card-img-top" loading="lazy" />
            )}
          </div>
          <div className="card-body d-flex flex-column">
            <h5 className="card-title">
              {loading ? (
                <Skeleton count={2} />
              ) : (
                product?.title
              )}
            </h5>
            <div className='d-flex align-items-center justify-content-between mt-auto'>
              {loading ? (
                <Skeleton containerClassName='flex-1' />
              ) : (
                <>
                  {product?.price} USD
                  <BsCart size={20} style={{ cursor: 'pointer' }} />
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Products