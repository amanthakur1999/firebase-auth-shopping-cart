import React, { useEffect, useState } from 'react';
import products from '../../../data/products.json';
import '../../../css/base.css';
import '../../../css/products.css';
import '../../../css/checkout.css';
import ProductCard from '../ProductMiniCard';

const CheckoutPage = () => {
  const [addedProducts, setAddedProducts] = useState([]);

  const getAddedCartItemsFromStorage = async () => {
    const addedItemsString = await localStorage.getItem('cartItems');
    const addedItems = addedItemsString ? JSON.parse(addedItemsString) : [];

    const addedProducts = addedItems.map((id) => {
      return products.find((product) => product.id === id);
    });

    setAddedProducts(addedProducts);
  };

  const removeFromCart = async (newItem) => {
    const filteredProducts = addedProducts.filter((item) => {
      return item.id !== newItem;
    });

    setAddedProducts(filteredProducts);

    const ids = filteredProducts.map((item) => item.id);

    await localStorage.setItem('cartItems', JSON.stringify(ids));
  };

  useEffect(() => {
    getAddedCartItemsFromStorage();
  }, []);

  return (
    <main className="main">
      <header className="header">
        <h1 className="header-title">Online Grocery Shopping Store</h1>
      </header>
      <section className="section">
        {addedProducts.length ? (
          <div className="checkout-cont">
            {addedProducts.map((product) => {
              return (
                <ProductCard
                  product={product}
                  key={product.id}
                  removeFromCart={removeFromCart}
                />
              );
            })}
          </div>
        ) : (
          <div className="py-7">
            <p className="text-center">No item added</p>
          </div>
        )}
      </section>
    </main>
  );
};

export default CheckoutPage;
