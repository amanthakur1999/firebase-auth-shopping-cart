import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="flex  items-center pt-35 px-20 h-screen">
      <div className="flex-1">
        <h2 className="text-5xl  font-bold  text-black">
          Welcome to Online Grocery Store !
        </h2>
        <p className="text-2xl py-6  text-gray-600">
          An online grocer is either a brick-and-mortar supermarket or grocery
          store that allows online ordering, or a standalone e-commerce service
          that includes grocery items.
        </p>
        <Link to="/products">
          <button className="btn-primary pb-3">
            <span className="align-middle">Get Started</span>{' '}
            <i class="ri-arrow-right-s-line align-middle"></i>
          </button>
        </Link>
      </div>
      <div className=" flex-1">
        <img alt="Home.jpeg" className="bg-white" src="grocery3.png"></img>
      </div>
    </div>
  );
};

export default Home;
