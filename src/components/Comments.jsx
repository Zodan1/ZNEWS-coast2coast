import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchCommentsByArticleId } from "../utils/api";

export default function Comments() {
  const { article_id } = useParams();
  const [comments, setComments] = useState([]);

  useEffect(() => {
    fetchCommentsByArticleId(article_id).then((commentData) => {
      setComments(commentData);
    });
  }, [article_id]);

  if (comments.length === 0) {
    return <p>No comments yet. Be the first to comment!</p>;
  }
  return (
    <div className="comments-container">
      {" "}
      {comments.map((comment) => (
        <div key={comment.comment_id} className="comment-box">
          {" "}
          <p>{comment.body}</p> <p>Author: {comment.author}</p>{" "}
          <p>Created at: {new Date(comment.created_at).toLocaleString()}</p>{" "}
          <p>Likes: {comment.votes}</p>
        </div>
      ))}{" "}
    </div>
  );
}
