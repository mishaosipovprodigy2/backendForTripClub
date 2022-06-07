const express = require("express");
let router = express.Router();
const validateTrip = require("../../middlewares/validateTrip");
const auth = require("../../middlewares/auth");
const admin = require("../../middlewares/admin");
var { Trip } = require("../../models/trip");
//get Trips
router.get("/", async (req, res) => {
  console.log(req.user);
  let page = Number(req.query.page ? req.query.page : 1);
  let perPage = Number(req.query.perPage ? req.query.perPage : 10);
  let skipRecords = perPage * (page - 1);
  let trips = await Trip.find().skip(skipRecords).limit(perPage);
  return res.send(trips);
});
//get single products
router.get("/:id", async (req, res) => {
  try {
    let trip = await Trip.findById(req.params.id);
    if (!trip) return res.status(400).send("Trip With given ID is not present"); //when id is not present id db
    return res.send(trip); //everything is ok
  } catch (err) {
    return res.status(400).send("Invalid ID"); // format of id is not correct
  }
});
//update a record
router.put("/:id", async (req, res) => {
  let trip = await Trip.findById(req.params.id);
  trip.place = req.body.place;
  trip.price = req.body.price;
  trip.days = req.body.days;
  trip.createdById = trip.createdById;
  trip.createdByName = trip.createdByName;
  await trip.save();
  return res.send(trip);
});
//delete a record
router.delete("/:id", async (req, res) => {
  let trip = await Trip.findByIdAndDelete(req.params.id);
  return res.send(trip);
});
//Insert a record
router.post("/", validateTrip, async (req, res) => {
  let trip = new Trip();
  trip.place = req.body.place;
  trip.price = req.body.price;
  trip.days = req.body.days;
  trip.createdById = req.body.createdById;
  trip.createdByName = req.body.createdByName;
  trip.startingDate = req.body.startingDate;
  trip.endingDate = req.body.endingDate;
  await trip.save();
  return res.send(trip);
});
module.exports = router;
