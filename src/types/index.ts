export interface Node {
  id: number;
  parent: number | null;
  title: string;
}

export interface BreadcrumbItem {
  id: number | null;
  title: string;
}
