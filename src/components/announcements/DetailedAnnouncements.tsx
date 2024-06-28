import React from 'react';

function DetailedAnnouncementCard({ title, body, date }) {
  return (
    <div className="detailed-announcement-card">
      <h3>{title}</h3>
      <p>Date: {date}</p>
      <p>{body}</p>
    </div>
  );
}

export default DetailedAnnouncementCard;
