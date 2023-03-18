import { userJsonStore } from "./json/user-json-store.js";
import { placemarkJsonStore } from "./json/placemark-json-store.js";
import { detailJsonStore } from "./json/detail-json-store.js";
import { userMemStore } from "./mem/user-mem-store.js";
import { placemarkMemStore } from "./mem/placemark-mem-store.js";
import { detailMemStore } from "./mem/detail-mem-store.js";
import { userMongoStore } from "./mongo/user-mongo-store.js";
import { placemarkMongoStore } from "./mongo/placemark-mongo-store.js";
import { detailMongoStore } from "./mongo/detail-mongo-store.js";
import { connectMongo } from "./mongo/connect.js";



export const db = {
  userStore: null, // Initialize the userStore property to null
  placemarkStore: null, // Initialize the placemarkStore property to null
  detailStore: null, // Initialize the detailStore property to null


  init(storeType) {
    switch (storeType) {
      case "json":
        this.userStore = userJsonStore; // Set the userStore property to the userMemStore object
        this.placemarkStore= placemarkJsonStore; // Set the placemarkStore property to the placemarkMemStore object
        this.detailStore = detailJsonStore; // Set the detailStore property to the detailMemStore object
        break;
      case "mongo":
          this.userStore = userMongoStore;  // Set the userStore property to the userMongoStore object
          this.placemarkStore= placemarkMongoStore; // Set the placemarkStore property to the placemarkMongoStore object
          this.detailStore = detailMongoStore; // Set the detailStore property to the detailMongoStore object
          connectMongo();
          break;  
      default:
        this.userStore = userMemStore; // Set the userStore property to the userMemStore object
        this.placemarkStore= placemarkMemStore; // Set the placemarkStore property to the placemarkMemStore object
        this.detailStore = detailMemStore; // Set the detailStore property to the detailMemStore object
        
    }
  },
};