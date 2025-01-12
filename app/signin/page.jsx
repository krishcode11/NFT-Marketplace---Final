"use client";
import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FaGoogle, FaFacebook, FaTwitter } from 'react-icons/fa';
import Style from './signin.module.css';
import images from '../../img';

const SignIn = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false,
  });

  const handleChange = (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setFormData({
      ...formData,
      [e.target.name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  return (
    <div className={Style.signin}>
      <div className={Style.signin_box}>
        <div className={Style.signin_box_left}>
          <Image src={images.hero} alt="NFT" width={600} height={600} />
        </div>
        
        <div className={Style.signin_box_right}>
          <h2>Welcome Back</h2>
          <p className={Style.signin_box_right_desc}>
            Sign in to access your NFT portfolio and trading history
          </p>

          <form onSubmit={handleSubmit} className={Style.signin_box_right_form}>
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
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>

            <div className={Style.form_options}>
              <div className={Style.remember_me}>
                <input
                  type="checkbox"
                  id="rememberMe"
                  name="rememberMe"
                  checked={formData.rememberMe}
                  onChange={handleChange}
                />
                <label htmlFor="rememberMe">Remember me</label>
              </div>
              <Link href="/forgot-password" className={Style.forgot_password}>
                Forgot Password?
              </Link>
            </div>

            <button type="submit" className={Style.signin_box_right_form_btn}>
              Sign In
            </button>
          </form>

          <div className={Style.signin_box_right_social}>
            <p>Or continue with</p>
            <div className={Style.social_buttons}>
              <button className={Style.social_button}>
                <FaGoogle /> Google
              </button>
              <button className={Style.social_button}>
                <FaFacebook /> Facebook
              </button>
              <button className={Style.social_button}>
                <FaTwitter /> Twitter
              </button>
            </div>
          </div>

          <p className={Style.signin_box_right_signup}>
            Don't have an account?{' '}
            <Link href="/signup">Sign Up</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignIn; 