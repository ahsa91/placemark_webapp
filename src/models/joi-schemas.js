import Joi from "joi";



export const UserCredentialsSpec = {
  email: Joi.string().email().required(),
  password: Joi.string().required(),
};

export const UserSpec = {
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
};

export const DetailSpec = {
  title: Joi.string().required(),
  latitude: Joi.string().allow("").optional(),
  longitude: Joi.string().allow("").optional(),
};

export const PlacemarkSpec = {
  title: Joi.string().required(),
};
