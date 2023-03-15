import { v4 } from "uuid";

// create an empty array to store details
let details = [];

export const detailMemStore = {
  // return all details
  async getAllDetails() {
    return details;
  },

  // add a new detail to the array
  async addDetail(placemarkId, detail) {
    detail._id = v4();
    detail.placemarkId = placemarkId;
    details.push(detail);
    return detail;
  },

  // get all details associated with a specific placemark
  async getDetailsByPlacemarkId(id) {
    return details.filter((detail) => detail.placemarkId === id);
  },

  // get a single detail by id
  async getDetailById(id) {
    return details.find((detail) => detail._id === id);
  },

  // get all details associated with a specific placemark
  async getPlacemarkDetails(placemarkId) {
    return details.filter((detail) => detail.placemarkId === placemarkId);
  },

  // remove a detail by id
  async deleteDetail(id) {
    const index = details.findIndex((detail) => detail._id === id);
    details.splice(index, 1);
  },

  // remove all details
  async deleteAllDetails() {
    details = [];
  },

  // update a detail with new values
  async updateDetail(detail, updatedDetail) {
    detail.title = updatedDetail.title;
    detail.latitude = updatedDetail.latitude;
    detail.longitude = updatedDetail.longitude;
  },
};
