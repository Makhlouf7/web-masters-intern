const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema(
  {
    task: {
      type: String,
      required: [true, "Task cannot be empty"],
    },
    dueDate: {
      type: Date,
      required: [true, "Due date cannot be empty"],
    },
    complete: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const activitySchema = new mongoose.Schema(
  {
    activity: {
      type: String,
      required: [true, "Activity cannot be empty"],
    },
    dueDate: {
      type: Date,
      required: [true, "Due date cannot be empty"],
    },
    images: [String],
  },
  { timestamps: true }
);

const adminSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    unique: true,
    required: true,
  },
  tasks: [taskSchema],
  activities: [activitySchema],
});

adminSchema.pre(/^find/, function () {
  this.populate({
    path: "user",
    select: "name email image",
  });
});

const Admin = mongoose.model("Admin", adminSchema);
module.exports = Admin;
