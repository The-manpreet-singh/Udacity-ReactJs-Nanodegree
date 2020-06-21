# MyReads Books Tracking App Project

## live url : https://books-tracking-by-manpreet.netlify.app/

## project rubric- https://review.udacity.com/#!/rubrics/918/view

## About project

A MyRead Book-Tracking app that allows client to select and gives the category books as you have read, currently reading, and wantToread. I also create a serch bar for searching the books and select option to move the books in selected category The project build by using React and I used provided API server and client library.

## How to use

- install dependencies with `npm install` or `yarn install`
- start with `npm start` or `yarn start`

## Backend Server

To simplify my development process, I have a backend server for develop this project. The file [`BooksAPI.js`](src/BooksAPI.js) contains the methods I used to perform necessary operations on the backend:

- [`getAll`](#getall)
- [`update`](#update)
- [`search`](#search)

### `getAll`

Method Signature:

```js
getAll();
```

- Returns a Promise which resolves to a JSON object containing a collection of book objects.
- This collection represents the books currently in the bookshelves in my app.

### `update`

Method Signature:

```js
update(book, shelf);
```

- book: `<Object>` containing at minimum an `id` attribute
- shelf: `<String>` contains one of ["wantToRead", "currentlyReading", "read"]
- Returns a Promise which resolves to a JSON object containing the response data of the POST request

### `search`

Method Signature:

```js
search(query);
```

- query: `<String>`
- Returns a Promise which resolves to a JSON object containing a collection of a maximum of 20 book objects.
- These books do not know which shelf they are on. They are raw results only. I used to make sure that books have the correct state while on the search page.

## Create React App

This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app). You can find more information on how to perform common tasks [here](https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md).
