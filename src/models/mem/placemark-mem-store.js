// Import the UUID v4 function
import { v4 } from "uuid";
import { detailMemStore } from "./detail-mem-store.js";

// Initialize an empty array to store placemarks
let placemarks = [];

// Define an object to represent the placemark memory store
export const placemarkMemStore = {

  // Define an asynchronous function to get all placemarks
  async getAllPlacemarks() {
    return placemarks;
  },

  // Define an asynchronous function to add a placemark
  async addPlacemark(placemark) {
    // Generate a new UUID for the placemark
    placemark._id = v4();
    // Add the placemark to the placemarks array
    placemarks.push(placemark);
    // Return the added placemark
    return placemark;
  },

  // Define an asynchronous function to get a placemark by ID
  async getPlacemarkById(id) {
    const list=placemarks.find((placemark) => placemark._id === id);
    list.details=await detailMemStore.getDetailsByPlacemarkId(list._id);
    return list;
  },

  // Define an asynchronous function to delete a placemark by ID
  async deletePlacemarkById(id) {
    // Find the index of the placemark with the specified ID in the placemarks array
    const index = placemarks.findIndex((placemark) => placemark._id === id);
    // Remove the placemark from the placemarks array
    placemarks.splice(index, 1);
  },

  // Define an asynchronous function to delete all placemarks
  async deleteAllPlacemarks() {
    // Clear the placemarks array
    placemarks = [];
  },
};
