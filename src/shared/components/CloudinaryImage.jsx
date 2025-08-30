import React from "react";
import { AdvancedImage } from "@cloudinary/react";
import { cld, getOptimizedImageUrl } from "../config/cloudinaryConfig";
import { auto } from "@cloudinary/url-gen/actions/resize";
import { autoGravity } from "@cloudinary/url-gen/qualifiers/gravity";

const CloudinaryImage = ({
  publicId,
  width = 150,
  height = 150,
  style = {},
  fallbackSrc = null,
  ...props
}) => {
  // If no publicId provided, show fallback or nothing
  if (!publicId) {
    if (fallbackSrc) {
      return (
        <img
          src={fallbackSrc}
          alt="Fallback"
          style={{
            width,
            height,
            objectFit: "cover",
            borderRadius: 4,
            ...style,
          }}
          {...props}
        />
      );
    }
    return null;
  }

  // Check if it's a Cloudinary public ID or a regular URL
  const isCloudinaryPublicId =
    typeof publicId === "string" && !publicId.startsWith("http");

  if (isCloudinaryPublicId) {
    // Use Cloudinary optimized image
    const img = cld
      .image(publicId)
      .format("auto")
      .quality("auto")
      .resize(auto().gravity(autoGravity()).width(width).height(height));

    return (
      <AdvancedImage
        cldImg={img}
        style={{
          width,
          height,
          objectFit: "cover",
          borderRadius: 4,
          ...style,
        }}
        {...props}
      />
    );
  } else {
    // Fallback for regular URLs
    return (
      <img
        src={publicId}
        alt="Image"
        style={{
          width,
          height,
          objectFit: "cover",
          borderRadius: 4,
          ...style,
        }}
        {...props}
      />
    );
  }
};

export default CloudinaryImage;
