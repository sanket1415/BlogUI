export interface Post {
    id: number;
    title: string;
    date: string;
    category: string;
    status: "published" | "draft" | "archived";
    views: number;
    likes: number;
    comments: number;
    shares: number;
    author: string;
    excerpt: string;
    selected: boolean;
  }