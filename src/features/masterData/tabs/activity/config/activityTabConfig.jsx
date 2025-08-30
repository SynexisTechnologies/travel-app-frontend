import { Space, Button, Tag, Tooltip } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { CloudinaryImage } from "@/shared/components";

export const activityCategoryColumns = ({ handleEdit, handleDelete }) => [
  {
    title: "ID",
    dataIndex: "id",
    key: "id",
    width: 70,
  },
  {
    title: "Category Name",
    dataIndex: "category_name",
    key: "category_name",
  },
  {
    title: "Sub Categories",
    dataIndex: "sub_categories",
    key: "sub_categories",
    render: (subcategories) => {
      if (!subcategories || !Array.isArray(subcategories)) return "-";

      return (
        <div>
          <Space size={[8, 8]} wrap>
            {subcategories.slice(0, 2).map((sub, index) => (
              <div
                key={index}
                style={{ display: "flex", alignItems: "center", gap: 8 }}
              >
                {sub.image && (
                  <CloudinaryImage
                    publicId={sub.image}
                    width={24}
                    height={24}
                    style={{ borderRadius: 4 }}
                  />
                )}
                <Tag color="blue" style={{ margin: 0 }}>
                  {sub.sub_category_name}
                </Tag>
              </div>
            ))}
          </Space>
          {subcategories.length > 2 && (
            <Tooltip
              title={
                <div>
                  {subcategories.slice(2).map((sub, index) => (
                    <div
                      key={index}
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
                          width={20}
                          height={20}
                          style={{ borderRadius: 4 }}
                        />
                      )}
                      <span>{sub.sub_category_name}</span>
                    </div>
                  ))}
                </div>
              }
            >
              <Tag color="default" style={{ marginTop: 4, cursor: "pointer" }}>
                +{subcategories.length - 2} more
              </Tag>
            </Tooltip>
          )}
        </div>
      );
    },
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
