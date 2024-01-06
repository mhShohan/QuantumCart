import { ChangeEvent, useState } from 'react';
import { BiArrowBack } from 'react-icons/bi';
import { useNavigate } from 'react-router-dom';

const Shipping = () => {
  const navigate = useNavigate();
  const [shippingInfo, setShippingInfo] = useState({
    address: '',
    city: '',
    state: '',
    country: '',
    pinCode: '',
  });

  const changeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setShippingInfo((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  return (
    <div className='shipping'>
      <button className='back-btn' onClick={() => navigate('/cart')}>
        <BiArrowBack />
      </button>

      <form>
        <h1>Shipping Address</h1>
        <input
          required
          type='text'
          name='address'
          placeholder='Address'
          value={shippingInfo.address}
          onChange={changeHandler}
        />
        <input
          required
          type='text'
          name='city'
          placeholder='city'
          value={shippingInfo.city}
          onChange={changeHandler}
        />
        <input
          required
          type='text'
          name='state'
          placeholder='state'
          value={shippingInfo.state}
          onChange={changeHandler}
        />
        <input
          required
          type='text'
          name='country'
          placeholder='country'
          value={shippingInfo.country}
          onChange={changeHandler}
        />
        <input
          required
          type='text'
          name='pinCode'
          placeholder='pinCode'
          value={shippingInfo.pinCode}
          onChange={changeHandler}
        />
        <button type='submit'>Pay Now</button>
      </form>
    </div>
  );
};

export default Shipping;
