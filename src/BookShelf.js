import React, { Component }from 'react';
import Book from './Book'

class BookShelf extends Component {
  render(){
    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{this.props.shelfName}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {this.props.books.map(_book => (
              <Book
                key={_book.id}
                book={_book}
                moveBookTo={this.props.moveBookTo}
              />
            ))}
          </ol>
        </div>
      </div>
    );
  }
}

export default BookShelf;
