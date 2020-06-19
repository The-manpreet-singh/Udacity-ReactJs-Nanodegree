import React, { Component } from 'react';

import * as BooksAPI from './BooksAPI';

import './App.css';

import ListBooks from './Components/ListBooks';

import SearchBooks from './Components/SearchBooks';

import { Route } from 'react-router-dom';

class BooksApp extends Component {
	state = {
		books: [],
	};

	componentDidMount() {
		BooksAPI.getAll().then((books) => {
			this.setState({ books });
		});
	}

	shelfHandler = (book, shelf) => {
		BooksAPI.update(book, shelf)
			.then(() => {
				book.shelf = shelf;
				this.setState((currentState) => ({
					books: currentState.books.filter((c) => c.id !== book.id).concat(book),
				}));
			})
			.then(() => (shelf !== 'none' ? alert(`${book.authors} add successfully`) : null))
			.catch(() => alert('Bad request'));
	};

	render() {
		return (
			<div className='app'>
				<Route exact path='/' render={() => <ListBooks books={this.state.books} onChange={this.shelfHandler} />} />
				<Route path='/search' render={() => <SearchBooks mybooks={this.state.books} onChange={this.shelfHandler} />} />
			</div>
		);
	}
}

export default BooksApp;
