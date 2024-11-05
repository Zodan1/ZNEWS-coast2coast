export default function ArticleCard(props) {
  return (
    <article className="card">
      <div className="card_name">
        <h4>{props.Article_name}</h4>
      </div>
      <img
        className="article-img"
        src={article.article_img_url}
        alt={article.title}
      />
    </article>
  );
}
