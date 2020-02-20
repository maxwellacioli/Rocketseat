import React from 'react';

import './Comment.css';

function Comment({ comment }) {
  return <li className="comment" >
    <div>
      <img src={comment.author.avatar} alt="profileAvatar" />
    </div>
    <p><strong>{comment.author.name}</strong> {comment.content}</p>
  </li>
}

export default Comment;