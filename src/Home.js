import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import BookShelf from './BookShelf'

const Home = (props) => (
  <div className='list-books'>
    <div className='list-books-title'>
      <h1>MyReads</h1>
    </div>
    <div className='list-books-content'>
      <div>
        <BookShelf
          shelfName='Currently Reading'
          books={props.currentlyReading}
          moveBookTo={props.moveBookTo}
        />
        <BookShelf
          shelfName='Read'
          books={props.read}
          moveBookTo={props.moveBookTo}
        />
        <BookShelf
          shelfName='Want to Read'
          books={props.wantToRead}
          moveBookTo={props.moveBookTo}
        />
      </div>
    </div>
    <div className='open-search'>
      <Link to="/search">Add a book</Link>
    </div>
  </div>
);
export default Home;
