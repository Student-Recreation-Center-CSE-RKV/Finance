const mongoose = require("mongoose");

const installmentSchema = new mongoose.Schema({
  ReceiptNo: { type: String, required: false },
  Date: { type: Date, required: false },
  Amount: { type: Number, required: false },
});

const Installments = mongoose.model("Installments", installmentSchema);
module.exports = Installments;
