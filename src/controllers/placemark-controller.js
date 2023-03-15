import { db } from "../models/db.js";


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

  addDetail: {
    handler: async function (request, h) {
      // Get the placemark with the specified ID from the placemark store.
      const placemark = await db.placemarkStore.getPlacemarkById(request.params.id);
      // Create a new detail object with the details submitted in the request payload.
      const newDetail = {
        title: request.payload.title,
        latitude: request.payload.latitude,
        longitude: request.payload.longitude,
      };
      // Add the new detail to the detail store, associated with the placemark ID.
      await db.detailStore.addDetail(placemark._id, newDetail);
      // Redirect to the placemark view page.
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
