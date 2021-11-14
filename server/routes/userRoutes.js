import express from 'express';
import asyncHandler from 'express-async-handler';
const router = express.Router();
import Vehicle from '../models/vehicleModel.js';
import User from '../models/userModel.js';
import bcrypt from 'bcryptjs';

// @desc    Fetch all users
// @route   GET /api/users
// @access  Public - should be private (to admin user) once you implement login/register and admin functionality
router.get(
  '/',
  asyncHandler(async (req, res) => {
    const users = await User.find({});
    res.json(users);
  })
);

// @desc    Fetch single user
// @route   GET /api/users/:id
// @access  Public
router.get(
  '/:id',
  asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);

    if (user) {
      res.json(user);
    } else {
      res.status(404);
      throw new Error('user not found');
    }
  })
);

// TODO: Mush pls add the documentation
router.post(
  '/login',
  asyncHandler(async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    const user = await User.findOne({ email: email });

    if (user) {
      if (await user.matchPassword(password)) {
        res.send(user);
      } else {
        res.send({ errMessage: 'Invalid email/password' });
      }
    } else {
      res.send({ errMessage: 'Invalid email/password' });
    }
  })
);

router.post(
  '/signup',
  asyncHandler(async (req, res) => {
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
    const confirmPassword = req.body.confirmPassword;

    if (password === confirmPassword) {
      const newUser = new User({
        name: name,
        email: email,
        password: bcrypt.hashSync(confirmPassword, 10),
        isAdmin: false,
      });

      newUser.save(function (err) {
        if (err) {
          console.log(err);
        } else {
          res.send({ successMessage: 'Successfully registered user' });
        }
      });
    } else {
      res.send({ errMessage: 'The passwords do not match. Try again.' });
    }
  })
);

//fix this...
router.post(
  '/dashboard',
  asyncHandler(async (req, res) => {
    const name = req.body.name;
    const email = req.body.email;
    const phone = req.body.phone;
    const address = req.body.address;

    const newUser = new User({
      name: name,
      email: email,
      //password: bcrypt.hashSync(confirmPassword, 10),
      phone: phone,
      address: address,
    });

    newUser.save(function (err) {
      if (err) {
        console.log(err);
      } else {
        res.send({ successMessage: 'Successfully updated profile' });
      }
    });

    if (password === confirmPassword) {
      const newUser = new User({
        name: name,
        email: email,
        password: bcrypt.hashSync(confirmPassword, 10),
        isAdmin: false,
      });

      newUser.save(function (err) {
        if (err) {
          console.log(err);
        } else {
          res.send({ successMessage: 'Successfully registered user' });
        }
      });
    } else {
      res.send({ errMessage: 'The passwords do not match. Try again.' });
    }
  })
);

// const user = req.body;
// const newUser = new User(user);
// await newUser.save();

// res.json(user);
//   })
// );

// TODO for watchlist have to do so when user created they can add vehicles to watchlist. Have to wait for you/Mush to implement register/login for users
// TODO as watchlist is specific to user/ currently just have all vehicles in watchlist

// @desc    Get user's watchlist
// @route   GET /api/users/:id/watchlist
// @access  Public
router.get(
  '/:id/watchlist',
  asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);

    if (user) {
      res.json(user.watchlist);
    } else {
      res.status(404);
      throw new Error('user not found');
    }
  })
);

// @desc    Add vehicle to user's watchlist
// @route   POST /api/users/:id/watchlist
// @access  Public
router.post(
  '/:id/watchlist',
  asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);

    const vehicle = req.body;

    if (vehicle) {
      // res.json(vehicle);
      user.watchlist.push(vehicle);
      await user.save();
      res.json(user.watchlist);
    } else {
      res.status(404);
      throw new Error('vehicle not found');
    }
  })
);

export default router;
