// Importing the 'db' object from the '../models/db.js' file
import { db } from "../models/db.js";

// Defining an object called 'dashboardController'
export const dashboardController = {
  
  // Defining a property called 'index'
  index: {
    // Defining a handler function that will be called when a GET request is made to '/dashboard'
    handler: async function (request, h) {
      // Getting the logged in user's credentials from the request object
      const loggedInUser = request.auth.credentials;
      // Retrieving all placemarks for the logged in user using the 'getUserPlacemarks' method of the 'placemarkStore' object from the 'db' object
      const placemarks = await db.placemarkStore.getUserPlacemarks(loggedInUser._id);
      // Creating an object containing the logged in user's details and placemarks retrieved above to pass to the view
      const viewData = {
        title: "Placemark Dashboard",
        user: loggedInUser,
        placemarks: placemarks,
      };
      // Returning the 'dashboard-view' view with the above viewData
      return h.view("dashboard-view", viewData);
    },
  },

  // Defining a property called 'addPlacemark'
  addPlacemark: {
    // Defining a handler function that will be called when a POST request is made to '/dashboard/add-placemark'
    handler: async function (request, h) {
      // Getting the logged in user's credentials from the request object
      const loggedInUser = request.auth.credentials;
      // Creating a new placemark object with the logged in user's id, name, latitude, and longitude
      const newPlacemark = {
        userid: loggedInUser._id,
        title: request.payload.title,
        latitude: request.payload.latitude,
        longitude: request.payload.longitude
      };
      // Adding the new placemark to the database using the 'addPlacemark' method of the 'placemarkStore' object from the 'db' object
      await db.placemarkStore.addPlacemark(newPlacemark);
      // Redirecting the user back to the '/dashboard' page
      return h.redirect("/dashboard");
    },
  },
};
