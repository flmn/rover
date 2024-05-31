export interface RoleDTO {
  id: string;
  name: string;
  description: string;
  privileges: string[];
  userCount: number;
  createdAt: Date;
  updatedAt?: Date;
}