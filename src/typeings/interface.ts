export interface ColumnmProps {
  id: number;
  title: string;
  avatar?: string;
  description: string;
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
  id: number;
  title: string;
  content: string;
  image?: string;
  createdAt: string;
  columnId: number;
}

export interface StoreData {
  columns: ColumnmProps[];
  posts: PostProps[];
  user: UserProps;
}
