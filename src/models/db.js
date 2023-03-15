import { userMemStore } from "./mem/user-mem-store.js";
import { placemarkMemStore } from "./mem/placemark-mem-store.js";
import { detailMemStore } from "./mem/detail-mem-store.js";

export const db = {
  userStore: null, // Initialize the userStore property to null
  placemarkStore: null, // Initialize the placemarkStore property to null
  detailStore: null, // Initialize the detailStore property to null

  init() { // Define an init function that initializes the userStore and placemarkStore
    this.userStore = userMemStore; // Set the userStore property to the userMemStore object
    this.placemarkStore= placemarkMemStore; // Set the placemarkStore property to the placemarkMemStore object
    this.detailStore = detailMemStore; // Set the detailStore property to the detailMemStore object
  },
};
