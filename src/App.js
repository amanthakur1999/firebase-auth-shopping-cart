import { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { UserProvider } from './context/userContext';

import { getAuth, signOut } from 'firebase/auth';
import { auth } from './firebase';

import Home from './components/Home/index';
import Signup from './components/Signup/Signup';
import Login from './components/Login/Login';
import Header from './components/Header/Header';
import ProductList from './components/Product/page/ProductList';
import CheckoutPage from './components/Product/page/Checkout';
import NoMatch from './components/NoMatch/NoMatch';

const authSignOut = getAuth();

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [cartItem, setCartItem] = useState(0);

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user.displayName);
        setIsLoggedIn(true);
      }
    });
  });

  const handleLogout = () => {
    signOut(authSignOut)
      .then(() => {
        setIsLoggedIn(false);
        setUser(null);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  console.log(cartItem, 'a');

  return (
    <UserProvider
      value={{
        isLoggedIn: isLoggedIn,
        user: user,
        setUser: setUser,
        setIsLoggedIn: setIsLoggedIn,
        setCartItem: setCartItem,
      }}
    >
      <Header handleLogout={handleLogout} cartItem={cartItem} />
      {isLoggedIn ? (
        <AuthenticatedApp cartItem={cartItem} />
      ) : (
        <UnAuthenticatedApp cartItem={cartItem} />
      )}
    </UserProvider>
  );
};

function AuthenticatedApp() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/products" element={<ProductList />} />
      <Route path="/checkout" element={<CheckoutPage />} />
      <Route path="*" element={<NoMatch />} />
    </Routes>
  );
}

function UnAuthenticatedApp() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/products" element={<ProductList />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/checkout" element={<CheckoutPage />} />
      <Route path="*" element={<NoMatch />} />
    </Routes>
  );
}

export default App;
