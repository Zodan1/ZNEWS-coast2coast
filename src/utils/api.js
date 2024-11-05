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
