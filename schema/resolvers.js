const { User, Book } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    me: async (_, __, context) => {
      if (context.user) {
        const userData = await User.findOne({ _id: context.user._id }).populate('savedBooks');
        return userData;
      }
      throw new Error('Not logged in');
    },
    // Implement other query resolvers as needed
  },

  Mutation: {
    login: async (_, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new Error('No user with this email address');
      }

      const correctPassword = await user.isCorrectPassword(password);

      if (!correctPassword) {
        throw new Error('Incorrect password');
      }

      const token = signToken(user);

      return { token, user };
    },

    addUser: async (_, { username, email, password }) => {
      const user = await User.create({ username, email, password });
      const token = signToken(user);
      return { token, user };
    },

    saveBook: async (_, { input }, context) => {
      if (context.user) {
        const updatedUser = await User.findByIdAndUpdate(
          context.user._id,
          { $push: { savedBooks: input } },
          { new: true }
        );

        return updatedUser;
      }
      throw new Error('You must be logged in to save a book.');
    },

    removeBook: async (_, { bookId }, context) => {
      if (context.user) {
        const updatedUser = await User.findByIdAndUpdate(
          context.user._id,
          { $pull: { savedBooks: { bookId } } },
          { new: true }
        );

        return updatedUser;
      }
      throw new Error('You must be logged in to remove a book.');
    },
    // Implement other mutation resolvers as needed
  },
};

module.exports = resolvers;
