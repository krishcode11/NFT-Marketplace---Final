"use client";
import React, { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaSearch,
  FaChevronDown,
  FaPaintBrush,
  FaGem,
  FaGamepad,
  FaMusic,
  FaCamera,
  FaCode,
} from "react-icons/fa";
import styles from "./Filter.module.css";

const categories = [
  { id: "NFTs", icon: <FaPaintBrush />, label: "NFTs" },
  { id: "arts", icon: <FaGem />, label: "Digital Arts" },
  { id: "Game Assets", icon: <FaGamepad />, label: "Game Assets" },
  { id: "Music", icon: <FaMusic />, label: "Music" },
  { id: "photography", icon: <FaCamera />, label: "Photography" },
];

const sortOptions = [
  { value: "recent", label: "Recently Added" },
  { value: "price-high", label: "Price: High to Low" },
  { value: "price-low", label: "Price: Low to High" },
  { value: "popular", label: "Most Popular" },
];

const Filter = () => {
  const [activeCategory, setActiveCategory] = useState(null);
  const [isFilterOpen, setIsFilterOpen] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("recent");
  const [isLoading, setIsLoading] = useState(false);

  // Debounced search handler
  const handleSearch = useCallback((e) => {
    setSearchQuery(e.target.value);
    setIsLoading(true);
    // Simulate search delay
    setTimeout(() => setIsLoading(false), 500);
  }, []);

  // Category click handler with persistent state
  const handleCategoryClick = useCallback((categoryId) => {
    setIsLoading(true);
    setActiveCategory(prevCategory => prevCategory === categoryId ? null : categoryId);
    setTimeout(() => setIsLoading(false), 500);
  }, []);

  const handleSort = useCallback((e) => {
    setSortBy(e.target.value);
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 500);
  }, []);

  return (
    <div className={styles.filter}>
      <div className={styles.filter_header}>
        <h2>Featured NFTs</h2>
        <p>Discover the most outstanding NFTs in all topics of life.</p>
      </div>

      <motion.button
        className={styles.filter_toggle}
        onClick={() => setIsFilterOpen(!isFilterOpen)}
        animate={{ rotate: isFilterOpen ? 180 : 0 }}
      >
        <FaChevronDown />
      </motion.button>

      <AnimatePresence>
        {isFilterOpen && (
          <motion.div
            className={`${styles.filter_box} ${isLoading ? styles.loading : ""}`}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.1 }}
          >
            <motion.div
              className={styles.filter_box_left}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              {categories.map((category) => (
                <motion.div
                  key={category.id}
                  className={`${styles.filter_box_left_item} ${
                    activeCategory === category.id ? styles.active : ""
                  }`}
                  onClick={() => handleCategoryClick(category.id)}
                  whileHover={{ y: -4 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span className={styles.filter_box_left_item_icon}>
                    {category.icon}
                  </span>
                  <p>{category.label}</p>
                </motion.div>
              ))}
            </motion.div>

            <motion.div
              className={styles.filter_box_right}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <div className={styles.filter_box_right_search}>
                <FaSearch className={styles.search_icon} />
                <input
                  type="text"
                  placeholder="Search NFTs..."
                  value={searchQuery}
                  onChange={handleSearch}
                />
              </div>

              <div className={styles.filter_box_right_sort}>
                <select
                  className={styles.sort_select}
                  value={sortBy}
                  onChange={handleSort}
                >
                  {sortOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
                <FaChevronDown className={styles.sort_icon} />
              </div>
            </motion.div>

            {isLoading && (
              <motion.div
                className={styles.loading_overlay}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <div className={styles.loading_spinner} />
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Filter;