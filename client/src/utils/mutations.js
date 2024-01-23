import { gql } from "@apollo/client";

export const LOGIN_USER = gql`
  mutation loginUser($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
        email
      }
    }
  }
`;

export const SAVE_BOOK = gql`
  mutation saveBook($input: SaveBookInput) {
    saveBook(input: $input) {
			user{
				_id
				username
				bookCount
				savedBooks {
					bookId
					authors
					image
					link
					title
					description
				}
			}
      
    }
  }
`;

export const REMOVE_BOOK = gql`
  mutation removeFriend($bookId: String!) {
    removeBook(bookId: $bookId) {
			user{
				_id
				username
				bookCount
				savedBooks {
					bookId
					authors
					image
					link
					title
					description
				}
			}
    }
  }
`;
