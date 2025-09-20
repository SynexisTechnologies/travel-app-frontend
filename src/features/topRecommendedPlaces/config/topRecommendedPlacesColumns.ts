import React from "react";
import { TableProps, Tag } from "antd";
import { TopRecommendedPlace } from "../types";

export const topRecommendedPlacesColumns: TableProps<TopRecommendedPlace>["columns"] =
  [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      sorter: true,
      ellipsis: true,
    },
    {
      title: "City",
      dataIndex: "city",
      key: "city",
      sorter: true,
      render: (city: string) =>
        city ? React.createElement(Tag, { color: "geekblue" }, city) : "-",
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
      sorter: true,
      render: (category: string) =>
        category
          ? React.createElement(Tag, { color: "volcano" }, category)
          : "-",
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
      title: "Photos",
      dataIndex: "photos",
      key: "photos",
      render: (photos: string | string[]) => {
        if (!photos) return "-";
        const photoArray = Array.isArray(photos) ? photos : [photos];
        return React.createElement(
          Tag,
          { color: "gold" },
          `${photoArray.length} photo(s)`
        );
      },
    },
  ];
