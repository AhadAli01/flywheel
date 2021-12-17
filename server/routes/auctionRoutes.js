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

// @desc    Fetch all orders
// @route   GET /api/auctions/getorders
// @access  Public
router.get(
  '/:id/getorders',
  asyncHandler(async (req, res) => {
    const userID = req.params.id;
    const orders = await Order.find();
    let userFound = false;

    for (const order of orders) {
      if (order.buyer._id == userID || order.seller._id == userID) {
        userFound = true;
      }
    }

    if (userFound) {
      Order.find()
        .populate('buyer')
        .populate('seller')
        .populate('purchasedVehicle')
        .exec(function (err, auction) {
          if (err) return handleError(err);
          res.send(auction);
        });
    } else {
      // res.send(
      //   {
      //     purchasedVehicle: {
      //       make: 'Empty',
      //       model: 'Empty',
      //       image:
      //         'https://www.backes-auction.com/uploads/blog/b3b367ada3411e1bb6834ef56103774b.png',
      //     },
      //   },
      //   { seller: { name: 'Empty' } },
      //   { buyer: { name: 'Empty' } },
      //   { price: 0 },
      //   { fee: 0 },
      //   { paymentMethod: 'Empty' },
      //   { paidDate: 'Empty' },
      //   { deliveryDate: 'Empty' },
      // );
      res.send([
        {
          purchasedVehicle: {
            make: 'Empty',
            model: 'Empty',
            image:
              'https://www.backes-auction.com/uploads/blog/b3b367ada3411e1bb6834ef56103774b.png',
          },
          seller: { name: 'Empty' },
          buyer: { name: 'Empty' },
          price: 0,
          fee: 0,
          paymentMethod: 'Empty',
          paidDate: 'Empty',
          deliveryDate: 'Empty',
        },
      ]);
    }
  })
);

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
      await Auction.updateOne(
        { _id: auctionID },
        { $set: { winningbidder: user, bidPrice: bidAmount } }
      );

      for (const userF of userFound) {
        const userWatchlist = userF.watchlist;
        for (let i = 0; i < userWatchlist.length; i++) {
          if (userWatchlist[i]._id === auctionID) {
            const query = { _id: userF._id, 'watchlist._id': auctionID };
            const update = { $set: { 'watchlist.$.bidPrice': bidAmount } };
            await User.updateOne(query, update);
          }
        }
      }
      res.send({ successMessage: 'Successfully updated price' });
    } else {
      res.send({
        errMessage:
          'Invalid bid amount, bids must be integers and increments of 100',
      });
    }
  })
);

// @desc    Updating auction status
// @route   POST /api/auctions/expired
// @access  Public
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
          const query = {
            _id: user._id,
            'watchlist._id': userWatchlist[i]._id,
          };
          const update = { $set: { 'watchlist.$.isSold': true } };
          await User.updateOne(query, update);
        }
      }
    }

    for (const auction of auctions) {
      const a = Date.parse(auction.expiryDate);
      const b = new Date(a);
      const c = new Date();
      if (c >= b) {
        await Auction.updateOne(
          { _id: auction._id },
          { $set: { isSold: true } }
        );
      }
    }
  })
);

// @desc    Creating orders
// @route   POST /api/auctions/createorder
// @access  Public
router.post(
  '/createorder',
  asyncHandler(async (req, res) => {
    const auctions = await Auction.find({ isSold: true });
    const d = new Date();
    d.setDate(d.getDate() + 5);

    for (const auction of auctions) {
      const dupOrder = await Order.find({
        purchasedVehicle: auction.vehicle._id,
      });
      if (dupOrder.length > 0 || auction.winningbidder == "None") {
        continue;
      } else { 
        const buyer = auction.winningbidder;
        const seller = auction.seller._id;
        const purchasedVehicle = auction.vehicle._id;
        const price = auction.bidPrice;
        const paymentMethod = 'Cheque';
        const fee = 5;
        const paidDate = auction.expiryDate;
        const deliveryDate = d.toString();

        const newOrder = new Order({
          buyer: buyer,
          seller: seller,
          purchasedVehicle: purchasedVehicle,
          price: price,
          paymentMethod: paymentMethod,
          fee: fee,
          paidDate: paidDate,
          deliveryDate: deliveryDate,
        });

        newOrder.save(function (err) {
          if (err) {
            console.log(err);
          } else {
            console.log('Successfully created order');
          }
        });
      }
    }
  })
);

// @desc    Remove expired auctions from watchlist
// @route   GET /api/auctions/expiredwatchlist
// @access  Public
router.post(
  '/expiredwatchlist',
  asyncHandler(async (req, res) => {
    const users = await User.find();

    for (const user of users) {
      const userWatchlist = user.watchlist;
      for (let i = 0; i < userWatchlist.length; i++) {
        if (userWatchlist[i].isSold == true) {
          const query = {"_id": user._id};
          const update = { $pull: {"watchlist": {"_id": userWatchlist[i]._id} } };
          console.log(user._id);
          await User.updateOne(query, update);
        }
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
