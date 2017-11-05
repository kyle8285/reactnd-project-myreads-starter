import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import Bookshelf from './Bookshelf';
import Search from './Search';

class BooksApp extends React.Component {
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    showSearchPage: false,
    allBooks: [],
  }

 componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({allBooks: books});
    })
  }

  updateBook = (book, shelf) => {
    BooksAPI.update(book, shelf).then(books => {
      this.setState((state) => {
        const updatedBook = state.allBooks.find(b => b.id === book.id);
        updatedBook.shelf = shelf;
      })
    })
  }

  addBook(book, shelf) {
    BooksAPI.update(book, shelf).then(() => {
      book.shelf = shelf;
      this.setState((state) => {
        state.allBooks.push(book);
      })
    })
  }

  render() {
    const { allBooks } = this.state;
    const currentlyReadingBooks = allBooks.filter(book => book.shelf === 'currentlyReading');
    const wantToReadBooks = allBooks.filter(book => book.shelf === 'wantToRead');
    const readBooks = allBooks.filter(book => book.shelf === 'read');

    return (
      <div className="app">
        {this.state.showSearchPage ? (
          <Search onBookshelfChange={(book, shelf) => this.addBook(book, shelf)}/>
        ) : (
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
                <Bookshelf name='Currently Reading'
                           shelf='currentlyReading'
                           books={currentlyReadingBooks}
                           onBookshelfChange={this.updateBook} />
                <Bookshelf name='Want to Read'
                           shelf='wantToRead'
                           books={wantToReadBooks}
                           onBookshelfChange={this.updateBook} />
                <Bookshelf name='Read'
                           shelf='read'
                           books={readBooks}
                           onBookshelfChange={this.updateBook} />
              </div>
            </div>
            <div className="open-search">
              <a onClick={() => this.setState({ showSearchPage: true })}>Add a book</a>
            </div>
          </div>
        )}
      </div>
    )
  }
}

export default BooksApp
