const { gql } = require('apollo-server-express');

// Define your GraphQL types
const typeDefs = gql`
  type User {
    _id: ID!
    username: String!
    email: String!
    bookCount: Int
    savedBooks: [Book]
  }

  type Book {
    bookId: ID!
    authors: [String]
    description: String
    title: String!
    image: String
    link: String
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    me: User
    # Add other queries as needed
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    saveBook(input: BookInput!): User
    removeBook(bookId: ID!): User
    # Add other mutations as needed
  }

  input BookInput {
    bookId: ID!
    authors: [String]
    description: String
    title: String!
    image: String
    link: String
  }
`;

module.exports = typeDefs;
