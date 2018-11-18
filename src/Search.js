import React, { Component } from 'react'
import PropTypes from 'prop-types'
import * as BooksAPI from './BooksAPI'
import Book from './Book'

class Search extends Component {
  
  state = {
    books: [],
    query: '',
  }

  handleSearch = query => {
    this.setState(() => ({
      query: query.trim()
    }));
    
    const q = this.state.query;
    BooksAPI.search(q, 100)
      .then((books) => {
        this.setState(() => ({
          books
        }))
    });
  }
  render() {
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <a className="close-search" onClick={this.props.onCloseSearchPage}>Close</a>
          <div className="search-books-input-wrapper">
            {/*
              NOTES: The search from BooksAPI is limited to a particular set of search terms.
                     You can find these search terms here:
                     https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                     However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                     you don't find a specific author or title. Every search is limited by search terms.
            */}
            <input type="text" 
                   placeholder="Search by title or author" 
                   value={this.state.query} 
                   onChange={(event) => this.handleSearch(event.target.value)} />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {this.state.books.map((book) => (
              <Book book={book} />
            ))}
          </ol>
        </div>
      </div>
    )
  }
}

Search.propTypes = {
  onCloseSearchPage: PropTypes.func.isRequired,
};

export default Search;