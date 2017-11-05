import React from 'react';
import { Link } from 'react-router-dom';
import * as BooksAPI from './BooksAPI';
import Book from './Book';

class Search extends React.Component {

  state = {
    searchTerm: '',
    searchResults: [],
  }

  onSearch(e) {
    const searchTerm = e.target.value;
    const { allBooks } = this.props;

    this.setState({ searchTerm })

    BooksAPI.search(searchTerm).then(searchResults => {
      // success returns array, error returns obj
      if (Array.isArray(searchResults)) {
        // set the shelf if applicable
        searchResults.forEach(result => {
          const bookOnShelf = allBooks.find(book => book.id === result.id);
          if (bookOnShelf) result.shelf = bookOnShelf.shelf;
        });
      } else {
          searchResults = [];
      }
      this.setState({ searchResults });
    });
  }

  handleBookshelfChange(book, shelf) {
    if (this.props.onBookshelfChange) {
      this.props.onBookshelfChange(book, shelf);
    }
  }

  render() {
    const { searchResults, searchTerm } = this.state;

    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link to='/' className="close-search">Close</Link>
          <div className="search-books-input-wrapper">
            <input type="text"
                   value={searchTerm}
                   onChange={(e) => this.onSearch(e)}
                   autoFocus
                   placeholder="Search by title or author"/>
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {searchResults.length ? (
              searchResults.map(book => (
                <Book key={book.id} book={book} moveBook={(book, shelf) => this.handleBookshelfChange(book, shelf)} />
              ))
            ) : (
              <div> No Results </div>
            )}
          </ol>
        </div>
      </div>
    )
  }
}


export default Search;
