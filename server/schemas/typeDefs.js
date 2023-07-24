const { gql } = require('apollo-server-express');

const typeDefs = gql`
    # Define User type
    type User {
        _id: ID
        username: String!
        email: String!
        bookCount: Int
        savedBooks: [Book]
    }

    # Define Book type
    type Book {
        bookId: String!
        authors: [String]
        description: String!
        title: String!
        image: String
        link: String
    }

    # Define Auth type
    type Auth {
        token: ID!
        user: User
    }

    # Define queries
    type Query {
        me: User
    }

    # Define input type to be used in mutation
    input BookInput {
        bookId: String!
        title: String!
        description: String!
        authors: [String]
        image: String
        link: String
    }

    # Define mutations
    type Mutation {
        login(email: String!, password: String!): Auth
        addUser(username: String!, email: String!, password: String!): Auth
        saveBook(book: BookInput!): User
        removeBook(bookId: String!): User
    }
`;

module.exports = typeDefs;