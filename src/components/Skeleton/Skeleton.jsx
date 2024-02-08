import React from "react";
import styles from "./styles.module.css";

export default function Skeleton({ count = 1, type = 'banner' }) {
  return (
    <>
      {count > 1 ? (
        <ul className={styles.list}>
          {[...Array(count)].map((_, index) => (
            <li key={index} className={type === 'banner' ? styles.banner : styles.item}>
              
            </li>
          ))}
        </ul>
      ) : (
        <li className={type === 'banner' ? styles.banner : styles.item}>
          
        </li>
      )}
    </>
  );
}
