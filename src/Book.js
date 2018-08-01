import React from 'react'
import _ from 'lodash'

const Book = props => {
  const converImageUrl = _.get(props.book, 'imageLinks.thumbnail', false);
  return (
    <li>
      <div className="book">
        <div className="book-top">
          {converImageUrl ?
            <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url("${converImageUrl}")` }}></div>
            : <div className="book-cover" style={{ width: 128, height: 193 }}></div>
          }
          <div className="book-shelf-changer">
            <select value={props.book.shelf} onChange={e => props.moveBookTo(e.target.value, props.book)}>
              <option value="move" disabled>Move to...</option>
              <option value="currentlyReading">Currently Reading</option>
              <option value="wantToRead">Want to Read</option>
              <option value="read">Read</option>
              <option value="none">None</option>
            </select>
          </div>
        </div>
        <div className="book-title">{props.book.title}</div>
        <div className="book-authors">{(props.book.authors || []).join(', ')}</div>
      </div>
    </li>
  );
}

export default Book;
