# Challenge 21 - Book Search Engine

## Project Description

This app allows you to create a wishlist of books under your own account that you can reference on the go. Manage this list from an intuitive user interface built to do just that.

Built on the MERN stack, this app also leverages Apollo GraphQL to interface with the MongoDB backend.

I had used GraphQL APIs in the past but never really paid attention to how truly powerful they are. Having built this API from scratch gave me insight on how helpful they are for both developers and end users alike.

## Table of Contents
- [User Story](#user-story)
- [Acceptance Criteria](#acceptance-criteria)
- [Links](#links)
- [Dependencies](#dependencies)
- [Screenshots](#screenshots)

## User Story

```md
AS AN avid reader
I WANT to search for new books to read
SO THAT I can keep a list of books to purchase
```

## Acceptance Criteria

```md
GIVEN a book search engine
WHEN I load the search engine
THEN I am presented with a menu with the options Search for Books and Login/Signup and an input field to search for books and a submit button
WHEN I click on the Search for Books menu option
THEN I am presented with an input field to search for books and a submit button
WHEN I am not logged in and enter a search term in the input field and click the submit button
THEN I am presented with several search results, each featuring a book’s title, author, description, image, and a link to that book on the Google Books site
WHEN I click on the Login/Signup menu option
THEN a modal appears on the screen with a toggle between the option to log in or sign up
WHEN the toggle is set to Signup
THEN I am presented with three inputs for a username, an email address, and a password, and a signup button
WHEN the toggle is set to Login
THEN I am presented with two inputs for an email address and a password and login button
WHEN I enter a valid email address and create a password and click on the signup button
THEN my user account is created and I am logged in to the site
WHEN I enter my account’s email address and password and click on the login button
THEN I the modal closes and I am logged in to the site
WHEN I am logged in to the site
THEN the menu options change to Search for Books, an option to see my saved books, and Logout
WHEN I am logged in and enter a search term in the input field and click the submit button
THEN I am presented with several search results, each featuring a book’s title, author, description, image, and a link to that book on the Google Books site and a button to save a book to my account
WHEN I click on the Save button on a book
THEN that book’s information is saved to my account
WHEN I click on the option to see my saved books
THEN I am presented with all of the books I have saved to my account, each featuring the book’s title, author, description, image, and a link to that book on the Google Books site and a button to remove a book from my account
WHEN I click on the Remove button on a book
THEN that book is deleted from my saved books list
WHEN I click on the Logout button
THEN I am logged out of the site and presented with a menu with the options Search for Books and Login/Signup and an input field to search for books and a submit button  
```
 
## Links

To access the code repository and live website, use the links below:

- ### GitHub Repository URL
    https://github.com/sergiorodriguezdev/chl-21-book-search-engine 
- ### Deployed App URL
    https://chl-21-book-search-engine-2545cf8a88fa.herokuapp.com/ 

## Dependencies

To install the appropriate dependencies, execute the following command from the repo folder:

```
npm install
```

## Screenshots

![Book Search Engine Homepage](./README-assets/book-search-engine-homepage.png)

![Book Search Engine Search Results](./README-assets/book-search-engine-results.png)

![Book Search Engine Save Book](./README-assets/book-search-engine-save.png)

![Book Search Engine Delete Book](./README-assets/book-search-engine-delete.png)