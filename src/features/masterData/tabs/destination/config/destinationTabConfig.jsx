import { Space, Button, Tag, Tooltip } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { CloudinaryImage } from "@/shared/components";

export const destinationCategoryColumns = ({ handleEdit, handleDelete }) => [
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
    render: (subcategories) => (
      <div>
        <Space size={[8, 8]} wrap>
          {subcategories?.slice(0, 2).map((sub, index) => (
            <div
              key={`sub-${sub.id || sub.sub_category_name}-${index}`}
              style={{ display: "flex", alignItems: "center", gap: 8 }}
            >
              {sub.image && (
                <CloudinaryImage
                  publicId={sub.image}
                  width={48}
                  height={48}
                  style={{ borderRadius: 4 }}
                />
              )}
              <Tag color="blue" style={{ margin: 0 }}>
                {sub.sub_category_name}
              </Tag>
            </div>
          ))}
        </Space>
        {subcategories?.length > 2 && (
          <Tooltip
            title={
              <div>
                {subcategories.slice(2).map((sub, index) => (
                  <div
                    key={`tooltip-sub-${sub.id || sub.sub_category_name}-${
                      index + 2
                    }`}
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
                        width={48}
                        height={48}
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
    ),
  },
  {
    title: "Actions",
    key: "actions",
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

export const destinationTravelTypeColumns = ({ handleEdit, handleDelete }) => [
  {
    title: "Travel Type Name",
    dataIndex: "type_name",
    key: "type_name",
    width: 200,
  },
  {
    title: "Description",
    dataIndex: "description",
    key: "description",
  },
  {
    title: "Actions",
    key: "actions",
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

export const destinationTransportMethodColumns = ({
  handleEdit,
  handleDelete,
}) => [
  {
    title: "Transport Method Name",
    dataIndex: "method_name",
    key: "method_name",
    width: 200,
  },
  {
    title: "Description",
    dataIndex: "description",
    key: "description",
  },
  {
    title: "Actions",
    key: "actions",
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
