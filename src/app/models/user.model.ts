export interface User {
  id: number;
  firstname: string;
  lastname: string;
  email?: string;
  gender?: 'man' | 'woman';
  rating?: number; // Classement ou elo s'il existe
}
