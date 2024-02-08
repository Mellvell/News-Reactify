import React from "react";
import styles from "./styles.module.css";

export default function Search({keywords, setKeywords}) {
  return (
    <div className={styles.search}>
      <input
        type="text"
        value={keywords}
        onChange={(e) => setKeywords(e.target.value)}
        className={styles.input}
        placeholder="Search"
      />
    </div>
  );
}
