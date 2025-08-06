import mongoose, { Schema } from "moongoose";

const likeSchema = new Schema(
    {
        videos: {
                types: Schema.Types.ObjectId,
                ref: "Video"
            },
        comment: {
            type: Schema.Types.ObjectId,
            ref: "Comment"
        },
        tweet: {
            type: Schema.Types.ObjectId,
            ref: "Tweet"
        },
        likeBy: {
            type: Schema.Types.ObjectId,
            ref: "User"
        }
    },
    {
        timestamps: true
    }
);

export const Like = mongoose.model("Like", likeSchema);
