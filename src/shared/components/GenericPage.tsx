import React, { useState } from "react";
import { Table, Card, Button, Space, Input } from "antd";
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  EyeOutlined,
} from "@ant-design/icons";
import type { TableProps } from "antd";
import DeleteConfirmationModal from "./DeleteConfirmationModal";

interface GenericPageProps<T = any> {
  title: string;
  data: T[];
  columns: TableProps<T>["columns"];
  loading?: boolean;
  onAdd?: () => void;
  onEdit?: (record: T) => void;
  onDelete?: (record: T) => void;
  onView?: (record: T) => void;
  rowKey?: string;
  showActions?: boolean;
  showSearch?: boolean;
  searchPlaceholder?: string;
  tableProps?: any;
  // Confirmation modal settings
  showDeleteConfirmation?: boolean;
  getItemDisplayName?: (record: T) => string;
  deleteConfirmTitle?: string;
  deleteConfirmDescription?: string;
}

const GenericPage = <T extends Record<string, any>>({
  title,
  data,
  columns,
  loading = false,
  onAdd,
  onEdit,
  onDelete,
  onView,
  rowKey = "id",
  showActions = true,
  showSearch = true,
  searchPlaceholder = "Search...",
  tableProps = {},
  // Confirmation modal props
  showDeleteConfirmation = true,
  getItemDisplayName = (record) =>
    record.name || record.category_name || record.title || "this item",
  deleteConfirmTitle = "Confirm Delete",
  deleteConfirmDescription,
}: GenericPageProps<T>) => {
  const [searchText, setSearchText] = useState("");
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<T | null>(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  // Simple search filter
  const filteredData = data.filter((item) =>
    Object.values(item).some((value) =>
      String(value).toLowerCase().includes(searchText.toLowerCase())
    )
  );

  const handleDeleteClick = (record: T) => {
    if (showDeleteConfirmation) {
      setItemToDelete(record);
      setDeleteModalOpen(true);
    } else {
      onDelete?.(record);
    }
  };

  const handleDeleteConfirm = async () => {
    if (!itemToDelete || !onDelete) return;

    setDeleteLoading(true);
    try {
      await onDelete(itemToDelete);
      setDeleteModalOpen(false);
      setItemToDelete(null);
    } catch (error) {
      console.error("Delete failed:", error);
    } finally {
      setDeleteLoading(false);
    }
  };

  const handleDeleteCancel = () => {
    setDeleteModalOpen(false);
    setItemToDelete(null);
  };

  // Add action column if needed
  const finalColumns =
    showActions && (onEdit || onDelete || onView)
      ? [
          ...(columns || []),
          {
            title: "Actions",
            key: "actions",
            width: 150,
            render: (_: any, record: T) => (
              <Space>
                {onView && (
                  <Button
                    type="link"
                    icon={<EyeOutlined />}
                    onClick={() => onView(record)}
                    size="small"
                  />
                )}
                {onEdit && (
                  <Button
                    type="link"
                    icon={<EditOutlined />}
                    onClick={() => onEdit(record)}
                    size="small"
                  />
                )}
                {onDelete && (
                  <Button
                    type="link"
                    danger
                    icon={<DeleteOutlined />}
                    onClick={() => handleDeleteClick(record)}
                    size="small"
                  />
                )}
              </Space>
            ),
          },
        ]
      : columns || [];

  return (
    <>
      <Card
        title={title}
        extra={
          <Space>
            {showSearch && (
              <Input.Search
                placeholder={searchPlaceholder}
                allowClear
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                style={{ width: 250 }}
              />
            )}
            {onAdd && (
              <Button type="primary" icon={<PlusOutlined />} onClick={onAdd}>
                Add New
              </Button>
            )}
          </Space>
        }
      >
        <Table
          rowKey={rowKey}
          columns={finalColumns}
          dataSource={filteredData}
          loading={loading}
          pagination={{
            showSizeChanger: true,
            showQuickJumper: true,
            showTotal: (total, range) =>
              `${range[0]}-${range[1]} of ${total} items`,
          }}
          scroll={{ x: "max-content" }}
          {...tableProps}
        />
      </Card>

      <DeleteConfirmationModal
        open={deleteModalOpen}
        onConfirm={handleDeleteConfirm}
        onCancel={handleDeleteCancel}
        title={deleteConfirmTitle}
        itemName={itemToDelete ? getItemDisplayName(itemToDelete) : "this item"}
        description={deleteConfirmDescription}
        loading={deleteLoading}
      />
    </>
  );
};

export default GenericPage;
