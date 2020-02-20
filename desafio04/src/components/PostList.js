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
        content: "Pessoal, alguém sabe me dizer por que usar React?",
        comments: [
          {
            id: 1,
            author: {
              name: "Diego Fernandes",
              avatar: profileAvatar
            },
            content: "O React tem sido usado por grandes companhias ao redor do" 
                  + " mundo. Algumas delas: Netflix, Airbnb, American Express," 
                  + " Facebook, WhatsApp, eBay e Instagram. Essa é a prova" 
                  + " de que a ferramenta tem um número de vantagens que não" 
                  + " têm nem comparação nos seus competidores."
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
          },
          {
            id: 2,
            author: {
              name: "Cristaldo Josefo",
              avatar: profileAvatar
            },
            content: "ReactNavite e ReacJS"
          }
        ]
      }
    ]
  };

  render() {
    return <div className="post-list">
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