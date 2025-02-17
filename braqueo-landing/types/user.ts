// src/types/user.ts
export type UserRole = 'FINDER' | 'SEEKER';

export interface User {
  id: string;
  username: string;
  role: UserRole;
}