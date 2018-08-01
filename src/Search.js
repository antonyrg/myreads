import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import _ from 'lodash'

import Book from './Book'
import * as BooksAPI from './BooksAPI'

class Search extends Component {
  // status will be used to notify users of data refreshes
  state = {
    status: 'ready',
    query: '',
    books: []
  }

  handleSearchInput = (e) => {
    const query = e.target.value;
    this.setState({query: query});
    if (query === '')
      return this.setState({books: []});
    this.searchBooks(query);
  }

  searchBooks = _.debounce((query) => {
    BooksAPI.search(query).then(booksResponse => {
      if (booksResponse.error) {
        return this.setState({books: []});
      }
      this.setState({books: booksResponse.map(book => {
        if (this.props.shelfIdMap.currentlyReading.has(book.id))
          return _.merge(book, {shelf: 'currentlyReading'});
        if (this.props.shelfIdMap.wantToRead.has(book.id))
          return _.merge(book, {shelf: 'wantToRead'});
        if (this.props.shelfIdMap.wantToRead.has(book.id))
          return _.merge(book, {shelf: 'wantToRead'});
        return _.merge(book, {shelf: 'none'});
      })})
    });
  }, 300);

  render() {
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link to="/" className="close-search">Close</Link>
          <div className="search-books-input-wrapper">
            <input
              type="text"
              placeholder="Search by title or author"
              value={this.state.query}
              onChange={this.handleSearchInput}
            />
          </div>
        </div>
        <div className="search-books-results">
          {this.state.books.length !== 0 ? (
            <ol className="books-grid">
              {this.state.books.map(_book => (
                <Book
                  key={_book.id}
                  book={_book}
                  moveBookTo={this.props.moveBookTo}
                />
              ))}
            </ol>
          ): <div>No books to show</div>}
        </div>
      </div>
    );
  }
}

export default Search;
