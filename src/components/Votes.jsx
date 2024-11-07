import { useState, useEffect } from "react";
import { patchArticleVotes } from "../utils/api";

export default function Votes({ article_id, initialVotes, onVoteChange }) {
  const [votes, setVotes] = useState(initialVotes);

  // useEffect(() => {
  //   setVotes(initialVotes);
  // }, [initialVotes]);

  const handleVote = (increment) => {
    const newVotes = votes + increment;
    setVotes(newVotes);
    onVoteChange(newVotes);

    patchArticleVotes(article_id, increment)
      .then((updatedArticle) => {
        // console.log(updatedArticle);
        if (updatedArticle && updatedArticle.votes !== undefined) {
          setVotes(updatedArticle.votes);
          onVoteChange(updatedArticle.votes);
        } else {
          throw new Error("Vote update failed!");
        }
      })
      .catch((error) => {
        console.error("Error updating votes, catch", error);
        setVotes(votes); // revert to previous state on error
        onVoteChange(votes);
      });
  };

  return (
    <div className="votes-container">
      <p>Votes: {votes}</p>
      <button onClick={() => handleVote(1)}>Upvote</button>
      <button onClick={() => handleVote(-1)}>Downvote</button>
    </div>
  );
}
