export interface ColumnmProps {
  _id: string;
  title: string;
  avatar?: ImageProps;
  description: string;
}

export interface ImageProps {
  _id?: string;
  url?: string;
  createAt?: string;
}

export interface UserProps {
  isLogin: boolean;
  name?: string;
  id?: number;
  columnId: number;
}

export interface RuleProp {
  type: "email" | "required";
  message: string;
}

export interface PostProps {
  _id: string;
  title: string;
  excerpt?: string;
  content?: string;
  image?: ImageProps;
  createdAt: string;
  column: string;
}

export interface StoreData {
  loading: boolean;
  columns: ColumnmProps[];
  posts: PostProps[];
  user: UserProps;
}
