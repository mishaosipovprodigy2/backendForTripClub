var mongoose = require("mongoose");
const Joi = require("@hapi/joi");
var tripSchema = mongoose.Schema({
  place: String,
  price: Number,
  days: Number,
  createdById: String,
  createdByName: String,
  startingDate: String,
  endingDate: String,
});
var Trip = mongoose.model("Trip", tripSchema);

function validateTrip(data) {
  const schema = Joi.object({
    place: Joi.string().min(3).max(100).required(),
    price: Joi.number().min(0).required(),
    days: Joi.number().min(1).required(),
    createdById: Joi.string().min(3).max(100).required(),
    createdByName: Joi.string().min(3).max(100).required(),
    startingDate: Joi.string().required(),
    endingDate: Joi.string().required(),
  });
  return schema.validate(data, { abortEarly: false });
}
module.exports.Trip = Trip;
module.exports.validate = validateTrip;
