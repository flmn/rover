export interface ConfigDTO {
  id: string;
  name: string;
  type: string;
  typeText: string;
  value: string;
  publicAccess: boolean;
  description: string;
  createdBy: string;
  createdAt: Date;
  updatedBy?: string;
  updatedAt?: Date;
}