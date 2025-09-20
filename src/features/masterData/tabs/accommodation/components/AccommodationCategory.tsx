import { Table } from "antd";
import { accommodationCategoryColumns } from "../config/accommodationTabConfig";
import { AccommodationCategoryProps } from "../types/props";

const AccommodationCategory: React.FC<AccommodationCategoryProps> = ({
  categories,
  loading,
  onEdit,
  onDelete,
}) => {
  return (
    <div style={{ padding: "16px 0" }}>
      <Table
        dataSource={categories}
        columns={accommodationCategoryColumns({
          handleEdit: onEdit,
          loadOneItem: () => Promise.resolve({}),
          handleView: () => {},
          openDeleteRestoreModal: onDelete,
        })}
        loading={loading}
        bordered
        size="middle"
        pagination={{
          pageSize: 10,
          showSizeChanger: true,
          showQuickJumper: true,
          showTotal: (total, range) =>
            `${range[0]}-${range[1]} of ${total} items`,
        }}
        locale={{ emptyText: "No categories found" }}
      />
    </div>
  );
};

export default AccommodationCategory;
