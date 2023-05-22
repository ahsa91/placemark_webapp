import { db } from "../models/db.js";
import { DetailSpec } from "../models/joi-schemas.js";

export const noticeboardController = {
    index: {
      handler: function (request, h) {
        const viewData = {
          title: "noticeboard ",
        };
        return h.view("noticeboard-view", viewData);
      },
    },
  };
  