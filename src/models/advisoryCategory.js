import mongoose from 'mongoose';

const AdvisoryCategorySchema = new mongoose.Schema({
  categoryName: {
    type: String,
    required: true,
    unique: true,
  },
  desc: {
    type: String,
    required: false,
  },
}, { timestamps: true });

export const AdvisoryCategory = mongoose.models.AdvisoryCategory || mongoose.model('AdvisoryCategory', AdvisoryCategorySchema);
