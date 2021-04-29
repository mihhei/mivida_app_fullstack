const { Schema, model, Types } = require("mongoose");

const schema = new Schema({
  cardId: { type: Number, default: 1000 },
  nameTo: { type: String, required: true },
  emailTo: { type: String, required: true },
  summa: { type: Number, required: true },
  nameFrom: { type: String, required: true, unique: true },
  emailFrom: { type: String, required: true },
  message: { type: String },
  date: { type: Date, default: Date.now },
  payment: { type: String },
  paymentMessage: { type: String },
  paymentAUTHCODE: { type: String },
  paymentStatusUpdate: { type: Date },
});

module.exports = model("Giftcard", schema);
