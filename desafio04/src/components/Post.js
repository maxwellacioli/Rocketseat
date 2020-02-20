import React, { Component } from 'react';

import Comment from './Comment';

function Post({post}) {
    return <li>
      <div>
        <img src={post.author.avatar} />
         <div> 
          <p>{post.author.name}</p>
          <p>{post.date}</p>
        </div>
      </div>
      <p>{post.content}</p>
      <ul>
        {post.comments.map(comment => 
        <Comment 
          key={comment.id} 
          comment={comment} 
        />
      )}
      </ul>
    </li>
}

export default Post;