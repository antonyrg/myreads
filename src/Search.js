import React, { Component } from 'react'

import Book from './Book'
import * as BooksAPI from './BooksAPI'

class Search extends Component {
  state = {
    query: '',
    books: []
  }

  search = (query) => {
    this.setState({query: query});
    BooksAPI.getAll()
      .then(books => this.setState({books: books}));
  }

  render() {
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <a className="close-search" onClick={() => this.setState({ showSearchPage: false })}>Close</a>
          <div className="search-books-input-wrapper">
            {/*
              NOTES: The search from BooksAPI is limited to a particular set of search terms.
              You can find these search terms here:
              https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

              However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
              you don't find a specific author or title. Every search is limited by search terms.
            */}
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
