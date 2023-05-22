import Mongoose from "mongoose";

const { Schema } = Mongoose;

const detailSchema = new Schema({
  title: String,
  latitude: String,
  longitude: String,
  state: Boolean,
  review: String,
  placemarktid: {
    type: Schema.Types.ObjectId,
    ref: "Placemark",
  },
});

export const Detail = Mongoose.model("Detail", detailSchema);
