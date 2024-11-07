import axios from "axios";

const api = axios.create({
  baseURL: "https://znews.onrender.com/api",
});

export default function fetchArticles() {
  return api
    .get(`/articles`)
    .then((response) => {
      return response.data.articles;
    })
    .catch((error) => {
      console.error("Error fetching articles", error);
    });
}

export function fetchUsers() {
  return api
    .get(`/users`)
    .then((response) => {
      return response.data.users;
    })
    .catch((error) => {
      console.error("Error fetching users", error);
    });
}

export function fetchArticleById(article_id) {
  return api
    .get(`/articles/${article_id}`)
    .then((response) => {
      return response.data.article;
    })
    .catch((error) => {
      console.error("Error fetching Article_id", error);
    });
}

export function fetchCommentsByArticleId(article_id) {
  return api
    .get(`/articles/${article_id}/comments`)
    .then((response) => {
      return response.data.comments;
    })
    .catch((error) => {
      console.error("Error fetching Article_id", error);
      return [];
    });
}

export function patchArticleVotes(article_id, votes) {
  return api
    .patch(`/articles/${article_id}`, { inc_votes: votes })
    .then((response) => {
      return response.data.updatedArticle;
    })
    .catch((error) => {
      console.error("Error updating votes api", error);
    });
}

export function postComment(article_id, { username, body }) {
  return api
    .post(`/articles/${article_id}/comments`, {
      username,
      body,
    })
    .then((response) => {
      console.log(response, "post response");
      return response.data.comment;
    })
    .catch((error) => {
      console.error("Error posting comment", error);
    });
}
