const mongoose = require("mongoose");

const IpSchema = new mongoose.Schema(
  {
    ipName: {
      type: String,
      required: true,
    },
    ipTelephone: {
      type: String,
      required: true,
    },
    ipEmailAddress: {
      type: String,
      required: true,
    },
    ipPostalAddress: {
      type: String,
      required: false,
    },
    ipPhysicalLocation: {
      type: String,
      required: false,
    },
    ipContactPerson: {
      type: String,
      required: true,
    },
    ipContactTelephone: {
      type: String,
      required: true,
    },
    ipContactEmail: {
      type: String,
      required: true,
    },
    region: { // Add this field
      type: mongoose.Schema.Types.ObjectId,
      ref: "Region",
      required: false, // Set to true if you want to make it required
    },
  },
  { timestamps: true }
);

export const Ip = mongoose.models.Ip || mongoose.model("Ip", IpSchema);
