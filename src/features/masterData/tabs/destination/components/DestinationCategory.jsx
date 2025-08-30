import { Table } from "antd";
import { destinationCategoryColumns } from "../config/destinationTabConfig";

const DestinationCategory = ({ categories, loading, onEdit, onDelete }) => {
  const handleEdit = (id) => {
    onEdit(id);
  };

  const handleDelete = (item) => {
    onDelete(item);
  };

  return (
    <div style={{ padding: "16px 0" }}>
      <Table
        dataSource={categories}
        columns={destinationCategoryColumns({ handleEdit, handleDelete })}
        loading={loading}
        bordered
        size="middle"
        rowKey={(record) => record.id || record.category_name || Math.random()}
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

export default DestinationCategory;
