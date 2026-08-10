export interface ProjectOwner {
  _id: string;
  name: string;
  username: string;
  avatar?: string | null;
  bio?: string;
  githubUrl?: string;
  portfolioUrl?: string;
}

export interface Project {
  _id: string;

  ownerId: ProjectOwner;

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

  createdAt: string;
  updatedAt: string;
}

export interface CreateProjectPayload {
  title: string;
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
}

export interface ProjectResponse {
  success: boolean;
  project: Project;
}

export interface ProjectsResponse {
  success: boolean;
  projects: Project[];
}