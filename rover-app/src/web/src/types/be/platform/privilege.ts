export interface PrivilegeDTO {
  id: string;
  name: string;
  level: number;
  children: PrivilegeDTO[];
}
