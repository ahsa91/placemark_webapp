// Importing the database module from the models folder
import { db } from "../models/db.js";

// Exporting an object with two methods, index and addPlacemark
export const dashboardController = {
  index: {
    // Index method handles GET requests for the dashboard
    handler: async function (request, h) {
      // Retrieve all placemarks from the database
      const placemarks = await db.placemarkStore.getAllPlacemarks();

      // Create an object with title and placemarks properties to be passed to the view
      const viewData = {
        title: "Placemark Dashboard",
        placemarks: placemarks,
      };

      // Return a view with the data created above
      return h.view("dashboard-view", viewData);
    },
  },

  addPlacemark: {
    // addPlacemark method handles POST requests to add a new placemark
    handler: async function (request, h) {
      // Create a new placemark object with the title from the request payload
      const newPlacemark = {
        title: request.payload.title,
      };

      // Add the new placemark to the database
      await db.placemarkStore.addPlacemark(newPlacemark);

      // Redirect the user back to the dashboard
      return h.redirect("/dashboard");
    },
  },
};
