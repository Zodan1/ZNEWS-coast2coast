import { useState } from "react";
import { postComment } from "../utils/api";

// export default function CommentForm({ article_id, onCommentSubmit }) {
//   const [commentBody, setCommentBody] = useState("");
//   const [error, setError] = useState(null);

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const newComment = { body: commentBody, author: "grumpy19" }; //replace with dynamic username
//     postComment(article_id, newComment)
//       .then((comment) => {
//         onCommentSubmit(comment);
//         setCommentBody("");
//         setError(null);
//       })
//       .catch((error) => {
//         console.error("Error posing comment", error);
//         setError("Failed to post comment. PLease try again");
//       });
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <textarea
//         value={commentBody}
//         onChange={(e) => setCommentBody(e.target.value)}
//         placeholder="Speak your mind...."
//       />
//       <button type="submit">Post Comment</button>
//       {error && <p className="error">{error}</p>}
//     </form>
//   );
// }

export default function CommentForm({ article_id, onCommentSubmit }) {
  // Accept articleId as a prop
  const initialCommentState = {
    votes: "",
    created_at: "",
    author: "grumpy19",
    body: "",
    article_id: article_id, // Initialize with the passed articleId
  };

  const [newComment, setNewComment] = useState(initialCommentState);
  const [error, setError] = useState(""); // Define error state

  const handleChange = (e) => {
    const { name, value } = e.target; // Destructure name and value from the event target
    setNewComment({ ...newComment, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitting Comment:", newComment);
    postComment(newComment.article_id, {
      body: newComment.body,
      username: newComment.author,
    })
      .then((comment) => {
        console.log("comment added:", comment);
        onCommentSubmit(comment);
        setNewComment({ ...initialCommentState, body: "" }); // Reset the form, retain article_id
      })
      .catch((error) => {
        if (error.response) {
          console.error("Server responded with:", error.response.data);
          setError(error.response.data); // Set error state to server response
        } else {
          console.error("Error adding item:", error.message);
          setError(error.message); // Set error state to error message
        }
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <textarea
        className="comment-form"
        name="body"
        maxLength="500"
        value={newComment.body} // Correct the value prop to reference newComment.body
        onChange={handleChange}
        placeholder="Speak your mind....(as long as it is under 500 characters!)"
      />
      <button className="comment-button" type="submit">
        Post Comment
      </button>
      {error && <p className="error">{error}</p>}
    </form>
  );
}
