import React from 'react'
import { Route } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import './App.css'
import Search from './Search'
import Home from './Home'

class BooksApp extends React.Component {
  state = {
    status: 'ready',
    myReads: {
      currentlyReading: [
        {
          imageLinks: {
            thumbnail: 'http://books.google.com/books/content?id=PGR2AwAAQBAJ&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE73-GnPVEyb7MOCxDzOYF1PTQRuf6nCss9LMNOSWBpxBrz8Pm2_mFtWMMg_Y1dx92HT7cUoQBeSWjs3oEztBVhUeDFQX6-tWlWz1-feexS0mlJPjotcwFqAg6hBYDXuK_bkyHD-y&source=gbs_api'
          },
          title: 'bla',
          authors: 'bla'
        },
      ],
      read: [],
      wantToRead: []
    }
  }

  populateMyReads() {
    BooksAPI.getAll()
      .then(books => this.setState(currentState => (
          {
            myReads: {
              currentlyReading: books.filter(book => book.shelf === 'currentlyReading'),
              read: books.filter(book => book.shelf === 'read'),
              wantToRead: books.filter(book => book.shelf === 'wantToRead')
            }
          }
      )));
  }

  componentDidMount() {
    BooksAPI.getAll().then(books => console.log(books));
    this.populateMyReads();
  }

  render() {
    return (
      <div className='app'>
        <Route exact path='/' render={() => (
          <Home
            myReads={this.state.myReads}
          />
        )} />
        <Route exact path='/search' component={Search} />
      </div>
    )
  }
}

export default BooksApp
