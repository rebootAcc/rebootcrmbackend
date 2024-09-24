const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const employeeSchema = new Schema({
  employeeId: {
    type: String,
    unique: true,
    required: true,
  },
  employeename: { type: String, required: true },
  mobileNumber: { type: String, required: true, unique: true },
  emergencyNumber: { type: String, unique: true, sparse: true },
  guardianName: { type: String },
  role: { type: String, required: true },
  type: { type: String, required: true },
  govtId: {
    secure_url: { type: String, required: true },
    public_id: { type: String, required: true },
  },
  experienceLetter: {
    secure_url: { type: String },
    public_id: { type: String },
  },
  joiningDate: { type: Date, required: true },
  bankDetails: {
    secure_url: { type: String, required: true },
    public_id: { type: String, required: true },
  },
  agreement: {
    secure_url: { type: String },
    public_id: { type: String },
  },
  status: { type: String },
  createdAt: { type: Date, default: Date.now },
});

// Middleware to set altMobileNumber to null if it is an empty string
employeeSchema.pre("save", function (next) {
  if (this.emergencyNumber === "") {
    this.emergencyNumber = null;
  }
  next();
});

const formatDate = (date) => {
  const options = {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  };
  return new Intl.DateTimeFormat("en-GB", options)
    .format(date)
    .replace(",", "");
};

employeeSchema.virtual("formattedCreatedAt").get(function () {
  return formatDate(this.createdAt);
});

employeeSchema.set("toJSON", { virtuals: true });
employeeSchema.set("toObject", { virtuals: true });

module.exports = mongoose.model("Employee", employeeSchema);
