const { AuthenticationError } = require("apollo-server-express");
const { User } = require("../models");
const { signToken } = require("../utils/auth");

const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      if (context.user) {
        // Find user by ID and return it
        //  User ID retrieved from context
        return User.findOne({ _id: context.user._id });
      }

      throw new AuthenticationError("You need to be logged in.");
    },
  },

  Mutation: {
    login: async (parent, { email, password }) => {
      // Find user by email
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError("Authentication error.");
      }

      // Validate password
      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError("Authentication error.");
      }

      // Sign JWT token
      const token = signToken(user);
      return { token, user };
    },
    addUser: async (parent, { username, email, password }) => {
      // Create user
      const user = await User.create({ username, email, password });

      if (!user) {
        throw new Error("Error creating user.");
      }

      // Sign JWT token
      const token = signToken(user);

      return { token, user };
    },
    saveBook: async (parent, { book }, context) => {
      if (context.user) {
        try {
          // Find user by ID
          //  User ID retrieved from context
          const updatedUser = await User.findOneAndUpdate(
            { _id: context.user._id },
            { $addToSet: { savedBooks: book } }, // Add book data to savedBooks array
            { new: true, runValidators: true }
          );

          // Return updated user
          return updatedUser;
        } catch (err) {
          console.log(err);
          throw new Error("Error saving book");
        }
      }

      throw new AuthenticationError("You need to be logged in.");
    },
    removeBook: async (parent, { bookId }, context) => {
      // Find user by ID
      //  User ID retrieved from context
      const updatedUser = await User.findOneAndUpdate(
        { _id: context.user._id },
        { $pull: { savedBooks: { bookId } } }, // Remove book data from savedBooks array
        { new: true }
      );

      if (!updatedUser) {
        throw new Error("Couldn't find user with this ID");
      }

      return updatedUser;
    },
  },
};

module.exports = resolvers;
