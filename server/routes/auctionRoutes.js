import express from 'express';
import asyncHandler from 'express-async-handler';
import { User } from '../models/userModel.js';
import Order from '../models/orderModel.js';
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
    Auction.find()
      .populate('seller')
      .populate('vehicle')
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
    const auctions = await Auction.findById(req.params.id)
      .populate('seller')
      .populate('vehicle');

    if (auctions) {
      res.send(auctions);
    } else {
      res.send({ errMessage: 'Auction not found' });
    }
  })
);

// @desc    Update auction price
// @route   POST /api/auctions/updateprice
// @access  Public
router.post(
  '/updateprice',
  asyncHandler(async (req, res) => {
    const auctionID = req.body.auctionID;
    const user = req.body.user;
    const bidAmount = req.body.bidAmount;

    const auction = await Auction.findById(auctionID);
    const userFound = await User.find();

    if (bidAmount - auction.bidPrice == 100) {

      await Auction.updateOne({ _id: auctionID }, { $set: { winningbidder: user, bidPrice: bidAmount } });
      
      for (const userF of userFound) {
        const userWatchlist = userF.watchlist;
        for (let i = 0; i < userWatchlist.length; i++) {
          if (userWatchlist[i]._id === auctionID) {
            const query = { _id: userF._id, "watchlist._id": auctionID};
            const update = { $set: { 'watchlist.$.bidPrice': bidAmount } };
            await User.updateOne(query, update);
          }
        }
      }
      res.send({ successMessage: 'Successfully updated price' });
    } else {
      res.send({ errMessage: 'Invalid bid amount, bids must be integers and increments of 100'});
    }
  })
);

router.post(
  '/expired',
  asyncHandler(async (req, res) => {
    const auctions = await Auction.find();
    const users = await User.find();

    for (const user of users) {
      const userWatchlist = user.watchlist;
      for (let i = 0; i < userWatchlist.length; i++) {
          const a = Date.parse(userWatchlist[i].expiryDate);
          const b = new Date(a);
          const c = new Date();
          if (c >= b) {
            const query = { _id: user._id, "watchlist._id": userWatchlist[i]._id};
            const update = { $set: { 'watchlist.$.isSold': false } };
            await User.updateOne(query, update);
          }
      }
    }

    for (const auction of auctions) {
      const a = Date.parse(auction.expiryDate);
      const b = new Date(a);
      const c = new Date();
      if (c >= b) {
        await Auction.updateOne({_id: auction._id}, { $set: {isSold: false} });
      }
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
