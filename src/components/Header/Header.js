import { NavLink } from 'react-router-dom';
import { useContext } from 'react';

import UserContext from '../../context/userContext';
import AuthHeader from './AuthHeader';
import NonAuthHeader from './NonAuthHeader';

const Header = ({ handleLogout, cartItem }) => {
  const userData = useContext(UserContext);
  const { isLoggedIn } = userData;
  console.log(cartItem.length, 'a');
  return (
    <header className="flex fixed z-10 w-full items-center justify-between sm:flex-col bg-gray-50 px-20 py-6 shadow-sm rounded-md md:flex-row">
      <NavLink to="/">
        <div className="w-100">
          <h1>Online Grocery Shopping Store</h1>
        </div>
      </NavLink>
      <nav className="flex">
        {isLoggedIn ? (
          <AuthHeader handleLogout={handleLogout} cartItem={cartItem} />
        ) : (
          <NonAuthHeader cartItem={cartItem} />
        )}
      </nav>
    </header>
  );
};

export default Header;
