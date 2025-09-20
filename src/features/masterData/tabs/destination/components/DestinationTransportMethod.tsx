import { Table } from "antd";
import { destinationTransportMethodColumns } from "../config/destinationTabConfig";
import { DestinationTransportMethodData } from "../types";

interface DestinationTransportMethodProps {
  transportMethods: DestinationTransportMethodData[];
  loading: boolean;
  onEdit: (id: string | number) => void;
  onDelete: (item: any) => void;
}

const DestinationTransportMethod: React.FC<DestinationTransportMethodProps> = ({
  transportMethods,
  loading,
  onEdit,
  onDelete,
}) => {
  const handleEdit = (id: string | number) => {
    onEdit(id);
  };

  const handleDelete = (item: any) => {
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
        rowKey={(record: any) =>
          record.id || record.transport_method || Math.random()
        }
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
