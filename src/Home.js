import React, { Component } from 'react';
import BookShelf from './BookShelf'

class Home extends Component {
  render(){
    return (
      <div className='list-books'>
        <div className='list-books-title'>
          <h1>MyReads</h1>
        </div>
        <div className='list-books-content'>
          <div>
            <BookShelf
              shelfName='Currently Reading'
              books={this.props.currentlyReading}
              moveBookTo={this.props.moveBookTo}
            />
            <BookShelf
              shelfName='Read'
              books={this.props.read}
              moveBookTo={this.props.moveBookTo}
            />
            <BookShelf
              shelfName='Want to Read'
              books={this.props.wantToRead}
              moveBookTo={this.props.moveBookTo}
            />
          </div>
        </div>
        <div className='open-search'>
          <a onClick={() => this.setState({ showSearchPage: true })}>Add a book</a>
        </div>
      </div>
    );
  }
}

export default Home;
