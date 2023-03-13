// Import the UUID v4 function
import { v4 } from "uuid";

// Initialize an empty array to store users
let users = [];

// Define an object to represent the user memory store
export const userMemStore = {

  // Define an asynchronous function to get all users
  async getAllUsers() {
    return users;
  },

  // Define an asynchronous function to add a user
  async addUser(user) {
    // Generate a new UUID for the user
    user._id = v4();
    // Add the user to the users array
    users.push(user);
    // Return the added user
    return user;
  },

  // Define an asynchronous function to get a user by ID
  async getUserById(id) {
    // Find the user with the specified ID in the users array
    return users.find((user) => user._id === id);
  },

  // Define an asynchronous function to get a user by email
  async getUserByEmail(email) {
    // Find the user with the specified email in the users array
    return users.find((user) => user.email === email);
  },

  // Define an asynchronous function to delete a user by ID
  async deleteUserById(id) {
    // Find the index of the user with the specified ID in the users array
    const index = users.findIndex((user) => user._id === id);
    // Remove the user from the users array
    users.splice(index, 1);
  },

  // Define an asynchronous function to delete all users
  async deleteAll() {
    // Clear the users array
    users = [];
  },
};
