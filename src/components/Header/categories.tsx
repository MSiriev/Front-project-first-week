import React, { useEffect } from "react";
import { motion } from 'framer-motion'
import styles from "../Header/Categories.module.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories } from "../../features/categoriesSlice";
import { Link } from "react-router-dom";
const Categories = () => {
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.categories.categories);

  useEffect(() => {
    dispatch(fetchCategories());
  }, []);


  const textAnimation = {
    hidden: custom => ({
      x: 1000,
      opacity: 0,
      transition: {
        'ease': custom * 8
      }
    }),
    visible: custom =>( {
      x: 0,
      opacity: 1,
      transition: {
        'ease': custom * 8
      }
    })
  }
  return (
    <>
      <motion.div exit={textAnimation.hidden}  variants={textAnimation} whileInView='visible' initial='hidden' className={styles.mainDiv}>
        <div className={styles.downNavBar}>
          {categories
            .map((item) => {
              if (item._id === "655f06e887a8a4647f40a422") {
                return (
                  <div className={styles.k1}>
                    <Link to={"/"}>
                      <b>{item.text}</b>
                    </Link>
                  </div>
                );
              }
              return (
                <div className={styles.k1}>
                  <Link to={`/category/${item._id}`}>
                    <b>{item.text}</b>
                  </Link>
                </div>
              );
            })
            .reverse()}
        </div>
      </motion.div>
    </>
  );
};

export default Categories;
