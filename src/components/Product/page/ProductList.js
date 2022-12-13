import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import products from '../../../data/products.json';

import '../../../css/base.css';
import '../../../css/products.css';
import ProductCard from '../ProductCard';
import UserContext from '../../../context/userContext';

const ProductList = () => {
  const [addedCartItems, setAddCartItems] = useState([]);
  const navigate = useNavigate();
  const cart = useContext(UserContext);
  cart.setCartItem(addedCartItems);
  const getAddedCartItemsFromStorage = async () => {
    const addedItemsString = await localStorage.getItem('cartItems');
    const addedItems = addedItemsString ? JSON.parse(addedItemsString) : [];

    setAddCartItems(addedItems);
  };

  const addItemToCart = async (newItem) => {
    setAddCartItems([...addedCartItems, newItem]);

    await localStorage.setItem(
      'cartItems',
      JSON.stringify([...addedCartItems, newItem])
    );
  };

  const removeFromCart = async (newItem) => {
    const filteredProducts = addedCartItems.filter((item) => {
      return item !== newItem;
    });

    setAddCartItems(filteredProducts);

    await localStorage.setItem('cartItems', JSON.stringify(filteredProducts));
  };

  useEffect(() => {
    getAddedCartItemsFromStorage();
  }, []);

  return (
    <main className="main">
      <section className="section">
        <div className="flex  justify-between px-6">
          <p>{products.length} Products found</p>
          <p onClick={() => navigate('/checkout')}>
            {addedCartItems.length} Products added to Cart
          </p>
        </div>
        <div className="products-cont">
          {products.map((product) => {
            return (
              <ProductCard
                product={product}
                key={product.id}
                addedCartItems={addedCartItems}
                addItemToCart={addItemToCart}
                removeFromCart={removeFromCart}
              />
            );
          })}
        </div>
      </section>
    </main>
  );
};

export default ProductList;
