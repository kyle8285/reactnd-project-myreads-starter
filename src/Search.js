import React from 'react';
import * as BooksAPI from './BooksAPI';
import Book from './Book';

class Search extends React.Component {

  state = {
    searchTerm: '',
    searchResults: [],
  }

  onSearch(e) {
    const searchTerm = e.target.value;
    if (searchTerm) {
      BooksAPI.search(searchTerm).then(searchResults => {
        this.setState({ searchTerm, searchResults })
      });
    } else {
      this.setState({ searchTerm, searchResults: [] })
    }
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
          <a className="close-search" onClick={() => this.setState({ showSearchPage: false })}>Close</a>
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
