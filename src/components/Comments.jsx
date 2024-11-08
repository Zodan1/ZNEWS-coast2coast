import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchCommentsByArticleId, deleteComment } from "../utils/api";
import CommentForm from "./CommentForm";

export default function Comments() {
  const { article_id } = useParams();
  const [comments, setComments] = useState([]);
  const [commentMessage, setCommentMessage] = useState(null);
  const [deleteMessage, setDeleteMessage] = useState(null);

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
    setCommentMessage("NICE!");
    setTimeout(() => {
      setCommentMessage(null);
    }, 3000);
  };

  const handleDeleteComment = (comment_id) => {
    deleteComment(comment_id)
      .then(() => {
        setComments((prevComments) =>
          prevComments.filter((comment) => comment.comment_id !== comment_id)
        );
        setDeleteMessage("Comment deleted successfully.");
        setTimeout(() => {
          setDeleteMessage(null);
        }, 3000); // Clear message after 3 seconds })
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
      {commentMessage && <p className="success">{commentMessage}</p>}
      {deleteMessage && <p className="success">{deleteMessage}</p>}
      {comments.map((comment) => (
        <div key={comment.comment_id} className="comment-box">
          {" "}
          <p>{comment.body}</p> <p>Author: {comment.author}</p>{" "}
          <p>Created at: {new Date(comment.created_at).toLocaleString()}</p>{" "}
          {comment.author === currentUsername && (
            <button
              className="delete-button"
              onClick={() => handleDeleteComment(comment.comment_id)}
            >
              Delete
            </button>
          )}
          <p>Likes: {comment.votes}</p>
        </div>
      ))}{" "}
    </div>
  );
}
