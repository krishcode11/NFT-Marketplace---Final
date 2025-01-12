"use client";
import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { FaUser, FaEnvelope, FaLock, FaEthereum, FaImage } from "react-icons/fa";
import Image from "next/image";

import Style from "./account.module.css";

const AccountPage = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    walletAddress: "",
    bio: "",
    profileImage: null
  });

  const imagePreviewRef = useRef(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData(prev => ({
        ...prev,
        profileImage: file
      }));
      // Create URL for preview
      const url = URL.createObjectURL(file);
      setImagePreviewUrl(url);
    }
  };

  // Cleanup preview URL on unmount
  useEffect(() => {
    return () => {
      if (imagePreviewUrl) {
        URL.revokeObjectURL(imagePreviewUrl);
      }
    };
  }, [imagePreviewUrl]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Handle form submission here
      console.log("Form submitted:", formData);
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <div className={Style.accountContainer}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className={Style.formWrapper}
      >
        <div className={Style.formHeader}>
          <h1>Create Account</h1>
          <p>Join the NFT marketplace community</p>
        </div>

        <form onSubmit={handleSubmit} className={Style.form}>
          <div className={Style.imageUpload}>
            <div className={Style.imagePreview} ref={imagePreviewRef}>
              {imagePreviewUrl ? (
                <Image
                  src={imagePreviewUrl}
                  alt="Profile Preview"
                  width={120}
                  height={120}
                  className={Style.previewImage}
                />
              ) : (
                <FaUser className={Style.defaultAvatar} />
              )}
            </div>
            <label className={Style.uploadButton}>
              <FaImage />
              <span>Upload Profile Picture</span>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                hidden
              />
            </label>
          </div>

          <div className={Style.inputGroup} style={{ "--index": 1 }}>
            <FaUser className={Style.inputIcon} />
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={formData.username}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className={Style.inputGroup} style={{ "--index": 2 }}>
            <FaEnvelope className={Style.inputIcon} />
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className={Style.inputGroup} style={{ "--index": 3 }}>
            <FaLock className={Style.inputIcon} />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className={Style.inputGroup} style={{ "--index": 4 }}>
            <FaEthereum className={Style.inputIcon} />
            <input
              type="text"
              name="walletAddress"
              placeholder="Ethereum Wallet Address"
              value={formData.walletAddress}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className={Style.inputGroup} style={{ "--index": 5 }}>
            <textarea
              name="bio"
              placeholder="Tell us about yourself..."
              value={formData.bio}
              onChange={handleInputChange}
              rows={4}
            />
          </div>

          <motion.button
            type="submit"
            className={Style.submitButton}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Create Account
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
};

export default AccountPage; 