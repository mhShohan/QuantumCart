import { Link } from 'react-router-dom';
import { FaTrash } from 'react-icons/fa';

type ProductProps = {
  productId: string;
  photo: string;
  name: string;
  price: number;
  quantity: number;
  stock: number;
};

const CartItem = ({ productId, price, photo, name, quantity }: ProductProps) => {
  return (
    <div className='cart-item'>
      <img src={photo} alt={name} />
      <article>
        <Link to={`/product/${productId}`}>{name}</Link>
        <span>${price}</span>
      </article>
      <div>
        <button>-</button>
        <p>{quantity}</p>
        <button>+</button>
      </div>
      <button>
        <FaTrash />
      </button>
    </div>
  );
};

export default CartItem;
