import React from "react";
import { TableProps, Tag } from "antd";
import { News } from "../types";

export const newsColumns: TableProps<News>["columns"] = [
  {
    title: "Title",
    dataIndex: "title",
    key: "title",
    sorter: true,
    ellipsis: true,
  },
  {
    title: "Category",
    dataIndex: "category",
    key: "category",
    sorter: true,
    render: (category: string) =>
      category ? React.createElement(Tag, { color: "blue" }, category) : "-",
  },
  {
    title: "Description",
    dataIndex: "description",
    key: "description",
    ellipsis: true,
    render: (description: string) =>
      description && description.length > 100
        ? `${description.substring(0, 100)}...`
        : description || "-",
  },
  {
    title: "Date",
    dataIndex: "datetime",
    key: "datetime",
    sorter: true,
    render: (date: string) =>
      date ? new Date(date).toLocaleDateString() : "-",
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
        { color: "green" },
        `${photoArray.length} photo(s)`
      );
    },
  },
];
