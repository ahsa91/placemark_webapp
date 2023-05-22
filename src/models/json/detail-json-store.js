import { v4 } from "uuid";
import { Low } from "lowdb";
import { JSONFile } from "lowdb/node";

const db = new Low(new JSONFile("./src/models/json/details.json"));
db.data = { details: [] };

export const detailJsonStore = {
  async getAllDetails() {
    await db.read();
    return db.data.details;
  },

  async addDetail(placemarkId, detail) {
    await db.read();
    detail._id = v4();
    detail.placemarkid = placemarkId;
    db.data.details.push(detail);
    await db.write();
    return detail;
  },

  async getDetailsByPlacemarkId(id) {
    await db.read();
    return db.data.details.filter((detail) => detail.placemarkid === id);
  },

  async getDetailById(id) {
    await db.read();
    return db.data.details.find((detail) => detail._id === id);
  },

  async deleteDetail(id) {
    await db.read();
    const index = db.data.details.findIndex((detail) => detail._id === id);
    db.data.details.splice(index, 1);
    await db.write();
  },

  async deleteAllDetails() {
    db.data.details = [];
    await db.write();
  },

  async updateDetail(detail, updatedDetail) {
    detail.title = updatedDetail.title;
    detail.latitude = updatedDetail.latitude;
    detail.longitude = updatedDetail.longitude;
    detail.state = updatedDetail.state;
    await db.write();
  },
};
