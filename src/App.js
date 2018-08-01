import React from 'react'
import { Route } from 'react-router-dom'
import _ from 'lodash'

import * as BooksAPI from './BooksAPI'
import './App.css'
import Search from './Search'
import Home from './Home'

class BooksApp extends React.Component {
  // status will be used to notify users of data refreshes
  state = {
    status: 'ready',
    currentlyReading: [],
    read: [],
    wantToRead: [],
    shelfIdMap: {
      currentlyReading: new Set([]),
      read: new Set([]),
      wantToRead: new Set([])
    }
  }

  populateMyReads() {
    BooksAPI.getAll()
      .then(books => this.setState(currentState => {
        let newState = _.merge({}, currentState);
        newState.currentlyReading = books.filter(book => book.shelf === 'currentlyReading');
        newState.read = books.filter(book => book.shelf === 'read');
        newState.wantToRead = books.filter(book => book.shelf === 'wantToRead');
        newState.shelfIdMap.currentlyReading = new Set(newState.currentlyReading.map(book => book.id));
        newState.shelfIdMap.read = new Set(newState.read.map(book => book.id));
        newState.shelfIdMap.wantToRead = new Set(newState.wantToRead.map(book => book.id));
        return newState;
      }));
  }

  moveBookTo = (toShelf, book) => {
    BooksAPI.update(book, toShelf).then(response => (
      this.setState(currentState => {
        let newState = _.merge({}, currentState);
        if (book.shelf !== 'none') {
          newState[`${book.shelf}`] = newState[book.shelf].filter(_book => _book.id !== book.id);
          newState.shelfIdMap[`${book.shelf}`] = new Set(newState[`${book.shelf}`].map(book => book.id));
        }
        if (toShelf !== 'none') {
          newState[`${toShelf}`] = [_.merge(book, {shelf: toShelf}), ...newState[`${toShelf}`]];
          newState.shelfIdMap[`${toShelf}`] = new Set(newState[`${toShelf}`].map(book => book.id));
        }
        return newState
      })
    ));
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
            moveBookTo={this.moveBookTo}
            shelfIdMap={this.state.shelfIdMap}
          />
        )} />
      </div>
    )
  }
}

export default BooksApp
