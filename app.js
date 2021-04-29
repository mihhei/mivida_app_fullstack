const express = require("express");
const app = express();
const config = require("config");
const cors = require("cors");
const mongoose = require("mongoose");
const path = require("path");

app.use(express.json({ extends: true }));
app.use(cors());

app.use("/api/feedback", require("./routes/feedback.routes"));
app.use("/api/giftcard", require("./routes/giftcard.routes"));
app.use("/create-charge", require("./routes/createcharge.routes"));
app.use("/e-payment-return", require("./routes/epaymentreturn.routes"));
app.use("/e-payment-notify", require("./routes/epaymentnotify.routes"));

if (process.env.NODE_ENV === "production") {
  app.use("/", express.static(path.join(__dirname, "client", "build")));
}

const PORT = process.env.PORT || 5000;

async function start() {
  try {
    await mongoose.connect(config.get("mongoURL"), {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
    app.listen(PORT, () => console.log(`App started on port ${PORT}...`));
  } catch (e) {
    console.log("Server Error", e.message);
    process.exit(1);
  }
}

start();
