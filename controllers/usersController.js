const express = require("express");
const router = express.Router();

// const users = require("../models/users");
const User = require("../models").User;
const Fruit = require('../models').Fruit;


// GET USERS PROFILE
router.get("/profile/:id", (req, res) => {
  if (req.user.id == req.params.id) {
    User.findByPk(req.params.id, {
      include: [
        {
          model: Fruit,
          attributes: ["id", "name"],
        },
      ],
    }).then((userProfile) => {
      res.render("users/profile.ejs", {
        user: userProfile,
      });
    });
  } else {
    // res.json("unauthorized");
    res.redirect("/");
  }
});


// EDIT PROFILE
router.put("/profile/:id", (req, res) => {
  User.update(req.body, {
    where: {
      id: req.params.id,
    },
    returning: true,
  }).then((updatedUser) => {
    res.redirect(`/users/profile/${req.params.id}`);
  });
});

  
// DELETE USER
router.delete("/:id", (req, res) => {
  User.destroy({
    where: {
      id: req.params.id,
    },
  }).then(() => {
    res.redirect("/");
  });
});


module.exports = router;
