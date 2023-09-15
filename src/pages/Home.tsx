import Card from "../components/Card/Card";
import { useProductContext } from "../context/productContext"
import Skeleton from "react-loading-skeleton"
import 'react-loading-skeleton/dist/skeleton.css'

const Home = () => {

  const { products, loading } = useProductContext();
  const displayedProducts = products.slice(2, 6)


  return (
    <>
      <div className='my-5'>
        <h2 className='text-center my-5'>
          BEST SELLERS THIS WEEK
        </h2>
        <div className='d-flex flex-wrap gap-5 justify-content-center'>
          {loading && Array.from({ length: 4 }).map((_, index) => (
            <div key={index} className='card shadow' style={{ width: '15rem', height: '430px' }}>
              <div className='image-container' style={{ padding: '1rem', cursor: 'pointer' }}>
                <Skeleton width={200} height={280} />
              </div>
              <div className='card-body d-flex flex-column'>
                <h5 className='card-title'>
                  <Skeleton count={2} />
                </h5>
                <div className='d-flex align-items-center justify-content-between mt-auto'>
                  <Skeleton containerClassName='flex-1' />
                </div>
              </div>
            </div>
          ))}
          {displayedProducts.map((product, index) => <Card key={index} product={product} />)}
        </div>
      </div>
    </>
  );
}

export default Home