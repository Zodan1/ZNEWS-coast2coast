import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchArticleById } from "../utils/api";

export default function Article() {
  const { article_id } = useParams();
  const [article, setArticle] = useState(null);

  useEffect(() => {
    fetchArticleById(article_id).then((article) => {
      setArticle(article);
    });
  }, [article_id]);

  if (!article) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <img src={article.article_img_url} alt={article.title} />
      <h2>{article.title}</h2>
      <p>Author: {article.author}</p>
      <p>Topic: {article.topic}</p>
      <p>Created at: {new Date(article.created_at).toLocaleString()}</p>
      <p>{article.body}</p>
      <div>
        <p>Votes: {article.votes}</p>
        <p>Comments: {article.comment_count}</p>
      </div>
    </div>
  );
}
