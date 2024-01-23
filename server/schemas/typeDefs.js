const typeDefs = `
  type Query {
    me: User
  }

  type Mutation{
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    saveBook(input: SaveBookInput): User
    removeBook(bookId: ID!): User
  }

  imput SaveBookInput{
    bookId: ID!, 
    authors: [String]
    description: String 
    title: String! 
    image: String 
    link: String
  }

  User {
    _id:ID
    username: String
    email: String
    bookCount: Integer
    savedBooks: [Book]!
  }

  type Book {
    bookId: ID!
    authors: [String]
    description: String
    title: String
    image: String
    link: String
  }

  type Auth {
    token: ID!
    user: User
  }
`;

module.exports = typeDefs;
