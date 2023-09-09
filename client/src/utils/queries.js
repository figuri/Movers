import { gql } from '@apollo/client';

// Define the GET_ME query
export const GET_ME = gql`
  query Me {
    me {
      _id
      username
      email
      bookCount
      savedBooks {
        bookId
        authors
        description
        title
        image
        link
      }
    }
  }
`;

export const GET_BOOKS = gql`
  query GetBooks {
    books {
      _id
      authors
      description
      title
      image
      link
    }
  }
`;

export const GET_BOOK_BY_ID = gql`
  query GetBookById($bookId: ID!) {
    book(bookId: $bookId) {
      _id
      authors
      description
      title
      image
      link
    }
  }
`;

