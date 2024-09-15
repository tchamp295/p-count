
import mongoose from "mongoose";

const settingsSchema = new mongoose.Schema(
  {
    appName: { type: String, required: true },
    appEmail: { type: String, required: true },
    appUrl: { type: String, required: true },
    alertExpiry: { type: Number, required: true }, 
    smsSenderId: { type: String, required: true },
    smsGatewayUrl: { type: String, required: true },
    smsApiKey: { type: String, required: true },
  },
  { timestamps: true }
);

export const Settings = mongoose.models.Settings || mongoose.model("Settings", settingsSchema);
