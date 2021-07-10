const User = require("../models/User");
const router = require("express").Router();
const bcrypt = require("bcrypt");


//resister user

router.post("/register", async (req, res) => {


  try {
    // create new password
    const salt = await bcrycpt.genSalt();
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    // create new user

    const user = await new User({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
    });

    // save user and give response
    const user = await newUser.save();

    res.status(200).json(user)
  } catch (err) {
    console.log(err);
  }
});


// Login user

router.post("/login", async (req, res) => {
    try {

      const user = await User.findone({
        email: req.body.email
      });
      !user && res.status(404).json("user not found");


      const validPassword = await bcrypt.compare(req.body.password, user.password);
      !validPassword && res.status(400).json("wrong password");



      res.status(200).json(user);




    } catch (err) {
      res.status(500).json(err);
    }

  }


)

module.exports = router;