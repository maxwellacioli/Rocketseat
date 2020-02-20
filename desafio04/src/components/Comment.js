import React from 'react';

import './Comment.css';

function Comment({ comment }) {
  return <li>
    <img src={comment.author.avatar} alt="profileAvatar" />
<p><strong>{comment.author.name}</strong> {comment.content}</p>
  </li>
}

export default Comment;