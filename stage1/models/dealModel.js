const mongoose = require("mongoose");

const dealSchema = new mongoose.Schema({
  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Customer",
    required: true,
  },
  images: [String],
  area: {
    type: Number,
    required: [true, "Area cannot be empty"],
  },
  nOfPeople: {
    type: Number,
    required: [true, "Number of people cannot be empty"],
  },
  appointmentDate: {
    type: Date,
    required: [true, "Appointment date cannot be empty"],
  },
  specialInstructions: {
    type: String,
  },
  roomAccess: {
    type: String,
  },
  price: {
    type: Number,
    required: [true, "Deal price cannot be empty"],
  },
  progress: {
    type: String,
    required: [true, "Deal progress cannot be empty"],
    enum: {
      values: ["in-progress", "closed"],
      message: "progress must be one of these values 'in progress', 'closed'",
    },
  },
});

const Deal = mongoose.model("Deal", dealSchema);
module.exports = Deal;
