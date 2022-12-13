import React, { useState, useContext } from 'react';
import { NavLink } from 'react-router-dom';

import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth } from '../../firebase';
import { validations } from '../../utils/validation';
import UserContext from '../../context/userContext';

const Signup = () => {
  const info = useContext(UserContext);
  const initialData = {
    username: '',
    email: '',
    password: '',
  };
  const [user, setUser] = useState(initialData);
  const [errors, setErrors] = useState(initialData);

  function handleChange({ target }) {
    let { name, value } = target;
    validations(errors, name, value);
    setUser({ ...user, [name]: value });
    setErrors(errors);
  }

  const handleSubmission = (event) => {
    let { email, password, username } = user;
    event.preventDefault();
    createUserWithEmailAndPassword(auth, email, password)
      .then(async (res) => {
        const newUser = res.user;
        info.setUser(username);
        info.setIsLoggedIn(true);
        await updateProfile(newUser, {
          displayName: username,
        });
        window.location.href = '/';
      })
      .catch((error) => {
        setErrors((errors) => ({
          ...errors,
          ...error.message,
        }));
      });
  };

  let { username, password, email } = errors;
  return (
    <main className=" py-10">
      <section className="py-20">
        <form
          className="w-1/3 mx-auto border  bg-gray-100 border-gray-100 p-8 rounded-md shadow-md"
          onSubmit={handleSubmission}
        >
          <div className="text-center">
            <legend className="text-2xl mb-2 font-bold">Sign Up</legend>
            <div className="flex justify-center items-center">
              <p className="hello">Already Have an account?</p>
              <NavLink to="/login" className="text-blue-600 underline">
                Login
              </NavLink>
            </div>
          </div>
          <fieldset className="my-3">
            <input
              className="block w-full my-3 py-2 px-3 border border-gray-400 rounded-md"
              type="text"
              placeholder="Enter Username"
              value={user.username}
              name="username"
              onChange={(e) => handleChange(e)}
            />
            <span className="text-red-500">{username}</span>
            <input
              className="block w-full my-3 py-2 px-3 border border-gray-400 rounded-md"
              type="text"
              placeholder="Enter Email"
              value={user.email}
              name="email"
              onChange={(e) => handleChange(e)}
            />
            <span className="error">{email}</span>
            <input
              className="block w-full my-3 py-2 px-3 border border-gray-400 rounded-md"
              type="password"
              placeholder="Enter Password"
              value={user.password}
              name="password"
              onChange={(e) => handleChange(e)}
            />
            <span className="text-red-500">{password}</span>
            <input
              type="submit"
              value="Sign Up"
              className="rounded block mt-6 py-2 w-full btn-gray  font-bold cursor-pointer"
              disabled={username || email || password}
            />
          </fieldset>
        </form>
      </section>
    </main>
  );
};

export default Signup;
