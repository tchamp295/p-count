import mongoose from "mongoose";
import { Ip } from "./ip";

const RegionSchema = new mongoose.Schema(
  {
    regionName: {
      type: String,
      required: true,
      unique: true,
    },
    ips: [{ type: mongoose.Schema.Types.ObjectId, ref: "Ip" }],
  },
  { timestamps: true }
);

export const Region =
  mongoose.models.Region || mongoose.model("Region", RegionSchema);
