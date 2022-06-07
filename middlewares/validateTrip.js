const { validate } = require("../models/trip");
function validateTrip(req, res, next) {
  let { error } = validate(req.body);
  if (error)
    return res.status(400).send(error.details[0].message + "was the err");
  next();
}
module.exports = validateTrip;
