import { Table } from "antd";
import { accommodationCategoryColumns } from "../config/accommodationTabConfig";

const AccommodationCategory = ({ categories, loading, onEdit, onDelete }) => {
  return (
    <div style={{ padding: "16px 0" }}>
      <Table
        dataSource={categories}
        columns={accommodationCategoryColumns({ onEdit, onDelete })}
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
