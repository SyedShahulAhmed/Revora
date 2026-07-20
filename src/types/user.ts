export interface User {
  _id: string;
  name: string;
  username: string;
  email: string;

  avatar: string;
  bio: string;

  githubUrl: string;
  portfolioUrl: string;

  reputation: number;

  createdAt: string;
  updatedAt: string;
}