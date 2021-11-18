import express from 'express';
import asyncHandler from 'express-async-handler';
const router = express.Router();
import {
  Auction,
  Vehicle,
  Sedan,
  Suv,
  Van,
  Truck,
} from '../models/vehicleModel.js';

// @desc    Fetch all auctions
// @route   GET /api/auctions
// @access  Public
router.get(
  '/',
  asyncHandler(async (req, res) => {
    const auctions = await Auction.find({});
    res.json(auctions);
  })
);

// @desc    Posting an auction
// @route   POST /api/auctions
// @access  Public
router.post(
  '/',
  asyncHandler(async (req, res) => {
    const auction = req.body;

    if (auction) {
      const a = await Auction.create(auction);
      res.json(a);
    } else {
      res.status(404);
      throw new error('Invalid auction data');
    }
  })
);

export default router;
