export type Folder = {
  id: number;
  name: string;
};

export type LinkItem = {
  id: number;
  title: string;
  url: string;
  description: string;
  /** 오픈 그래프 썸네일 이미지 주소 */
  image?: string;
  folderId: number;
};

/** /api/og 응답 */
export type OpenGraphData = {
  url: string;
  title: string;
  description: string;
  image: string | null;
};
