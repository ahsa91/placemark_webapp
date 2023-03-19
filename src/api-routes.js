import { userApi } from "./api/user-api.js";
import { placemarkApi } from "./api/placemark-api.js";
import { detailApi } from "./api/detail-api.js";

export const apiRoutes = [
  { method: "GET", path: "/api/users", config: userApi.find },
  { method: "POST", path: "/api/users", config: userApi.create },
  { method: "DELETE", path: "/api/users", config: userApi.deleteAll },
  { method: "GET", path: "/api/users/{id}", config: userApi.findOne },

  {method: "GET", path: "/api/placemarks", config: placemarkApi.find},
  {method: "GET", path: "/api/placemarks/{id}", config: placemarkApi.findOne},
  {method: "POST", path: "/api/placemarks", config: placemarkApi.create},
  {method: "DELETE", path: "/api/placemarks/{id}", config: placemarkApi.deleteOne},
  {method: "DELETE", path: "/api/placemarks", config: placemarkApi.deleteAll},

  { method: "GET", path: "/api/details", config: detailApi.find },
  { method: "GET", path: "/api/details/{id}", config: detailApi.findOne },
  { method: "POST", path: "/api/playlists/{id}/details", config: detailApi.create },
  { method: "DELETE", path: "/api/details", config: detailApi.deleteAll },
  { method: "DELETE", path: "/api/details/{id}", config: detailApi.deleteOne },

  
  { method: "POST", path: "/api/users/authenticate", config: userApi.authenticate },


    
];
