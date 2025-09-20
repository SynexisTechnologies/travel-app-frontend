// Main exports for news feature
export { default as ManageNews } from "./pages/ManageNews";
export { useNews } from "./hooks/useNews";
export { newsColumns } from "./config/newsColumns";
export {
  getNews,
  createNews,
  updateNews,
  deleteNews,
  getNewsById,
} from "./api/newsApi";
export type { News, NewsResponse, SingleNewsResponse } from "./types";
