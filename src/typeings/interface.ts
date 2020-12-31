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
}

export interface RuleProp {
  type: "email" | "required";
  message: string;
}
