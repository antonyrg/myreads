import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import Book from './Book'
import * as BooksAPI from './BooksAPI'

class Search extends Component {
  state = {
    status: 'ready',
    query: '',
    books: []
  }

  search = (query) => {
    this.setState({query: query});
    BooksAPI.search(query)
      .then(books => this.setState({books: books}));
  }

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
              onChange={e => this.search(e.target.value)}
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
