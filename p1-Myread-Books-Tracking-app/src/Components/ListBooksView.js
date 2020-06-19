import React from "react";

import PropTypes from "prop-types";

function ListBooksView(props) {
	const shelfUpdateHandler = (e) => {
		props.clickShelfHandler(props.book, e.target.value);
	};

	const img = props.book.imageLinks ? props.book.imageLinks.thumbnail : null;

	return (
		<div>
			<li>
				<div className="book">
					<div className="book-top">
						<div
							className="book-cover"
							style={{
								width: 128,
								height: 193,
								backgroundImage: `url(${img})`,
							}}
						></div>
						<div className="book-shelf-changer">
							<select onChange={shelfUpdateHandler} value={props.book.shelf}>
								<option value="move" disabled>
									Move to...
								</option>
								<option value="currentlyReading">Currently Reading</option>
								<option value="wantToRead">Want to Read</option>
								<option value="read">Read</option>
								<option value="none">None</option>
							</select>
						</div>
					</div>
					<div className="book-title">{props.book.title}</div>
					<div className="book-authors">{props.book.authors}</div>
				</div>
			</li>
		</div>
	);
}

ListBooksView.propTypes = {
	clickShelfHandler: PropTypes.func.isRequired,
};

export default ListBooksView;
