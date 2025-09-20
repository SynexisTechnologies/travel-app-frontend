import { Space, Tag, Tooltip } from "antd";
import { CloudinaryImage, ActionGroup } from "@/shared/components";
import type { Subcategory } from "@/types/common";

export const destinationCategoryColumns = ({
  handleEdit,
  loadOneItem,
  handleView,
  openDeleteRestoreModal,
  additionalData,
}: any) => [
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
    render: (subcategories: Subcategory[]) => (
      <div>
        <Space size={[8, 8]} wrap>
          {subcategories?.slice(0, 2).map((sub: Subcategory, index: number) => (
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
                {subcategories
                  .slice(2)
                  .map((sub: Subcategory, index: number) => (
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
    render: (_: any, record: any) => (
      <ActionGroup
        onEdit={() => handleEdit(record)}
        onDelete={() => openDeleteRestoreModal(record, "delete")}
        showEdit={true}
        showDelete={true}
        showView={false}
      />
    ),
  },
];

export const destinationTravelTypeColumns = ({
  handleEdit,
  loadOneItem,
  handleView,
  openDeleteRestoreModal,
  additionalData,
}: any) => [
  {
    title: "Travel Type Name",
    dataIndex: "travel_type",
    key: "travel_type",
    width: 200,
  },
  {
    title: "Actions",
    key: "actions",
    width: 150,
    render: (_: any, record: any) => (
      <ActionGroup
        onEdit={() => handleEdit(record)}
        onDelete={() => openDeleteRestoreModal(record, "delete")}
        showEdit={true}
        showDelete={true}
        showView={false}
      />
    ),
  },
];

export const destinationTransportMethodColumns = ({
  handleEdit,
  loadOneItem,
  handleView,
  openDeleteRestoreModal,
  additionalData,
}: any) => [
  {
    title: "Transport Method Name",
    dataIndex: "transport_method",
    key: "transport_method",
    width: 200,
  },
  {
    title: "Actions",
    key: "actions",
    width: 150,
    render: (_: any, record: any) => (
      <ActionGroup
        onEdit={() => handleEdit(record)}
        onDelete={() => openDeleteRestoreModal(record, "delete")}
        showEdit={true}
        showDelete={true}
        showView={false}
      />
    ),
  },
];
