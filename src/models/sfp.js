import { Ip } from "./ip";
import { Region } from "./region";
import mongoose from "mongoose";

const SfpSchema = new mongoose.Schema(
  {
    sfpName: {
      type: String,
      required: true,
    },
    sfpEmail: {
      type: String,
      required: true,
    },
    sfpTelephone: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      required: true,
    },
    ip: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Ip", // IP reference
      required: true,
    },
    region: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Region", // Region reference
      required: true,
    },
  },
  { timestamps: true }
);

export const Sfp = mongoose.models.Sfp || mongoose.model("Sfp", SfpSchema);
