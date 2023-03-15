import { v4 } from "uuid";
import { Low } from "lowdb";
import { JSONFile } from "lowdb/node";
import { detailJsonStore } from "./detail-json-store.js";

// Create a new Low instance using the JSONFile adapter to read and write to the "placemarks.json" file
const db = new Low(new JSONFile("./src/models/json/placemarks.json"));

// Set the initial data for the database to an empty array of placemarks
db.data = { placemarks: [] };

// Define the placemarkJsonStore module
export const placemarkJsonStore = {

  // Retrieve all placemarks from the database
  async getAllPlacemarks() {
    await db.read(); // Read the database file before accessing it
    return db.data.placemarks; // Return the array of placemarks
  },

  // Add a new placemark to the database
  async addPlacemark(placemark) {
    await db.read(); // Read the database file before accessing it
    placemark._id = v4(); // Assign a unique ID to the new placemark using the v4 function from the uuid library
    db.data.placemarks.push(placemark); // Add the new placemark to the array of placemarks in the database
    await db.write(); // Write the updated database file to disk
    return placemark; // Return the new placemark with its ID
  },

  // Retrieve a specific placemark from the database by its ID
  async getPlacemarkById(id) {
    await db.read(); // Read the database file before accessing it
    const detail = db.data.placemarks.find((placemark) => placemark._id === id); // Find the placemark in the array of placemarks with the matching ID
    detail.details = await detailJsonStore.getDetailsByPlacemarkId(detail._id); // Retrieve the details associated with the placemark and add them to the detail property
    return detail; // Return the placemark with its associated details
  },

  // Retrieve all placemarks belonging to a specific user from the database
  async getUserPlacemarks(userid) {
    await db.read(); // Read the database file before accessing it
    return db.data.placemarks.filter((placemark) => placemark.userid === userid); // Filter the array of placemarks to only include those belonging to the specified user ID
  },

  // Delete a specific placemark from the database by its ID
  async deletePlacemarkById(id) {
    await db.read(); // Read the database file before accessing it
    const index = db.data.placemarks.findIndex((placemark) => placemark._id === id); // Find the index of the placemark in the array of placemarks with the matching ID
    db.data.placemarks.splice(index, 1); // Remove the placemark from the array of placemarks
    await db.write(); // Write the updated database file to disk
  },

  // Delete all placemarks from the database
  async deleteAllPlacemarks() {
    db.data.placemarks = []; // Set the array of placemarks in the database to an empty array
    await db.write(); // Write the updated database file to disk
  },
};
