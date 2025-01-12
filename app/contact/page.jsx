"use client";
import React, { useState } from 'react';
import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaTwitter, FaDiscord, FaTelegram } from 'react-icons/fa';
import Style from './contact.module.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  return (
    <div className={Style.contact}>
      <div className={Style.contact_box}>
        <h1>Contact Us</h1>
        <p className={Style.contact_desc}>
          Have questions? We're here to help. Send us a message and we'll respond as soon as possible.
        </p>

        <div className={Style.contact_box_container}>
          <div className={Style.contact_box_left}>
            <div className={Style.contact_info}>
              <div className={Style.contact_info_item}>
                <FaMapMarkerAlt className={Style.icon} />
                <div>
                  <h3>Our Location</h3>
                  <p>123 Blockchain Street, Crypto Valley, CH-6300 Zug, Switzerland</p>
                </div>
              </div>

              <div className={Style.contact_info_item}>
                <FaPhone className={Style.icon} />
                <div>
                  <h3>Phone Number</h3>
                  <p>+41 123 456 789</p>
                </div>
              </div>

              <div className={Style.contact_info_item}>
                <FaEnvelope className={Style.icon} />
                <div>
                  <h3>Email Address</h3>
                  <p>support@nftmarketplace.com</p>
                </div>
              </div>
            </div>

            <div className={Style.contact_social}>
              <h3>Connect With Us</h3>
              <div className={Style.social_links}>
                <a href="#" className={Style.social_link}><FaTwitter /></a>
                <a href="#" className={Style.social_link}><FaDiscord /></a>
                <a href="#" className={Style.social_link}><FaTelegram /></a>
              </div>
            </div>
          </div>

          <div className={Style.contact_box_right}>
            <form onSubmit={handleSubmit} className={Style.contact_form}>
              <div className={Style.form_group}>
                <label htmlFor="name">Full Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Enter your name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className={Style.form_group}>
                <label htmlFor="email">Email Address</label>
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
                <label htmlFor="subject">Subject</label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  placeholder="Enter subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className={Style.form_group}>
                <label htmlFor="message">Message</label>
                <textarea
                  id="message"
                  name="message"
                  placeholder="Enter your message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                />
              </div>

              <button type="submit" className={Style.submit_btn}>
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact; 