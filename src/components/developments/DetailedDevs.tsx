import React from 'react';

function DetailedDevelopmentCard({ title, body, date, website }) {
  const formatWebsiteLink = (url) => {
    if (!/^https?:\/\//i.test(url)) {
      return 'http://' + url;
    }
    return url;
  };

  return (
    <div className="detailed-development-card">
      <h3>{title}</h3>
      {date && <p className="development-date">Date: {date}</p>}
      <p className="development-body">{body}</p>
      {website && (
        <a href={formatWebsiteLink(website)} target="_blank" rel="noopener noreferrer" className="website-link">
          Visit Website
        </a>
      )}
    </div>
  );
}

export default DetailedDevelopmentCard;