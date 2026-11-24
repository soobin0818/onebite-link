import type { LinkItem } from "./types";

/** links 테이블에서 가져올 컬럼 */
export const LINK_COLUMNS = "id, url, title, description, thumbnail_url, folder_id";

export type LinkRow = {
  id: number;
  url: string;
  title: string | null;
  description: string | null;
  thumbnail_url: string | null;
  folder_id: number | null;
};

/** links 테이블 행을 화면에서 쓰는 LinkItem으로 변환 */
export function toLinkItem(row: LinkRow): LinkItem {
  return {
    id: row.id,
    url: row.url,
    title: row.title ?? row.url,
    description: row.description ?? "",
    image: row.thumbnail_url ?? undefined,
    folderId: row.folder_id,
  };
}
