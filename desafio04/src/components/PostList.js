import React, { Component } from 'react';

import './PostList.css';

import Post from './Post';
import profileAvatar from '../assets/avatar.png';

class PostList extends Component {
  state = {
    posts: [
      {
        id: 1,
        author: {
          name: "Julio Alcantara",
          avatar: profileAvatar
        },
        date: "04 Jun 2019",
        content: "Pessoal, alguém sabe se a Rocketseat está contratando?",
        comments: [
          {
            id: 1,
            author: {
              name: "Diego Fernandes",
              avatar: profileAvatar
            },
            content: "Conteúdo do comentário"
          }
        ]
      },
      {
        id: 2,
        author: {
          name: "Maxwell Acioli",
          avatar: profileAvatar
        },
        date: "20 Fev 2020",
        content: "Pessoal, qual a quantidade de tecnologias que vocês dominam?",
        comments: [
          {
            id: 1,
            author: {
              name: "Ambrosio Firmino",
              avatar: profileAvatar
            },
            content: "ReactJS e Node.js"
          }
        ]
      }
    ]
  };

  render() {
    return <div id="post-list">
      <ul>
        {this.state.posts.map(post =>   
          <Post
            key={post.id} 
            post={post}
          />
        )}
      </ul>
    </div>
  };
}

export default PostList;