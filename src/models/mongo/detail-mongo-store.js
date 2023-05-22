import { Detail } from "./detail.js";
import { Placemark } from "./placemark.js";

export const detailMongoStore = {
  async getAllDetails() {
    const details = await Detail.find().lean();
    return details;
  },

  async addDetail(placemarkId, detail) {
    detail.placemarkid = placemarkId;
    const newDetail = new Detail(detail);
    const detailObj = await newDetail.save();
    return this.getDetailById(detailObj._id);
  },

  async getDetailsByPlacemarkId(id) {
    const details = await Detail.find({ placemarkid: id }).lean();
    return details;
  },

  async getDetailById(id) {
    if (id) {
      const detail = await Detail.findOne({ _id: id }).lean();
      return detail;
    }
    return null;
  },

  async deleteDetail(id) {
    try {
      await Detail.deleteOne({ _id: id });
    } catch (error) {
      console.log("bad id");
    }
  },

  async deleteAllDetails() {
    await Detail.deleteMany({});
  },

  async updateDetail(detail, updatedDetail) {
    const detailDoc = await Detail.findOne({ _id: detail._id });
    detailDoc.title = updatedDetail.title;
    detailDoc.latitude = updatedDetail.latitude;
    detailDoc.longitude = updatedDetail.longitude;
    detailDoc.state = updatedDetail.state;
    detailDoc.review = updatedDetail.review;
    await detailDoc.save();
  },
};
