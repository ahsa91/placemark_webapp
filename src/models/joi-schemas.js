import Joi from "joi";

// Validation schema for a valid ID (string or object)
export const IdSpec = Joi.alternatives().try(Joi.string(), Joi.object()).description("a valid ID");

// Validation schema for user credentials
export const UserCredentialsSpec = Joi.object()
  .keys({
    email: Joi.string().email().example("homer@simpson.com").required(), // Validation rule: email format
    password: Joi.string().example("secret").required(), // Validation rule: required string
  })
  .label("UserCredentials");

// Validation schema for user details (extends UserCredentialsSpec)
export const UserSpec = UserCredentialsSpec.keys({
  firstName: Joi.string().example("Homer").required(), // Validation rule: required string
  lastName: Joi.string().example("Simpson").required(), // Validation rule: required string
}).label("UserDetails");

// Validation schema for user details with additional fields (_id, __v)
export const UserSpecPlus = UserSpec.keys({
  _id: IdSpec, // Validation rule: valid ID
  __v: Joi.number(), // Validation rule: number
}).label("UserDetailsPlus");

// Validation schema for an array of users
export const UserArray = Joi.array().items(UserSpecPlus).label("UserArray");

// Validation schema for a single detail object
export const DetailSpec = Joi.object()
  .keys({
    title: Joi.string().required().example("Piano Sonata No. 7"), // Validation rule: required string
    latitude: Joi.string().required().example("Beethoven"), // Validation rule: required string
    longitude: Joi.string().allow("").optional().example(12), // Validation rule: optional string
    state: Joi.boolean().required().example(true), // Validation rule: required boolean
    review: Joi.string().allow("").optional().example("Great"), // Validation rule: optional string
    placemarkid: IdSpec, // Validation rule: valid ID
  })
  .label("Detail");

// Validation schema for a single detail object with additional fields (_id, __v)
export const DetailSpecPlus = DetailSpec.keys({
  _id: IdSpec, // Validation rule: valid ID
  __v: Joi.number(), // Validation rule: number
}).label("DetailPlus");

// Validation schema for an array of details
export const DetailArraySpec = Joi.array().items(DetailSpecPlus).label("DetailArray");

// Validation schema for a placemark object
export const PlacemarkSpec = Joi.object()
  .keys({
    title: Joi.string().required().example("Beethoven Sonatas"), // Validation rule: required string
    userid: IdSpec, // Validation rule: valid ID
    details: DetailArraySpec, // Validation rule: array of details
  })
  .label("Placemark");

// Validation schema for a placemark object with additional fields (_id, __v)
export const PlacemarkSpecPlus = PlacemarkSpec.keys({
  _id: IdSpec, // Validation rule: valid ID
  __v: Joi.number(), // Validation rule: number
}).label("PlacemarkPlus");

// Validation schema for an array of placemarks
export const PlacemarkArraySpec = Joi.array().items(PlacemarkSpecPlus).label("PlacemarkArray");

// Validation schema for JWT authentication response
export const JwtAuth = Joi.object()
  .keys({
    success: Joi.boolean().example("true").required(), // Validation rule: boolean
    token: Joi.string().example("eyJhbGciOiJND.g5YmJisIjoiaGYwNTNjAOhE.gCWGmY5-YigQw0DCBo").required(), // Validation rule: required string
  })
  .label("JwtAuth");
