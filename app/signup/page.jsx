"use client";
import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Style from './signup.module.css';
import images from '../../img';

const SignUp = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Form submitted:', formData);
  };

  return (
    <div className={Style.signup}>
      <div className={Style.signup_box}>
        <div className={Style.signup_box_left}>
          <Image src={images.hero} alt="NFT" width={600} height={600} />
        </div>
        
        <div className={Style.signup_box_right}>
          <h2>Create Account</h2>
          <p className={Style.signup_box_right_desc}>
            Join our NFT marketplace and start trading digital assets
          </p>

          <form onSubmit={handleSubmit} className={Style.signup_box_right_form}>
            <div className={Style.form_group}>
              <label htmlFor="username">Username</label>
              <input
                type="text"
                id="username"
                name="username"
                placeholder="Choose a username"
                value={formData.username}
                onChange={handleChange}
                required
              />
            </div>

            <div className={Style.form_group}>
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className={Style.form_group}>
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Create a password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>

            <div className={Style.form_group}>
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                placeholder="Confirm your password"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
            </div>

            <button type="submit" className={Style.signup_box_right_form_btn}>
              Create Account
            </button>
          </form>

          <p className={Style.signup_box_right_signin}>
            Already have an account?{' '}
            <Link href="/signin">Sign In</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp; 