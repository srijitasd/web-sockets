const path = require("path");
const http = require("http");
const app = require("express")();
const socketIo = require("socket.io");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const csurf = require("csurf");

const UserRouter = require("./routes/user.route");
const express = require("express");
const { verifyUser } = require("./middlewares/auth");

const csurfProtection = csurf({ cookie: true });

const publicDirectoryPath = path.join(__dirname, "../public");

app.use(express.static(publicDirectoryPath));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use("/user", csurfProtection, UserRouter);

const server = http.createServer(app);

app.get("/csrf", csurfProtection, (req, res) => {
  const token = req.csrfToken();
  res.cookie("X-CSRF-TOKEN", token);
  res.json({ token });
});

const io = socketIo(server);
io.use(verifyUser);

io.on("connection", (socket) => {
  socket.emit("new_connection", `new websocket connection ${socket.id}`);
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`App is rnunning on PORT ${PORT}`);
});
