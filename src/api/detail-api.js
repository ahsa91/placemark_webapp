import Boom from "@hapi/boom";
import { db } from "../models/db.js";
import { IdSpec, DetailSpec, DetailSpecPlus, DetailArraySpec } from "../models/joi-schemas.js";
import { validationError } from "./logger.js";

export const detailApi = {
  find: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request, h) {
      try {
        const details = await db.detailStore.getAllDetails();
        return details;
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
    tags: ["api"],
    response: { schema: DetailArraySpec, failAction: validationError },
    description: "Get all detailApi",
    notes: "Returns all detailApi",
  },

  findOne: {
    auth: {
      strategy: "jwt",
    },
    async handler(request) {
      try {
        const detail = await db.detailStore.getDetailById(request.params.id);
        if (!detail) {
          return Boom.notFound("No detail with this id");
        }
        return detail;
      } catch (err) {
        return Boom.serverUnavailable("No detail with this id");
      }
    },
    tags: ["api"],
    description: "Find a Detail",
    notes: "Returns a detail",
    validate: { params: { id: IdSpec }, failAction: validationError },
    response: { schema: DetailSpecPlus, failAction: validationError },
  },

  create: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request, h) {
      try {
        const detail = await db.DetailStore.adddetail(request.params.id, request.payload);
        if (detail) {
          return h.response(detail).code(201);
        }
        return Boom.badImplementation("error creating detail");
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
    tags: ["api"],
    description: "Create a detail",
    notes: "Returns the newly created detail",
    validate: { payload: DetailSpec },
    response: { schema: DetailSpecPlus, failAction: validationError },
  },

  deleteAll: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request, h) {
      try {
        await db.detailStore.deleteAllDetails();
        return h.response().code(204);
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
    tags: ["api"],
    description: "Delete all detailApi",
  },

  deleteOne: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request, h) {
      try {
        const detail = await db.detailStore.getDetailById(request.params.id);
        if (!detail) {
          return Boom.notFound("No Detail with this id");
        }
        await db.detailStore.deleteDetail(detail._id);
        return h.response().code(204);
      } catch (err) {
        return Boom.serverUnavailable("No Detail with this id");
      }
    },
    tags: ["api"],
    description: "Delete a detail",
    validate: { params: { id: IdSpec }, failAction: validationError },
  },
};
