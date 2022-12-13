import { NavLink } from 'react-router-dom';
import { useContext } from 'react';

import UserContext from '../../context/userContext';
import Avatar from 'react-avatar';

const AuthHeader = (props) => {
  const userData = useContext(UserContext);
  const { user } = userData;
  let { handleLogout, cartItem } = props;
  return (
    <nav className="flex sm:flex-col  md:flex-row justify-between flex-wrap items-center">
      <NavLink
        to={{
          user: props.user,
        }}
        className="btn mr-2 mt:5 md:mt-0"
      >
        <span className="flex items-center text-xl mx-3">
          <Avatar
            name={user}
            size="28"
            textSizeRatio={0.8}
            textMarginRatio={0.28}
            round={true}
          />
          <span className="ml-2 text-gray-400 font-medium">{user}</span>
        </span>
      </NavLink>
      <NavLink
        to="/"
        className={({ isActive }) =>
          `btn mr-2 mt:5 md:mt-0 ${isActive ? 'btn-active' : undefined}`
        }
      >
        Home
      </NavLink>
      <NavLink
        to="/products"
        className={({ isActive }) =>
          `btn mr-2 mt:5 md:mt-0 ${isActive ? 'btn-active' : undefined}`
        }
      >
        Products
      </NavLink>
      <NavLink
        to="/checkout"
        className={({ isActive }) =>
          `btn mr-2 mt:5 md:mt-0 ${isActive ? 'btn-active' : undefined}`
        }
      >
        <i class="fa-solid fa-cart-shopping"></i> Cart
      </NavLink>
      <button className="btn mt-5 lg:mt-0" onClick={handleLogout}>
        Logout
      </button>
    </nav>
  );
};

export default AuthHeader;
