import React, { useState, useEffect } from "react";
import {
  Jumbotron,
  Container,
  CardColumns,
  Card,
  Button,
} from "react-bootstrap";

import Auth from "../utils/auth";
import { removeBookId } from "../utils/localStorage";
// Import useQuery nand useMutation methods
import { useQuery, useMutation } from "@apollo/client";
// Import GraphQL query definition
import { GET_ME } from "../utils/queries";
// Import GraphQL mutation definition
import { REMOVE_BOOK } from "../utils/mutations";

const SavedBooks = () => {
  const [userData, setUserData] = useState({});

  // Execute GraphQL query
  const { loading, data } = useQuery(GET_ME);

  // use this to determine if `useEffect()` hook needs to run again
  const userDataLength = Object.keys(userData).length;

  const [removeBook, { error }] = useMutation(REMOVE_BOOK);

  // Set user data on page load
  useEffect(() => {
    const user = data?.me || {};
    setUserData(user);
  }, [data]);

  // create function that accepts the book's mongo _id value as param and deletes the book from the database
  const handleDeleteBook = async (bookId) => {
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }

    try {
      // Execute removeBook mutation, pass bookId value
      const { data } = await removeBook({
        variables: { bookId },
      });

      if (!data || error) {
        throw new Error("something went wrong!");
      }

      // Get updated user data
      const updatedUser = data?.removeBook;

      setUserData(updatedUser);
      // upon success, remove book's id from localStorage
      removeBookId(bookId);
    } catch (err) {
      console.error(err);
    }
  };

  // if data isn't here yet, say so
  if (!userDataLength) {
    return <h2>LOADING...</h2>;
  }

  return (
    <>
      <Jumbotron fluid className="text-light bg-dark">
        <Container>
          <h1>Viewing saved books!</h1>
        </Container>
      </Jumbotron>
      <Container>
        <h2>
          {userData.savedBooks.length
            ? `Viewing ${userData.savedBooks.length} saved ${
                userData.savedBooks.length === 1 ? "book" : "books"
              }:`
            : "You have no saved books!"}
        </h2>
        <CardColumns>
          {userData.savedBooks.map((book) => {
            return (
              <Card key={book.bookId} border="dark">
                {book.image ? (
                  <Card.Img
                    src={book.image}
                    alt={`The cover for ${book.title}`}
                    variant="top"
                  />
                ) : null}
                <Card.Body>
                  <Card.Title>{book.title}</Card.Title>
                  <p className="small">Authors: {book.authors}</p>
                  <Card.Text>{book.description}</Card.Text>
                  <Button
                    className="btn-block btn-danger"
                    onClick={() => handleDeleteBook(book.bookId)}
                  >
                    Delete this Book!
                  </Button>
                </Card.Body>
              </Card>
            );
          })}
        </CardColumns>
      </Container>
    </>
  );
};

export default SavedBooks;
