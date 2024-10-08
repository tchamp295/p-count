import mongoose, { Schema, models } from "mongoose";

const contactSchema = new Schema(
  {
    names: {
      type: String,
    },
    email: {
      type: String,
    },
    status: {
      type: String,
    },
    regions: {
      type: String,
    },
    telephone: {
      type: String,
    },
  },
  { timestamps: true }
);

const Contact = models.Contact || mongoose.model("Contact", contactSchema);
export default Contact;
