import { Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';

const demo = {
  productId: '12',
  photo: 'https://chisellabs.com/blog/wp-content/uploads/2022/05/What-is-a-Product.png',
  name: 'string',
  price: 24,
  stock: 4,
};

const Home = () => {
  const addToCartHandler = () => {};
  return (
    <div className='home'>
      <section></section>

      <h1>
        Latest Product
        <Link to='/search' className='findmore'>
          More
        </Link>
      </h1>

      <main>
        <ProductCard {...demo} handler={addToCartHandler} />
      </main>
    </div>
  );
};

export default Home;
