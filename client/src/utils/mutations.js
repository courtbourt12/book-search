import { gql } from '@apollo/client';

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
        username
        email
        password
    }
  }
`;

export const SAVE_BOOK = gql`
  mutation saveBook(bookData: BookInput!) {
    saveBook(bookData: BookInput!) {
      bookData
    }
  }
`;

export const REMOVE_BOOK = gql`
  mutation  removeBook(book_id: ID!) {
    removeBook(book_id: ID!) {
      bookData
    }
  }
`;

export const LOGIN_USER = gql`
  mutation  login(email: String!, password: String!) {
    login(email: String!, password: String!) {
      email
      password
    }
  }
`;