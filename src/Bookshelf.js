import React from 'react';
import Book from './Book';

class Bookshelf extends React.Component {
  handleBookshelfChange(book, shelf) {
    this.props.onBookshelfChange(book, shelf);
  }

  render() {
    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{this.props.name}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {this.props.books.map(book => (
              <Book key={book.id}
                    book={book}
                    moveBook={(book, shelf) => this.handleBookshelfChange(book, shelf)} />
            ))}
          </ol>
        </div>
      </div>
    )
  }
}

export default Bookshelf;
