const User = require("../models/User");
const router = require("express").Router();
const bcrypt = require("bcrypt");

// update user

router.put("/:id", async (req, res) => {
  if (res.body.useId == req.params.id || req.body.isAdmin) {
    if (req.body.password) {
      try {

        const salt = await bcrypt.genSalt(10);

        req.body.password = await bcrypt.hash(req.body.password, salt);

      } catch (err) {

        return res.status(500).json(err);
      }
    }
    try {
      const user = await user.findbyIdAndUpdate(req.params.id, {
        $set: req.body,
      });
      res.status(200).json("Your account has been deleted");
    } catch (err) {
      return res.status(500).json(err);
    }
  } else {
    return res.status(403).json("you cannot delet others account")
  }
})



// delet user

router.delet("/:id", async (req, res) => {
  if (res.body.useId == req.params.id || req.body.isAdmin) {
    if (req.body.password) {
      try {

        const salt = await bcrypt.genSalt(10);

        req.body.password = await bcrypt.hash(req.body.password, salt);

      } catch (err) {

        return res.status(500).json(err);
      }
    }
    try {
      const user = await user.findbyIdAndUpdate(req.params.id, {
        $set: req.body,
      });
      res.status(200).json("Your account has been updated");
    } catch (err) {
      return res.status(500).json(err);
    }
  } else {
    return res.status(403).json("you cannot update others account")
  }
});





// get a user
router.get("/:id", async (req, res) => {

  try {
    const user = await User.findById(req.params.id);
    const {
      password,
      updatedAt,
      ...other
    } = user._doc
    res.status(200).jsonp(other);
  } catch (err) {
    res.status(500).json(err);
  }




});

// follow a user
router.put("/:id/follow", async (req, res) => {
  if (req.body.userId !== req.params.id) {
    try {
      const user = await User.findById(req.params.id);
      const currentUser = await User.findById(req.body.userId);
      if (!user.follower.includes(req.body.userId)) {

        await user.updateOne({
          $push: {
            follower: req.body.userId
          }
        });
        await currentUser.updateOne({
          $push: {
            following: req.body.useId
          }
        });
        res.status(200).json("user has been followed");

      } else {
        res.status(403).json("you already follow this user")
      }
    } catch (err) {
      res.status(500).json(err);
    }
  } else {

    res.status(403).json("you cannot follow yourself");
  }

});



// unfollow a user


router.put("/:id/unfollow", async (req, res) => {
  if (req.body.userId !== req.params.id) {
    try {
      const user = await User.findById(req.params.id);
      const currentUser = await User.findById(req.body.userId);
      if (user.follower.includes(req.body.userId)) {

        await user.updateOne({
          $push: {
            follower: req.body.userId
          }
        });
        await currentUser.updateOne({
          $push: {
            following: req.body.useId
          }
        });
        res.status(200).json("user has been unfollowed");

      } else {
        res.status(403).json("you dont follow this user")
      }
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json("you cannot unfollow yourself");

  }

});






// follow a user
module.exports = router;