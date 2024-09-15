import mongoose from 'mongoose';
import { AdvisoryCategory } from './advisoryCategory'; // Import the AdvisoryCategory model

const AdvisorySchema = new mongoose.Schema({
  description: {
    type: String,
    required: true,
  },
  advisoryCategory: {
    type: mongoose.Schema.Types.ObjectId, // Reference to the AdvisoryCategory model
    ref: 'AdvisoryCategory',
    required: true, // Make sure every advisory belongs to a category
  },
}, { timestamps: true });

export const Advisory = mongoose.models.Advisory || mongoose.model('Advisory', AdvisorySchema);
