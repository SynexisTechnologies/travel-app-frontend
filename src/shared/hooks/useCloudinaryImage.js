import { useMemo } from "react";
import {
  cld,
  getOptimizedImageUrl,
  getThumbnailUrl,
} from "../config/cloudinaryConfig";


export const useCloudinaryImage = (publicId) => {
  const imageUtils = useMemo(() => {
    if (!publicId || typeof publicId !== "string") {
      return {
        thumbnail: null,
        optimized: null,
        original: null,
        isCloudinary: false,
        getCustomUrl: () => null,
      };
    }

    const isCloudinary = !publicId.startsWith("http");

    if (!isCloudinary) {
      // For regular URLs, return as-is
      return {
        thumbnail: publicId,
        optimized: publicId,
        original: publicId,
        isCloudinary: false,
        getCustomUrl: () => publicId,
      };
    }

    return {
      thumbnail: getThumbnailUrl(publicId),
      optimized: getOptimizedImageUrl(publicId),
      original: getOptimizedImageUrl(publicId, { width: 1200, height: 1200 }),
      isCloudinary: true,
      getCustomUrl: (options = {}) => getOptimizedImageUrl(publicId, options),
    };
  }, [publicId]);

  return imageUtils;
};

export default useCloudinaryImage;
