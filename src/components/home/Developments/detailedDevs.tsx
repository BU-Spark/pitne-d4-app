import React from 'react';

function DetailedDevelopmentCard({ title, body, date, website }) {
  return (
    <div className="detailed-development-card">
      <h3>{title}</h3>
      <p className="development-date">{date}</p>
      <p className="development-body">{body}</p>
      {website && (
        <a href={website} target="_blank" rel="noopener noreferrer" className="website-link">
          Visit Website
        </a>
      )}
    </div>
  );
}

export default DetailedDevelopmentCard;