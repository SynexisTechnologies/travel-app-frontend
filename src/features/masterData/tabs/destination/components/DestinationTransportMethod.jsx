import { Table } from "antd";
import { destinationTransportMethodColumns } from "../config/destinationTabConfig";

const DestinationTransportMethod = ({
  transportMethods,
  loading,
  onEdit,
  onDelete,
}) => {
  const handleEdit = (id) => {
    onEdit(id);
  };

  const handleDelete = (item) => {
    onDelete(item);
  };

  return (
    <div style={{ padding: "16px 0" }}>
      <Table
        dataSource={transportMethods}
        columns={destinationTransportMethodColumns({
          handleEdit,
          handleDelete,
        })}
        loading={loading}
        bordered
        size="middle"
        rowKey={(record) => record.id || record.method_name || Math.random()}
        pagination={{
          pageSize: 10,
          showSizeChanger: true,
          showQuickJumper: true,
          showTotal: (total, range) =>
            `${range[0]}-${range[1]} of ${total} items`,
        }}
        locale={{ emptyText: "No transport methods found" }}
      />
    </div>
  );
};

export default DestinationTransportMethod;
