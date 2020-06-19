import React, { Component } from 'react';

import { Link } from 'react-router-dom';

import ListBooksView from './ListBooksView';

import { PropTypes } from 'prop-types';

class ListBooks extends Component {
	static propsTypes = {
		books: PropTypes.array.isRequired,
		onChange: PropTypes.func.isRequired,
	};

	booksMapHandler = (books, head) => {
		return (
			<div className='bookshelf'>
				<h2 className='bookshelf-title'>{head}</h2>
				<div className='bookshelf-books'>
					<ol className='books-grid'>
						{books.map((book) => (
							<ListBooksView key={book.id} book={book} clickShelfHandler={this.props.onChange} />
						))}
					</ol>
				</div>
			</div>
		);
	};

	render() {
		const { books } = this.props;
		//console.log(books);

		const currentBookFilter = books.filter((book) => book.shelf === 'currentlyReading');
		const wantReadFilter = books.filter((book) => book.shelf === 'wantToRead');
		const readFilter = books.filter((book) => book.shelf === 'read');

		return (
			<div className='list-books'>
				<div className='list-books-title'>
					<h1>MyReads</h1>
				</div>
				<div className='list-books-content'>
					<div>
						{this.booksMapHandler(currentBookFilter, 'Currently Reading Books')}
						{this.booksMapHandler(wantReadFilter, 'Want to Read Books')}
						{this.booksMapHandler(readFilter, 'Read Books')}
					</div>
				</div>

				<div className='open-search'>
					{/* <button onClick={() => this.setState({ showSearchPage: true })}>Add a book</button> */}
					<Link to='/search'>Add a book</Link>
				</div>
			</div>
		);
	}
}

export default ListBooks;
