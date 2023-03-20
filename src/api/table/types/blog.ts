export interface CreateBlogRequestData {
  archiveTitle: string;
  tagId: string;
  archiveContent: string;
}

export interface UpdateBlogRequestData {
  date: number;
  archiveId: string;
  archiveTitle: string;
  archiveContent: string;
  updateTime: number;
  tagId: string;
  tagName: string;
}

export interface BlogRequestData {
  currentPage: 1;
  pageSize: 10;
  tagId?: number;
  startTime: 0;
  endTime: 0;
}

export interface GetBlogData {
  date: number;
  archiveId: string;
  archiveTitle: string;
  archiveContent: string;
  updateTime: number;
  tagId: string;
  tagName: string;
}

export type GetBlogResponseData = IApiResponseData<{
  list: GetBlogData[];
  total: number;
}>;
