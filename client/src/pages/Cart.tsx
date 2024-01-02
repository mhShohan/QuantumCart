import { useEffect, useState } from 'react';
import { VscError } from 'react-icons/vsc';
import CartItem from '../components/CartItem';
import { Link } from 'react-router-dom';

const cartItems = [
  {
    productId: '12',
    photo:
      'data:image/jpeg;base64,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',
    name: 'string',
    price: 24,
    quantity: 2,
    stock: 4,
  },
];
const subTotal = 4000;
const tax = Math.round(subTotal * 0.18);
const shippingCharges = 200;
const discount = 300;
const total = subTotal + tax + shippingCharges;

const Cart = () => {
  const [couponCode, setCouponCode] = useState('');
  const [isValidCouponCode, setIsValidCouponCode] = useState(false);

  useEffect(() => {
    const timeOutId = setTimeout(() => {
      if (couponCode === 'MH10') {
        setIsValidCouponCode(true);
      }
    }, 1000);

    return () => {
      clearTimeout(timeOutId);
      setIsValidCouponCode(false);
    };
  }, [couponCode]);

  return (
    <div className='cart'>
      <main>
        {cartItems.length > 0 ? (
          cartItems.map((item) => <CartItem key={item.productId} {...item} />)
        ) : (
          <h1 className='red'>No Product added in Cart!</h1>
        )}
      </main>
      <aside>
        <p>Subtotal: ${subTotal}</p>
        <p>Shipping Charges: ${shippingCharges}</p>
        <p>Tax: ${tax}</p>
        <p>
          Discount: <em>${discount}</em>
        </p>
        <p>
          <b>Total: ${total}</b>
        </p>
        <input
          type='text'
          placeholder='Coupon Code!'
          value={couponCode}
          onChange={(e) => setCouponCode(e.target.value)}
        />
        {couponCode &&
          (isValidCouponCode ? (
            <span className='green'>You got ${discount} discount</span>
          ) : (
            <span className='red'>
              Invalid Coupon Code! <VscError />
            </span>
          ))}
        {cartItems.length > 0 && <Link to='/shipping'>Checkout</Link>}
      </aside>
    </div>
  );
};

export default Cart;
