import React, { useEffect, useState } from "react";
import styles from "./styles.module.css";
import NewsBanner from "../../components/NewsBanner/NewsBanner";
import { getCategories, getNews } from "../../api/apiNews";
import NewsList from "../../components/NewsList/NewsList";
import Skeleton from "../../components/Skeleton/Skeleton";
import Pagination from "../../components/Pagination/Pagination";
import Categories from "../../components/Categories/Categories";
import Search from "../../components/Search/Search";
import {useDebounce} from "../../helpers/hooks/useDebounce"

export default function Main() {
  const [news, setNews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [categories, serCategories] = useState([]);
  const [keywords, setKeywords] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");

  const debounceKeywords = useDebounce(keywords, 1500)

  const totalPages = 10;
  const pageSize = 10;

  const fetchNews = async (cuurentPage) => {
    try {
      setIsLoading(true);
      const response = await getNews({
        page_number: currentPage,
        page_size: pageSize,
        category: selectedCategory === "All" ? null : selectedCategory,
        keywords: debounceKeywords,
      });
      setNews(response.news);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await getCategories();
      serCategories(["All", ...response.categories]);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchNews(currentPage);
  }, [currentPage, selectedCategory, debounceKeywords]);

  useEffect(() => {
    fetchCategories();
  }, []);

  console.log(categories);

  const handelNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handelPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handelPageClick = (pageNum) => {
    setCurrentPage(pageNum);
  };

  return (
    <main className={styles.mail}>
      <Categories
        categories={categories}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />

      <Search keywords={keywords} setKeywords={setKeywords} />

      {news.length > 0 && !isLoading ? (
        <NewsBanner item={news[0]} />
      ) : (
        <Skeleton type={"banner"} count={1} />
      )}

      <Pagination
        handelNextPage={handelNextPage}
        handelPreviousPage={handelPreviousPage}
        handelPageClick={handelPageClick}
        totalPages={totalPages}
        currentPage={currentPage}
      />

      {!isLoading ? (
        <NewsList news={news} />
      ) : (
        <Skeleton type={"item"} count={10} />
      )}

      <Pagination
        handelNextPage={handelNextPage}
        handelPreviousPage={handelPreviousPage}
        handelPageClick={handelPageClick}
        totalPages={totalPages}
        currentPage={currentPage}
      />
    </main>
  );
}
