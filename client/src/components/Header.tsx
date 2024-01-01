import { Link } from 'react-router-dom';
import { FaSearch, FaShoppingBag, FaSignInAlt, FaSignOutAlt, FaUser } from 'react-icons/fa';
import { useState } from 'react';

const user = { _id: 'aa', role: 'admin' };

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const logoutHandler = () => {};

  return (
    <nav className='header'>
      <Link onClick={() => setIsOpen(false)} to='/'>
        Home
      </Link>
      <Link onClick={() => setIsOpen(false)} to='/search'>
        <FaSearch />
      </Link>
      <Link onClick={() => setIsOpen(false)} to='/cart'>
        <FaShoppingBag />
      </Link>
      {user._id ? (
        <>
          <button onClick={() => setIsOpen((p) => !p)}>
            <FaUser />
          </button>
          <dialog open={isOpen}>
            <div>{user.role === 'admin' && <Link to='/admin/dashboard'>Admin</Link>}</div>
            <Link onClick={() => setIsOpen(false)} to='/orders'>
              Order
            </Link>
            <button onClick={logoutHandler}>
              <FaSignOutAlt />
            </button>
          </dialog>
        </>
      ) : (
        <Link to='/login'>
          <FaSignInAlt />
        </Link>
      )}
    </nav>
  );
};

export default Header;
