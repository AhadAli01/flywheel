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

router.post('/signup', asyncHandler(async (req, res) => {
  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;
  const confirmPassword = req.body.confirmPassword;

  if (password === confirmPassword) {
    const newUser = new User({
      name: name,
      email: email,
      password: bcrypt.hashSync(confirmPassword, 10),
      isAdmin: false
    });

    newUser.save(function(err) {
      if (err) {
        console.log(err);
      } else {
        res.send({ successMessage: "Successfully registered user"})
      }
    })
  } else {
    res.send({ errMessage: "The passwords do not match. Try again."})
  }
})
);

// TODO for watchlist have to do so when user created they can add vehicles to watchlist. Have to wait for you/Mush to implement register/login for users
// TODO as watchlist is specific to user/ currently just have all vehicles in watchlist

export default router;
