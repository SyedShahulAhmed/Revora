import mongoose, { Document, Model, Schema } from "mongoose";

export interface IProject extends Document {
  ownerId: mongoose.Types.ObjectId;

  title: string;
  slug: string;

  shortDescription: string;
  description: string;

  category: string;
  techStack: string[];

  githubUrl: string;
  demoUrl?: string;
  docsUrl?: string;
  videoUrl?: string;

  coverImage: string;
  gallery: string[];

  averageRating: number;
  reviewCount: number;
  views: number;

  status: "draft" | "published";

  createdAt: Date;
  updatedAt: Date;
}

const ProjectSchema = new Schema<IProject>(
  {
    ownerId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 80,
    },

    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },

    shortDescription: {
      type: String,
      required: true,
      maxlength: 180,
      trim: true,
    },

    description: {
      type: String,
      required: true,
    },

    category: {
      type: String,
      required: true,
    },

    techStack: {
      type: [String],
      default: [],
    },

    githubUrl: {
      type: String,
      required: true,
    },

    demoUrl: {
      type: String,
    },

    docsUrl: {
      type: String,
    },

    videoUrl: {
      type: String,
    },

    coverImage: {
      type: String,
      required: true,
    },

    gallery: {
      type: [String],
      default: [],
    },

    averageRating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },

    reviewCount: {
      type: Number,
      default: 0,
    },

    views: {
      type: Number,
      default: 0,
    },

    status: {
      type: String,
      enum: ["draft", "published"],
      default: "published",
    },
  },
  {
    timestamps: true,
  },
);

const Project: Model<IProject> =
  mongoose.models.Project || mongoose.model<IProject>("Project", ProjectSchema);

export default Project;
