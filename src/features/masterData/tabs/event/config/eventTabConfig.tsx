import { ActionGroup } from "@/shared/components";

export const eventCategoryColumns = ({
  handleEdit,
  loadOneItem,
  handleView,
  openDeleteRestoreModal,
  additionalData,
}: any) => [
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
    title: "Action",
    key: "action",
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
