import mongoose, { Schema } from "moongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const videoSchema = new Schema(
    {
        viedeoFile: {
            type: String,
            required: true
        },
        thumnail: {
            type: String,
            required: true
        },
        title: {
            type: String,
            required: true
        },
        description: {
            type: String,
            require: true
        },
        viwes: {
            type: Number,
            default: 0
        },
        duration: {
            type: Number,
            require: true
        },
        isPublished: {
            types: Boolean,
            default: true
        },
        owner: {
            type: Schema.Types.ObjectId,
            ref: "User"
        }
    },
    {
        timestamps: true
    }
);

videoSchema.plugin(mongooseAggregatePaginate)
export const Video = mongoose.model("Video", videoSchema);
