import { userJsonStore } from "./json/user-json-store.js";
import { placemarkJsonStore } from "./json/placemark-json-store.js";
import { detailJsonStore } from "./json/detail-json-store.js";

export const db = {
  userStore: null, // Initialize the userStore property to null
  placemarkStore: null, // Initialize the placemarkStore property to null
  detailStore: null, // Initialize the detailStore property to null

  init() { // Define an init function that initializes the userStore and placemarkStore
    this.userStore = userJsonStore; // Set the userStore property to the userMemStore object
    this.placemarkStore= placemarkJsonStore; // Set the placemarkStore property to the placemarkMemStore object
    this.detailStore = detailJsonStore; // Set the detailStore property to the detailMemStore object
  },
};
