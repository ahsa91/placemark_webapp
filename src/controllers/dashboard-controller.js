// Importing the 'db' object from the '../models/db.js' file
import { db } from "../models/db.js";
// Importing the 'PlacemarkSpec' object from the '../models/joi-schemas.js' file
import { PlacemarkSpec } from "../models/joi-schemas.js";


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

  // Define route handler for adding a placemark
addPlacemark: {
  // Validate incoming payload using Joi schema
  validate: {
    payload: PlacemarkSpec, // PlacemarkSpec is the Joi schema for the placemark object
    options: { abortEarly: false }, // Set option to show all validation errors at once
    failAction: function (request, h, error) {
      // If validation fails, render dashboard view with error details and HTTP 400 status code
      return h.view("dashboard-view", { title: "Add Placemark error", errors: error.details }).takeover().code(400);
    },
  },
  // Handler function to add a new placemark to the database
  handler: async function (request, h) {
    const loggedInUser = request.auth.credentials;
    // Create a new placemark object with the logged in user's ID and title from the request payload
    const newPlacemark = {
      userid: loggedInUser._id,
      title: request.payload.title,
    };
    // Add the new placemark to the database using the placemarkStore
    await db.placemarkStore.addPlacemark(newPlacemark);
    // Redirect the user back to the dashboard after adding the placemark
    return h.redirect("/dashboard");
  },
},


  deletePlacemark: {
    handler: async function (request, h) {
      const placemark=await db.placemarkStore.getPlacemarkById(request.params.id);
      await db.placemarkStore.deletePlacemarkById(placemark._id);
      return h.redirect("/dashboard");
    }
  },
};
