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
    const seller = req.body.seller;
    const vehicle = req.body.vehicle;
    const bidPrice = req.body.bidPrice;
    const postedDate = req.body.postedDate;
    const expiryDate = req.body.expiryDate;

    const newAuction = new Auction({
      seller: seller,
      vehicle: vehicle,
      bidPrice: bidPrice,
      postedDate: postedDate,
      expiryDate: expiryDate,
      isSold: false,
    });

    newAuction.save(function (err) {
      if (err) {
        console.log(err);
      } else {
        res.send({ successMessage: 'Auction created successfully' });
      }
    });
  })
);

export default router;
