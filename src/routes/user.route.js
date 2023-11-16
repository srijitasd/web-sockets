const jwt = require("jsonwebtoken");
const Router = require("express").Router();

Router.post("/login", async (req, res) => {
  try {
    const token = jwt.sign({ userName: req.body.name }, process.env.JWT_SECRET);
    res.cookie("AccessToken", token);

    res.json({
      message: "Signin successful",
      token,
    });
  } catch (error) {
    res.status(400).json({ message: "error" });
  }
});

module.exports = Router;
