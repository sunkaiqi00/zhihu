export interface ColumnProps {
  _id: string;
  title: string;
  avatar?: ImageProps;
  description: string;
}

export interface ImageProps {
  _id?: string;
  url?: string;
  createAt?: string;
  filename?: string;
  extname?: string;
}

export interface UserProps {
  isLogin: boolean;
  nickName?: string;
  _id?: string;
  column?: string;
  email?: string;
  avatar?: ImageProps;
  description?: string;
}

export interface RuleProp {
  type: "email" | "required" | "custom";
  message: string;
  validator?: () => boolean;
}

export interface PostProps {
  _id?: string;
  title: string;
  excerpt?: string;
  content?: string;
  image?: ImageProps | string;
  createdAt?: string;
  column: string;
  author?: string | UserProps;
}

export interface ListProps<T> {
  [id: string]: T;
}

export interface StoreData {
  token: string;
  loading: boolean;
  columns: {
    data: ListProps<ColumnProps>;
    currentPage: number;
    total: number;
  };
  posts: {
    data: ListProps<PostProps>;
    loadedColumns: [];
  };
  user: UserProps;
  error: ErrorProps;
}

export interface ErrorProps {
  status: boolean;
  message?: string;
}

export interface ResponseType<T> {
  code: number;
  msg: string;
  data: T;
}

export interface CheckCondition {
  format?: string[];
  size?: number;
}

export interface LoadParams {
  currentPage: number;
  pageSize: number;
}
