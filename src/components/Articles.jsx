import fetchArticles from "../utils/api";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Articles() {
  const [articles, setArticles] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchArticles().then((data) => {
      setArticles(data);
    });
  }, []);

  return (
    <div className="articles-container">
      {articles.map((article) => (
        <div
          className="article-box"
          key={article.article_id}
          onClick={() => navigate(`/article/${article.article_id}`)}
        >
          <img
            className="article-img"
            src={article.article_img_url}
            alt={article.title}
          />
          <div className="article-content">
            <h2>{article.title}</h2>
            <p>Author: {article.author}</p>
            <p>Created at: {new Date(article.created_at).toLocaleString()}</p>
            <div className="votes-comments-box">
              <p>Votes: {article.votes}</p>
              <p>Comments: {article.comment_count}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
