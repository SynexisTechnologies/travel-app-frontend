import React from "react";
import { TableProps, Tag } from "antd";
import { Gallery } from "../types";

export const galleryColumns: TableProps<Gallery>["columns"] = [
  {
    title: "Description",
    dataIndex: "description",
    key: "description",
    ellipsis: true,
    render: (description: string) =>
      description && description.length > 150
        ? `${description.substring(0, 150)}...`
        : description || "-",
  },
  {
    title: "Photos",
    dataIndex: "photos",
    key: "photos",
    render: (photos: string | string[]) => {
      if (!photos) return "-";
      const photoArray = Array.isArray(photos) ? photos : [photos];
      return React.createElement(
        Tag,
        { color: "cyan" },
        `${photoArray.length} photo(s)`
      );
    },
  },
];
