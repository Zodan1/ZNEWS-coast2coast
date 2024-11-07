import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchCommentsByArticleId, deleteComment } from "../utils/api";
import CommentForm from "./CommentForm";

export default function Comments() {
  const { article_id } = useParams();
  const [comments, setComments] = useState([]);

  useEffect(() => {
    fetchCommentsByArticleId(article_id)
      .then((commentData) => {
        setComments(commentData);
      })
      .catch((error) => {
        console.error("Error fetching comments", error);
      });
  }, [article_id]);

  const handleCommentSubmit = (newComment) => {
    setComments((prevComments) => [newComment, ...prevComments]);
  };

  const handleDeleteComment = (comment_id) => {
    deleteComment(comment_id)
      .then(() => {
        setComments((prevComments) =>
          prevComments.filter((comment) => comment.comment_id !== comment_id)
        );
      })
      .catch((error) => {
        console.error("Error deleting comment", error);
        setError("Failed to delete comment. Please try again.");
      });
  };

  const currentUsername = "grumpy19";

  if (comments.length === 0) {
    return <p>No comments yet. Be the first to comment!</p>;
  }

  return (
    <div className="comments-container">
      {" "}
      <CommentForm
        article_id={article_id}
        onCommentSubmit={handleCommentSubmit}
      />
      {comments.map((comment) => (
        <div key={comment.comment_id} className="comment-box">
          {" "}
          <p>{comment.body}</p> <p>Author: {comment.author}</p>{" "}
          <p>Created at: {new Date(comment.created_at).toLocaleString()}</p>{" "}
          {comment.author === currentUsername && (
            <button onClick={() => handleDeleteComment(comment.comment_id)}>
              Delete
            </button>
          )}
          <p>Likes: {comment.votes}</p>
        </div>
      ))}{" "}
    </div>
  );
}
