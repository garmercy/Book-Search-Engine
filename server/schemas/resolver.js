const { User } = require('../models');
const { signToken, AuthenticationError } = require('../utils/auth');

const resolvers = { 
  Query: {
    // By adding context to our query, we can retrieve the logged in user without specifically searching for them
    me: async (parent, args, context) => {
      if (context.user) {
        return Profile.findOne({ _id: context.user._id });
      }
      throw AuthenticationError;
    },
  },

  Mutation: {
    addUser: async (parent, { username, email, password }) => {
      // First we create the user
      const user = await User.create({ username, email, password });
      // To reduce friction for the user, we immediately sign a JSON Web Token and log the user in after they are created
      const token = signToken(user);
      // Return an `Auth` object that consists of the signed token and user's information
      return { token, user };
    },

    login: async (parent, { email, password }) => {
      // Look up the user by the provided email address. Since the `email` field is unique, we know that only one person will exist with that email
      const user = await User.findOne({ email });

      // If there is no user with that email address, return an Authentication error stating so
      if (!user) {
        throw AuthenticationError
      }

      // If there is a user found, execute the `isCorrectPassword` instance method and check if the correct password was provided
      const correctPw = await user.isCorrectPassword(password);

      // If the password is incorrect, return an Authentication error stating so
      if (!correctPw) {
        throw AuthenticationError
      }

      // If email and password are correct, sign user into the application with a JWT
      const token = signToken(user);

      // Return an `Auth` object that consists of the signed token and user's information
      return { token, user };
    },

    //If the user it's not logged in will throw an authentication error if the user exist will  save the book that user have been selected.
    saveBook: async (parent, {user, input}) => {
      return User.findOneAndUpdate(
        {_id: context.user._id},
        { $addToSet: { savedBooks: args }},
        { new: true, runValidators: true }
      );
    },
    
    //If the user it's not logged in will throw an authentication error if the user exist will remove the book that user have been selected.
    removeBook: async (parent, {user, bookId}) => {
      return User.findOneAndUpdate(
        { _id: user._id },
        { $pull: { savedBooks: { bookId: bookId } } },
        { new: true } 
      );
    }
  }
} 
module.exports = resolvers;