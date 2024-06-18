const User = require("../../models/user");
const asyncHandler = require("express-async-handler");

const auth_controller = {
  createUser: asyncHandler(async (req, res) => {
    const user = new User(req.body);
    await user.save();
    res.send("user created");
  }),

  createWatchList: asyncHandler(async (req, res) => {
    const { username, watchList } = req.body;
    try {
      const result = await User.findOneAndUpdate(
        { username },
        { $set: { watchList } },
        { new: true }
      );
      if (!result) {
        return res.status(404).json({ error: "User not found" });
      }
      res.json(result);
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: "Error updating watchlist" });
    }
  }),
  getWatchListByUsername: asyncHandler(async (req, res) => {
    const { username } = req.query; // Assuming username is passed as a route parameter
    try {
      const user = await User.findOne({ username });
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
      // Assuming watchList is an array field in the user document
      const watchList = user.watchList;
      res.json({ watchList });
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: "Error retrieving watchlist" });
    }
  }),
};

module.exports = auth_controller;
