import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchArticleById } from "../utils/api";
import Comments from "./Comments";
import Votes from "./Votes";

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
      <p>{article.body}</p>{" "}
      <Votes
        article_id={article_id}
        initialVotes={article.votes}
        onVoteChange={(newVotes) => setArticle({ ...article, votes: newVotes })}
      />
      <div>
        <p>Comments: {article.comment_count}</p>
      </div>
      <Comments />
    </div>
  );
}
