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

// @desc    Fetch auctions joined with User
// @route   GET /api/auctions/joinuser
// @access  Public
router.get(
  '/joinuser',
  asyncHandler(async (req, res) => {
    Auction.find().populate('seller')
      .exec(function (err, auction) {
        if (err) return handleError(err);
        res.send(auction);
      });
  })
);

// @desc    Fetch auctions joined with Vehicle
// @route   GET /api/auctions/joinvehicle
// @access  Public
router.get(
  '/joinvehicle',
  asyncHandler(async (req, res) => {
    Auction.find().populate('vehicle')
      .exec(function (err, auction) {
        if (err) return handleError(err);
        res.send(auction);
      });
  })
);

// @desc    Fetch auctions joined with User and Vehicle
// @route   GET /api/auctions/joinboth
// @access  Public
router.get(
  '/joinboth',
  asyncHandler(async (req, res) => {
    Auction.find().populate('seller').populate('vehicle')
      .exec(function (err, auction) {
        if (err) return handleError(err);
        res.send(auction);
      });
  })
);

// @desc    Fetch auctions by id
// @route   GET /api/auctions/:id
// @access  Public
router.get(
  '/:id',
  asyncHandler(async (req, res) => {
    const auctions = await Auction.findById(req.params.id);

    if (auctions) {
      res.send(auctions);
    } else {
      res.send({ errMessage: 'Auction not found' });
    }
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
