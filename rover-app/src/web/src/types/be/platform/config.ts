export interface ConfigDTO {
  id: string;
  name: string;
  type: string;
  typeText: string;
  value: string;
  publicAccess: boolean;
  readonly: boolean;
  description: string;
  createdBy: string;
  createdAt: Date;
  updatedBy?: string;
  updatedAt?: Date;
}