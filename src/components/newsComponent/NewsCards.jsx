import React from "react";

function NewsCards(props) {
  return (
    props.loaded &&
    props.news.map((newsItem, index) => {
      return (
        <div key={index} className="mt-4 col-sm-4">
          <div className="card">
            {newsItem.image && (
              <img
                className="card-img-top"
                src={newsItem.image}
                alt="Card image cap"
              />
            )}
            <div className="card-body">
              <h5 className="card-title">{newsItem.title}</h5>
              <p className="card-text">{newsItem.description}</p>
              <div className="row">
                <p className="col card-text">
                  <small className="text-muted">{newsItem.source}</small>
                </p>
                <p className="col-rightcard-text">
                  <small className="text-muted">
                    {new Date(newsItem.published_at).toDateString()}
                  </small>
                </p>
              </div>

              <a
                target="_blank"
                href={newsItem.url}
                className="btn btn-primary"
              >
                Read full article
              </a>
            </div>
          </div>
        </div>
      );
    })
  );
}

export default NewsCards;
