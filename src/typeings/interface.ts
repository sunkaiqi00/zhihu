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
  nickName?: string;
  _id?: number;
  column?: string;
  email?: string;
}

export interface RuleProp {
  type: "email" | "required" | "custom";
  message: string;
  validator?: () => boolean;
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
  token: string;
  loading: boolean;
  columns: ColumnmProps[];
  posts: PostProps[];
  user: UserProps;
  error: ErrorProps;
}

export interface ErrorProps {
  status: boolean;
  message?: string;
}
