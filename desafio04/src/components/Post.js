import React, { Component } from 'react';

import './Post.css'

import Comment from './Comment';

function Post({post}) {
    return <li className="post" >
      <div className="post-author" >
        <div>
          <img src={post.author.avatar} className="avatar" />
        </div>
        <div> 
          <p>{post.author.name}</p>
          <p>{post.date}</p>
        </div>
      </div>
      <div>
        <p>{post.content}</p>
      </div>
      <div>
        <hr/>
      </div>
      <div className="end-post" >
        <ul>
          {post.comments.map(comment => 
          <Comment 
            key={comment.id} 
            comment={comment} 
          />
        )}
        </ul>
      </div>
    </li>
}

export default Post;