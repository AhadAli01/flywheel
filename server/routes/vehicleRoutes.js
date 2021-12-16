import express from 'express';
import asyncHandler from 'express-async-handler';
const router = express.Router();
import { Vehicle, Sedan, Suv, Van, Truck, Comment, Auction } from '../models/vehicleModel.js';





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

router.post("/saveComment", (req, res) => {

  const comment = new Comment (req.body);

  // if (comment) {
  //   await Comment.create(comment);
  //   res.json(comment);
  // } else {
  //   res.status(404);
  //   throw new Error('Invalid user data');
  // }


  //comment.save((err, comment) => {
      // if(err) return res.json({success:false, err})
      
      // Comment.find({'_id': comment._id})
      // .populate('user')
      // .exec((err, result) => {
      //     if(err) return res.json({ success:false, err })
      //     return res.status(200).json({sucess: true, result})
      // })

      comment.save(function (err, comment) {
        if (err) {
          console.log(err);
        } else {
          Comment.find({'_id': comment._id})
          .populate('user')
          .exec((err, result) => {
              if(err) return res.json({ success:false, err })
              return res.status(200).json({sucess: true, result})
          })
        }
      });
  //})
});





export default router;
