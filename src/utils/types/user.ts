export interface User {
  id: string;
  email: string;
  name: string;
}

export interface UserSession {
  user: User | null;
  loading: boolean;
  refetch: () => void;
  login: (user: User) => void;
  logout: () => void;
}
