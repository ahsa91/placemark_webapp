import { db } from "../models/db.js";
import { DetailSpec } from "../models/joi-schemas.js";


export const placemarkController = {
  index: {
    handler: async function (request, h) {
      // Get the placemark with the specified ID from the placemark store.
      const placemark = await db.placemarkStore.getPlacemarkById(request.params.id);
      // Prepare the view data with the placemark and a title.
      const viewData = {
        title: "Placemark",
        placemark: placemark,
      };
      // Render the 'placemark-view' template with the view data and return it.
      return h.view("placemark-view", viewData);
    },
  },

  // // Define route handler for adding a new detail to a placemark
  // addDetail: {
  //   // Validate incoming payload using Joi schema
  //   validate: {
  //     payload: DetailSpec, // DetailSpec is the Joi schema for the detail object
  //     options: { abortEarly: false }, // Set option to show all validation errors at once
  //     failAction: function (request, h, error) {
  //       // If validation fails, render placemark view with error details and HTTP 400 status code
  //       return h.view("placemark-view", { title: "Add detail error", errors: error.details }).takeover().code(400);
  //     },
  //   },
  //   // Handler function to add a new detail to a placemark in the database
  //   handler: async function (request, h) {
  //     const placemark = await db.placemarkStore.getPlacemarkById(request.params.id);
  //     // Create a new detail object with title, latitude, and longitude from the request payload
  //     const newDetail = {
  //       title: request.payload.title,
  //       latitude: request.payload.latitude,
  //       longitude: request.payload.longitude,
  //       state: request.payload.state,
  //     };
  //     console.log(newDetail);
  //     console.log("placemark._id",placemark._id);
  //     // Add the new detail to the placemark using the detailStore
  //     await db.detailStore.addDetail(placemark._id, newDetail);
  //     // Redirect the user back to the placemark view after adding the detail
  //     return h.redirect(`/placemark/${placemark._id}`);
  //   },
  // },
  addDetail: {
    // Validate incoming payload using Joi schema
    validate: {
      payload: DetailSpec, // DetailSpec is the Joi schema for the detail object
      options: { abortEarly: false }, // Set option to show all validation errors at once
      failAction: function (request, h, error) {
        // If validation fails, render placemark view with error details and HTTP 400 status code
        return h.view("placemark-view", { title: "Add detail error", errors: error.details }).takeover().code(400);
      },
    },
    // Handler function to add a new detail to a placemark in the database
    handler: async function (request, h) {
      const placemark = await db.placemarkStore.getPlacemarkById(request.params.id);
      // Create a new detail object with title, latitude, and longitude from the request payload
      const newDetail = {
        title: request.payload.title,
        latitude: request.payload.latitude,
        longitude: request.payload.longitude,
        state: request.payload.state,
        review: request.payload.review,
      };
      console.log(newDetail);
      console.log("placemark._id",placemark._id);
      // Add the new detail to the placemark using the detailStore
      await db.detailStore.addDetail(placemark._id, newDetail);
  
      // Add the placemark with state false to a new array
      const placemarksWithStateFalse = [];
  
      // Check if the added detail has state set to false
      if (newDetail.state === false) {
        const placemarkWithStateFalse = { ...placemark, detail: newDetail };
        placemarksWithStateFalse.push(placemarkWithStateFalse);
      }
  
      // Log placemarksWithStateFalse to the console
      console.log("Placemarks with state set to false:", placemarksWithStateFalse);
      console.log("newDetail.state:", newDetail.state);
  
      // Redirect the user back to the placemark view after adding the detail
      return h.redirect(`/placemark/${placemark._id}`);
    },
  },
  


  deleteDetail: {
    handler: async function (request, h) {
      const placemark = await db.placemarkStore.getPlacemarkById(request.params.id);
      await db.detailStore.deleteDetail(request.params.detailid);
      return h.redirect(`/placemark/${placemark._id}`);
    },
  },
};
