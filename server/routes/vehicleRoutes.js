import express from 'express';
import asyncHandler from 'express-async-handler';
const router = express.Router();
import {
  Vehicle,
  Sedan,
  Suv,
  Van,
  Truck,
  Comment,
  Auction,
} from '../models/vehicleModel.js';

// @desc    Fetch all vehicles
// @route   GET /api/vehicles
// @access  Public

router.get(
  '/comments',
  asyncHandler(async (req, res) => {
    const comment = await Comment.find({});
    res.json(comment);
  })
);

// @desc    Fetch all vehicles
// @route   GET /api/vehicles
// @access  Public

router.get(
  '/comments/:id',
  asyncHandler(async (req, res) => {
    const vehicle = await Vehicle.findById(req.params.id);

    if (vehicle) {
      res.json(vehicle.comments);
    } else {
      res.status(404);
      throw new Error('vehicle not found');
    }
  })
);

router.get(
  '/',
  asyncHandler(async (req, res) => {
    const vehicles = await Vehicle.find({});
    res.json(vehicles);
  })
);

// @desc    Fetch single vehicle
// @route   GET /api/vehicles/:id
// @access  Public
router.get(
  '/:id',
  asyncHandler(async (req, res) => {
    const vehicle = await Vehicle.findById(req.params.id);

    if (vehicle) {
      res.json(vehicle);
    } else {
      res.status(404);
      throw new Error('Vehicle not found');
    }
  })
);

// @desc    Add/sell a vehicle
// @route   POST /api/vehicles
// @access  Public
router.post(
  '/',
  asyncHandler(async (req, res) => {
    // const vehicles = await Vehicle.find({});
    // res.json(vehicles);
    const vehicle = req.body;

    if (vehicle) {
      const v = await Vehicle.create(vehicle);
      res.json(v);
    } else {
      res.status(404);
      throw new Error('Invalid user data');
    }
  })
);

// @desc    Add/sell a vehicle - sedan
// @route   POST /api/vehicles/sedan
// @access  Public
router.post(
  '/sedan',
  asyncHandler(async (req, res) => {
    const sedan = req.body;

    if (sedan) {
      await Sedan.create(sedan);
      res.json(sedan);
    } else {
      res.status(404);
      throw new Error('Invalid user data');
    }
  })
);

// @desc    Add/sell a vehicle - suv
// @route   POST /api/vehicles/suv
// @access  Public
router.post(
  '/suv',
  asyncHandler(async (req, res) => {
    const suv = req.body;

    if (suv) {
      await Suv.create(suv);
      res.json(suv);
    } else {
      res.status(404);
      throw new Error('Invalid user data');
    }
  })
);

// @desc    Add/sell a vehicle - van
// @route   POST /api/vehicles/van
// @access  Public
router.post(
  '/van',
  asyncHandler(async (req, res) => {
    const van = req.body;

    if (van) {
      await Van.create(van);
      res.json(van);
    } else {
      res.status(404);
      throw new Error('Invalid user data');
    }
  })
);

// @desc    Add/sell a vehicle - truck
// @route   POST /api/vehicles/truck
// @access  Public
router.post(
  '/truck',
  asyncHandler(async (req, res) => {
    const truck = req.body;

    if (truck) {
      await Truck.create(truck);
      res.json(truck);
    } else {
      res.status(404);
      throw new Error('Invalid user data');
    }
  })
);

//const { Comment } = require("../models/vehicleModel");

router.post(
  '/saveComment/:id',
  asyncHandler(async (req, res) => {
    const comment = new Comment(req.body);

    const vehicle = await Vehicle.findById(req.params.id);

    // const comment = req.body;

    if (vehicle) {
      // res.json(vehicle);
      // user.watchlist.push(auction);
      vehicle.comments.push(comment);
      // await user.save();
      await vehicle.save();
      // res.json(user.watchlist);
      res.json(vehicle.comments);
    } else {
      res.status(404);
      throw new Error('Cannot save a comment');
    }
    //})
  })
);

// @desc    Fetch single sedan
// @route   GET /api/vehicles/sedan/:id
// @access  Public
router.get(
  '/sedan/:id',
  asyncHandler(async (req, res) => {
    const sedan = await Sedan.findOne({ vehicle: req.params.id });

    if (sedan) {
      res.json(sedan);
    } else {
      res.status(404);
      throw new Error('Sedan not found');
    }
  })
);

// @desc    Fetch single SUV
// @route   GET /api/vehicles/suv/:id
// @access  Public
router.get(
  '/suv/:id',
  asyncHandler(async (req, res) => {
    const suv = await Suv.findOne({ vehicle: req.params.id });

    if (suv) {
      res.json(suv);
    } else {
      res.status(404);
      throw new Error('SUV not found');
    }
  })
);

// @desc    Fetch single truck
// @route   GET /api/vehicles/truck/:id
// @access  Public
router.get(
  '/truck/:id',
  asyncHandler(async (req, res) => {
    const truck = await Truck.findOne({ vehicle: req.params.id });

    if (truck) {
      res.json(truck);
    } else {
      res.status(404);
      throw new Error('Truck not found');
    }
  })
);

// @desc    Fetch single van
// @route   GET /api/vehicles/van/:id
// @access  Public
router.get(
  '/van/:id',
  asyncHandler(async (req, res) => {
    const van = await Van.findOne({ vehicle: req.params.id });

    if (van) {
      res.json(van);
    } else {
      res.status(404);
      throw new Error('Van not found');
    }
  })
);

export default router;
