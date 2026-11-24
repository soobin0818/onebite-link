export type Folder = {
  id: number;
  name: string;
};

export type LinkItem = {
  id: number;
  title: string;
  url: string;
  description: string;
  folderId: number;
};
