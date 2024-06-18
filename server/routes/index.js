var express = require("express");
var router = express.Router();
const passport = require("passport");
const auth_controller = require("../controllers/auth/auth");


router.get("/", (req, res) => {
  res.send("success");
});

router.post("/register", auth_controller.createUser);

router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login",
  })
);

router.post("/createList", auth_controller.createWatchList);

router.get("/getWatchListByUsername", auth_controller.getWatchListByUsername);

router.get("/logout", (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.send("success");
  });
});

module.exports = router;
