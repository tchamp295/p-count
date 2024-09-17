import mongoose from "mongoose";
import { Ip } from "./ip";

const RegionSchema = new mongoose.Schema(
  {
    regionName: {
      type: String,
      required: true,
      unique: true,
    },
    ips: [{ type: mongoose.Schema.Types.ObjectId, ref: "Ip" }], // References IPs belonging to this region
    sfps: [{ type: mongoose.Schema.Types.ObjectId, ref: "Sfp" }],
  },
  { timestamps: true }
);

export const Region =
  mongoose.models.Region || mongoose.model("Region", RegionSchema);
