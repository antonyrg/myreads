import React from 'react'
import { Route } from 'react-router-dom'
import _ from 'lodash'

import * as BooksAPI from './BooksAPI'
import './App.css'
import Search from './Search'
import Home from './Home'

class BooksApp extends React.Component {
  state = {
    status: 'ready',
    currentlyReading: [
      {
        'id': 'bla',
        imageLinks: {
          thumbnail: 'http://books.google.com/books/content?id=PGR2AwAAQBAJ&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE73-GnPVEyb7MOCxDzOYF1PTQRuf6nCss9LMNOSWBpxBrz8Pm2_mFtWMMg_Y1dx92HT7cUoQBeSWjs3oEztBVhUeDFQX6-tWlWz1-feexS0mlJPjotcwFqAg6hBYDXuK_bkyHD-y&source=gbs_api'
        },
        title: 'bla',
        authors: ['bla'],
        shelf: 'currentlyReading'
      },
    ],
    read: [],
    wantToRead: []
  }

  populateMyReads() {
    BooksAPI.getAll()
      .then(books => this.setState(currentState => (
          {
            currentlyReading: books.filter(book => book.shelf === 'currentlyReading'),
            read: books.filter(book => book.shelf === 'read'),
            wantToRead: books.filter(book => book.shelf === 'wantToRead')
          }
      )));
  }

  moveBookTo = (toShelf, book) => {
    this.setState(currentState => {
      let newMyReadsData = {};
      book.shelf !== 'none' &&
        (newMyReadsData[`${book.shelf}`] = currentState[book.shelf].filter(_book => _book.id !== book.id));
      toShelf !== 'none' &&
        (newMyReadsData[`${toShelf}`] = [_.merge(book, {shelf: toShelf}), ...currentState[`${toShelf}`]]);
      return newMyReadsData
    });
  }

  componentDidMount() {
    this.populateMyReads();
  }

  render() {
    return (
      <div className='app'>
        <Route exact path='/' render={() => (
          <Home
            currentlyReading={this.state.currentlyReading}
            read={this.state.read}
            wantToRead={this.state.wantToRead}
            moveBookTo={this.moveBookTo}
          />
        )} />
        <Route exact path='/search' render={() => (
          <Search
            currentlyReading={this.state.currentlyReading}
            read={this.state.read}
            wantToRead={this.state.wantToRead}
            moveBookTo={this.moveBookTo}
          />
        )} />
      </div>
    )
  }
}

export default BooksApp
