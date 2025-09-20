// Main exports for gallery feature
export { default as ManageGallery } from "./pages/ManageGallery";
export { useGallery } from "./hooks/useGallery";
export { galleryColumns } from "./config/galleryColumns";
export {
  getGallery,
  createGalleryItem,
  updateGalleryItem,
  deleteGalleryItem,
  getGalleryItemById,
} from "./api/galleryApi";
export type { Gallery, GalleryResponse, SingleGalleryResponse } from "./types";
