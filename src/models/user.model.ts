import { Schema, model, models, InferSchemaType } from "mongoose";

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    username: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      required: true,
    },

    avatar: {
      type: String,
      default: "",
    },

    bio: {
      type: String,
      default: "",
    },

    githubUrl: {
      type: String,
      default: "",
    },

    portfolioUrl: {
      type: String,
      default: "",
    },

    reputation: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  },
);

export type IUser = InferSchemaType<typeof userSchema>;

const User = models.User || model("User", userSchema);

export default User;
