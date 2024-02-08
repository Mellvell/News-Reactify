import React from "react";
import styles from "./styles.module.css";
import { formatTimeAgo } from "../../helpers/formatTimeAgo";
import Image from "../Image/Image";

export default function NewsItem({ item }) {
  return (
    <li className={styles.item}>
      <div className={styles.imgWrapper} style={{backgroundImage: `url(${item.image})`}}></div>
      <div className={styles.info}>
        <h3 className={styles.title}>{item.title}</h3>
        <p className={styles.extra}>
          {formatTimeAgo(item.published)} by {item.author}
        </p>
      </div>
    </li>
  );
}
