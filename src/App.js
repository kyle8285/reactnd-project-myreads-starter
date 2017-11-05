import React from 'react'
import { Route, Link } from 'react-router-dom';
import * as BooksAPI from './BooksAPI'
import './App.css'
import Bookshelf from './Bookshelf';
import Search from './Search';

class BooksApp extends React.Component {
  state = {
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

        <Route path='/search' render={() => (
          <Search allBooks={allBooks} onBookshelfChange={(book, shelf) => this.addBook(book, shelf)}/>
        )}/>

        <Route exact path='/' render={() => (
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
              <Link to='/search'>>Add a book</Link>
            </div>
          </div>
        )}/>
      </div>
    )
  }
}

export default BooksApp
