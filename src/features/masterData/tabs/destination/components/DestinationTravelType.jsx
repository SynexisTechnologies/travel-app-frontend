import { Table } from "antd";
import { destinationTravelTypeColumns } from "../config/destinationTabConfig";

const DestinationTravelType = ({ travelTypes, loading, onEdit, onDelete }) => {
  const handleEdit = (id) => {
    onEdit(id);
  };

  const handleDelete = (item) => {
    onDelete(item);
  };

  return (
    <div style={{ padding: "16px 0" }}>
      <Table
        dataSource={travelTypes}
        columns={destinationTravelTypeColumns({ handleEdit, handleDelete })}
        loading={loading}
        bordered
        size="middle"
        rowKey={(record) => record.id || record.type_name || Math.random()}
        pagination={{
          pageSize: 10,
          showSizeChanger: true,
          showQuickJumper: true,
          showTotal: (total, range) =>
            `${range[0]}-${range[1]} of ${total} items`,
        }}
        locale={{ emptyText: "No travel types found" }}
      />
    </div>
  );
};

export default DestinationTravelType;
