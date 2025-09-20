import React, { useState } from "react";
import { message, Space, Tag, Tooltip } from "antd";
import { GenericPage, FormModal, CloudinaryImage } from "@/shared/components";
import { useActivityCategories } from "./hooks/useActivityCategories";
import type { Subcategory } from "@/types/common";
import type { ActivityCategoryData } from "./types";

const ActivityTabContent: React.FC = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const hookData = useActivityCategories();
  const [modalOpen, setModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<ActivityCategoryData | null>(
    null
  );

  // Enhanced table columns with image display
  const columns = [
    {
      title: "Category Name",
      dataIndex: "category_name",
      key: "category_name",
      width: 250,
    },
    {
      title: "Subcategories",
      dataIndex: "subcategories",
      key: "subcategories",
      render: (subcategories: Subcategory[]) => {
        if (!subcategories || subcategories.length === 0)
          return "No subcategories";

        return (
          <div>
            <Space size={[8, 8]} wrap>
              {subcategories
                ?.slice(0, 2)
                .map((sub: Subcategory, index: number) => (
                  <div
                    key={`sub-${sub.id || sub.sub_category_name}-${index}`}
                    style={{ display: "flex", alignItems: "center", gap: 8 }}
                  >
                    {sub.image && (
                      <CloudinaryImage
                        publicId={sub.image}
                        width={32}
                        height={32}
                        style={{ borderRadius: 4 }}
                      />
                    )}
                    <Tag color="orange" style={{ margin: 0 }}>
                      {sub.sub_category_name}
                    </Tag>
                  </div>
                ))}
            </Space>
            {subcategories?.length > 2 && (
              <Tooltip
                title={
                  <div>
                    {subcategories
                      .slice(2)
                      .map((sub: Subcategory, index: number) => (
                        <div
                          key={`tooltip-sub-${
                            sub.id || sub.sub_category_name
                          }-${index + 2}`}
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 8,
                            marginBottom: 4,
                          }}
                        >
                          {sub.image && (
                            <CloudinaryImage
                              publicId={sub.image}
                              width={32}
                              height={32}
                              style={{ borderRadius: 4 }}
                            />
                          )}
                          <span>{sub.sub_category_name}</span>
                        </div>
                      ))}
                  </div>
                }
              >
                <Tag
                  color="default"
                  style={{ marginTop: 4, cursor: "pointer" }}
                >
                  +{subcategories.length - 2} more
                </Tag>
              </Tooltip>
            )}
          </div>
        );
      },
    },
  ];

  // Form fields with subcategories support
  const formFields = [
    {
      name: "category_name",
      label: "Category Name",
      type: "input" as const,
      rules: [{ required: true, message: "Please enter category name" }],
    },
    {
      name: "subcategories",
      label: "Activity Subcategories with Images",
      type: "subcategories" as const,
      subcategoryConfig: {
        nameField: "sub_category_name",
        imageField: "image",
        label: "Activity Subcategory",
      },
    },
  ];

  const handleAdd = () => {
    setEditingItem(null);
    setModalOpen(true);
  };

  const handleEdit = (record: ActivityCategoryData) => {
    setEditingItem(record);
    setModalOpen(true);
  };

  const handleDelete = async (record: ActivityCategoryData) => {
    try {
      if (!record.id) {
        messageApi.error("Cannot delete item without ID");
        return;
      }
      await hookData.deleteItem(record.id);
      messageApi.success("Activity category deleted successfully");
    } catch (error) {
      messageApi.error("Failed to delete activity category");
    }
  };

  const handleSubmit = async (values: any) => {
    try {
      if (editingItem) {
        if (!editingItem.id) {
          messageApi.error("Cannot update item without ID");
          return;
        }
        await hookData.updateItem(editingItem.id, values);
        messageApi.success("Activity category updated successfully");
      } else {
        await hookData.addItem(values);
        messageApi.success("Activity category created successfully");
      }
      setModalOpen(false);
    } catch (error) {
      messageApi.error("Failed to save activity category");
    }
  };

  return (
    <>
      {contextHolder}
      <GenericPage
        title="Activity Categories"
        data={hookData.data}
        columns={columns}
        loading={hookData.loading}
        onAdd={handleAdd}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      <FormModal
        title={editingItem ? "Edit Activity Category" : "Add Activity Category"}
        open={modalOpen}
        onCancel={() => setModalOpen(false)}
        onSubmit={handleSubmit}
        fields={formFields}
        initialValues={editingItem}
        width={800}
      />
    </>
  );
};

export default ActivityTabContent;
