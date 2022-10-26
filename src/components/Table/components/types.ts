export type TableRowType = {
  createdAt: string;
  name: string;
  updatedAt: string;
  description?: string;
  type: string;
  id: string;
  [key: string]: string | undefined;
};
