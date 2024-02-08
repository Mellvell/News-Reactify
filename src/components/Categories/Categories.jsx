import React from "react";
import { formatDate } from "../../helpers/formateDate";
import styles from "./styles.module.css";


export default function Categories({categories, setSelectedCategory, selectedCategory}) {
  return (
    <div className={styles.categories}>
      {categories.map(category => {
        return(
          <button onClick={() => setSelectedCategory(category)} key={category} className={selectedCategory === category ? styles.active : styles.item}>
            {category}
          </button>
        )
      })}
    </div>
  );
}
