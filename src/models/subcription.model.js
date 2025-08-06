import mongoose, { Schema } from "moongoose";

const subscriptionSchema = new Schema(
    {
        subscriber: {
            type: Schema.Types.ObjectId, // One who is SUbscribing
            ref: "User"
        },
        channel: {
            type: Schema.Types.ObjectId, // One to whom subscriber is Subscribing
            ref: "User"
        },
    },
    {
        timestamps: true
    }
);

export const Subscription = mongoose.model("Subscription", subscriptionSchema);
