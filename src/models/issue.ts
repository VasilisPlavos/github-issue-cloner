export interface Comment {
  body: string;
  author: string;
  createdAt: string;
}

export interface Issue {
  title: string;
  body: string;
  labels: string[];
  comments: Comment[];
}
