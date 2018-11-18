import React from 'react'
// import * as BooksAPI from './BooksAPI'
import './App.css'
import Search from './Search'
import Book from './Book'
import * as BooksAPI from './BooksAPI'


class BooksApp extends React.Component {
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    showSearchPage: false,
    currentlyReading: [],
    wantToRead: [],
    read: [],
  }

  componentDidMount() {
    BooksAPI.getAll()
      .then((books) => {
        const currentlyReading = books.filter( book => book.shelf === 'currentlyReading');
        const wantToRead = books.filter( book => book.shelf === 'wantToRead');
        const read = books.filter( book => book.shelf === 'read');

        this.setState(() => ({
          currentlyReading: currentlyReading,
          wantToRead: wantToRead,
          read: read,
        }));
      })
  }
  closeSearchPage = () => {
    this.setState(() => ({
      showSearchPage: false,
    }));
  };

  render() {
    return (
      <div className="app">
        {this.state.showSearchPage ? (
         <Search onCloseSearchPage={this.closeSearchPage} />
        ) : (
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Currently Reading</h2>
                  <div className="bookshelf-books">
                    <ol className="books-grid">
                      {this.state.currentlyReading.map((book) => (
                        <li>
                          <Book book={book} />
                        </li>
                       ))} 
                    </ol>
                  </div>
                </div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Want to Read</h2>
                  <div className="bookshelf-books">
                    <ol className="books-grid">
                      {this.state.wantToRead.map((book) => (
                        <li>
                          <Book book={book} />
                        </li>
                       ))}
                    </ol>
                  </div>
                </div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Read</h2>
                  <div className="bookshelf-books">
                    <ol className="books-grid">
                      {this.state.read.map((book) => (
                        <li>
                          <Book book={book} />
                        </li>
                       ))}
                    </ol>
                  </div>
                </div>
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
