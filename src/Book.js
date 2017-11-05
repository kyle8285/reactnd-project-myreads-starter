import React from 'react';

class Book extends React.Component {
  handleChange(e) {
    if (this.props.moveBook) {
      this.props.moveBook(this.props.book, e.target.value);
      console.log('moving book')
    }
  }
  render() {
    const { book } = this.props;
    book.shelf = book.shelf || 'none';
    return (
      <li>
        <div className="book">
          <div className="book-top">
            <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.thumbnail})`}}></div>
            <div className="book-shelf-changer">
              <select value={book.shelf} onChange={(e) => this.handleChange(e)}>
                <option value="none" disabled>Move to...</option>
                <option value="currentlyReading">Currently Reading</option>
                <option value="wantToRead">Want to Read</option>
                <option value="read">Read</option>
                <option value="none">None</option>
              </select>
            </div>
          </div>
          <div className="book-title">{book.title}</div>
          <div className="book-authors">{book.authors ? book.authors.join(', ') : ''}</div>
        </div>
      </li>
    )
  }
}

export default Book;
