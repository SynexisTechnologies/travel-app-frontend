import React from "react";
import { Button, Space, Popconfirm } from "antd";
import { EditOutlined, DeleteOutlined, EyeOutlined } from "@ant-design/icons";

interface ActionGroupProps {
  onEdit?: () => void;
  onDelete?: () => void;
  onView?: () => void;
  showEdit?: boolean;
  showDelete?: boolean;
  showView?: boolean;
  loading?: boolean;
}

export const ActionGroup: React.FC<ActionGroupProps> = ({
  onEdit,
  onDelete,
  onView,
  showEdit = true,
  showDelete = true,
  showView = false,
  loading = false,
}) => {
  return (
    <Space size="small">
      {showView && (
        <Button
          type="text"
          size="small"
          icon={<EyeOutlined />}
          onClick={onView}
          disabled={loading}
          title="View"
        />
      )}
      {showEdit && (
        <Button
          type="text"
          size="small"
          icon={<EditOutlined />}
          onClick={onEdit}
          disabled={loading}
          title="Edit"
        />
      )}
      {showDelete && (
        <Popconfirm
          title="Are you sure you want to delete this item?"
          onConfirm={onDelete}
          okText="Yes"
          cancelText="No"
          disabled={loading}
        >
          <Button
            type="text"
            size="small"
            icon={<DeleteOutlined />}
            danger
            disabled={loading}
            title="Delete"
          />
        </Popconfirm>
      )}
    </Space>
  );
};
