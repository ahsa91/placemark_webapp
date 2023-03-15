import Joi from "joi";

export const UserSpec = {
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
};

export const UserCredentialsSpec = {
  email: Joi.string().email().required(),
  password: Joi.string().required(),
};

export const DetailSpec = {
  title: Joi.string().required(),
  latitude: Joi.string().required(),
  longitude: Joi.number().allow("").optional(),
};

export const PlacemarkSpec = {
  title: Joi.string().required(),
};
