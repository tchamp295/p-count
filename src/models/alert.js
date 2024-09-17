import mongoose from 'mongoose';

const AlertSchema = new mongoose.Schema(
  {
    description: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      enum: ["Major", "Advisory", "Info"],
      required: true,
    },
    notificationMethods: {
      isSms: { type: Boolean, default: false },
      isHttpPush: { type: Boolean, default: false },
      isEmail: { type: Boolean, default: false },
    },
    ipIds: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Ip',
      },
    ],
    regionIds: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Region',
      },
    ],
  },
  { timestamps: true }
);

export const Alert = mongoose.models.Alert || mongoose.model('Alert', AlertSchema);
