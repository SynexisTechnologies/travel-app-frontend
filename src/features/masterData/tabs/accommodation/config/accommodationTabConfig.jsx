import { Space, Button } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";

export const accommodationCategoryColumns = ({ handleEdit, handleDelete }) => [
  {
    title: "ID",
    dataIndex: "id",
    key: "id",
    width: 70,
  },
  {
    title: "Category Name",
    dataIndex: "main_category",
    key: "main_category",
  },
  {
    title: "Created At",
    dataIndex: "created_at",
    key: "created_at",
    render: (date) => {
      if (!date) return "-";
      return new Date(date).toLocaleDateString();
    },
  },
  {
    title: "Action",
    key: "action",
    width: 150,
    render: (_, record) => (
      <Space size="middle">
        <Button
          type="text"
          icon={<EditOutlined />}
          onClick={() => handleEdit(record.id)}
          style={{ color: "#1890ff" }}
        />
        <Button
          type="text"
          icon={<DeleteOutlined />}
          onClick={() => handleDelete(record)}
          danger
        />
      </Space>
    ),
  },
];

export const accommodationFacilityColumns = ({ handleEdit, handleDelete }) => [
  {
    title: "ID",
    dataIndex: "id",
    key: "id",
    width: 70,
  },
  {
    title: "Facility Name",
    dataIndex: "facility",
    key: "facility",
  },
  {
    title: "Created At",
    dataIndex: "created_at",
    key: "created_at",
    render: (date) => {
      if (!date) return "-";
      return new Date(date).toLocaleDateString();
    },
  },
  {
    title: "Action",
    key: "action",
    width: 150,
    render: (_, record) => (
      <Space size="middle">
        <Button
          type="text"
          icon={<EditOutlined />}
          onClick={() => handleEdit(record.id)}
          style={{ color: "#1890ff" }}
        />
        <Button
          type="text"
          icon={<DeleteOutlined />}
          onClick={() => handleDelete(record)}
          danger
        />
      </Space>
    ),
  },
];
