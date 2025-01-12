"use client";
import React, { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TiArrowSortedDown, TiArrowSortedUp, TiTick } from "react-icons/ti";

//INTERNAL IMPORT
import Style from "./AuthorTaps.module.css";

const AuthorTaps = ({ onTabChange, activeTab = "collectibles" }) => {
  const [openList, setOpenList] = useState(false);
  const [selectedMenu, setSelectedMenu] = useState("Most Recent");

  const listArray = [
    "Created By Admin",
    "Most Appreciated",
    "Most Discussed",
    "Most Viewed",
  ];

  const tabs = [
    { id: "collectibles", label: "Collectibles" },
    { id: "created", label: "Created" },
    { id: "liked", label: "Liked" },
    { id: "following", label: "Following" },
    { id: "followers", label: "Followers" },
  ];

  const toggleDropDownList = useCallback(() => {
    setOpenList(prev => !prev);
  }, []);

  const handleMenuSelect = useCallback((item) => {
    setSelectedMenu(item);
    setOpenList(false);
  }, []);

  const handleTabChange = useCallback((tabId) => {
    if (onTabChange) {
      onTabChange(tabId);
    }
  }, [onTabChange]);

  return (
    <div className={Style.AuthorTaps}>
      <motion.div 
        className={Style.AuthorTaps_box}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className={Style.AuthorTaps_box_left}>
          <div className={Style.AuthorTaps_box_left_btn}>
            {tabs.map((tab) => (
              <motion.button
                key={tab.id}
                className={`${Style.tab_button} ${activeTab === tab.id ? Style.active : ""}`}
                onClick={() => handleTabChange(tab.id)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {tab.label}
              </motion.button>
            ))}
          </div>
        </div>

        <div className={Style.AuthorTaps_box_right}>
          <motion.div
            className={Style.AuthorTaps_box_right_para}
            onClick={toggleDropDownList}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <p>{selectedMenu}</p>
            {openList ? <TiArrowSortedUp /> : <TiArrowSortedDown />}
          </motion.div>

          <AnimatePresence>
            {openList && (
              <motion.div 
                className={Style.AuthorTaps_box_right_list}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                {listArray.map((item, i) => (
                  <motion.div
                    key={i + 1}
                    onClick={() => handleMenuSelect(item)}
                    className={Style.AuthorTaps_box_right_list_item}
                    whileHover={{ backgroundColor: "rgba(99, 102, 241, 0.1)" }}
                  >
                    <p>{item}</p>
                    {selectedMenu === item && (
                      <motion.span
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        <TiTick />
                      </motion.span>
                    )}
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
};

export default AuthorTaps;