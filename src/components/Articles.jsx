import fetchArticles from "../utils/api";
import { useState, useEffect } from "react";

export default function Articles() {
  const [articles, setArticles] = useState([]);

  console.log(articles);
  useEffect(() => {
    fetchArticles().then((article) => {
      setArticles(article);
    });
  }, []);
  return (
    <div>
      {articles.map((article) => (
        <div key={article.article_id}>
          <h2>{article.title}</h2>
          <p>Author: {article.author}</p> <p>Topic: {article.topic}</p>{" "}
          <p>Created at: {new Date(article.created_at).toLocaleString()}</p>{" "}
          <img src={article.article_img_url} alt={article.title} />{" "}
          <p>Votes: {article.votes}</p> <p>Comments: {article.comment_count}</p>{" "}
        </div>
      ))}
    </div>
  );
}
