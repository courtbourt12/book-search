const { AuthenticationError } = require("apollo-server-express");
const { User, Book } = require("../models");
const { signToken } = require("../utils/auth");

const resolvers = {
  Query: {
    user: async (parent, args, context) => {
      if (context.user) {
        const userData = await User.findOne({ _id: context.user._id }).select(
          "-__v -password"
        );

        return userData;
      }

      throw new AuthenticationError("Not logged in");
    },
    books: async (parent, { user_id }) => {
      return User.find({ _id: user_id });
    },
    book: async (parent, { book_id }) => {
      return Book.findOne({ _id: book_id });
    },
  },
  Mutations: {
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError("No User with this email found!");
      }

      const correctPw = await user.comparePassword(password);

      if (!correctPw) {
        throw new AuthenticationError("Incorrect password!");
      }

      const token = signToken(user);
      return { token, user };
    },

    // Add new User

    addUser: async (parent, body) => {
      const user = await User.create(body);
      const token = signToken(user);
      return { token, user };
    },
    // Add new Book
    addBook: async (parent, body) => {
      const book = await Book.create(body);
      return book._id;
    },
   
    // Remove goal

    removeBook: async (parent, { book_id }) => {
      return Book.findOneAndDelete({ _id: book_id });
    },
    
    // Update User information

    updateUser: async (parent, { user, body }) => {
      return User.findOneAndUpdate(
        { _id: user._id },
        {
          $addToSet: { addUser: { body } },
        },
        {
          new: true,
          runValidators: true,
        }
      );
    },
    updateUser: async (parent, body) => {
      return await User.findOneAndUpdate(
        { _id: body._id },
        { body },
        { new: true }
      );
    },
    updateBook: async (parent, body) => {
      return await Book.findOneAndUpdate(
        { _id: body._id },
        { body },
        { new: true }
      );
    },
  },
};

module.exports = resolvers;
