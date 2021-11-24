const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type Book {
      _id: ID
      authors: [String]
      description: String
      bookId: String
      image: String
      link: String
      title: String
  }

  type User {
      _id: ID
      username: String
      email: String
      Password: String
      savedBooks: [books]
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
      user(user_id: ID!): User
      book(book_id: ID!): Book
      books(user_id: ID!): [Book]
  }

  type Mutation {
    login(email: String!, password: String!): Auth

    addUser(input: addUser!): Auth
    addBook(input: addBook!): User

    removeFriends(book_id: ID!, user_id: ID!): User
    removeBook(book_id: ID!): User

    updateUser(user_id: ID!): User
    updateBook(book_id: ID!): User
  }
`;

module.exports = typeDefs;