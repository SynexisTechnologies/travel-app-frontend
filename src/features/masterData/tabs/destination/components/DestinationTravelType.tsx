import { Table } from "antd";
import { destinationTravelTypeColumns } from "../config/destinationTabConfig";
import { DestinationTravelTypeData } from "../types";

interface DestinationTravelTypeProps {
  travelTypes: DestinationTravelTypeData[];
  loading: boolean;
  onEdit: (id: string | number) => void;
  onDelete: (item: any) => void;
}

const DestinationTravelType: React.FC<DestinationTravelTypeProps> = ({
  travelTypes,
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
        dataSource={travelTypes}
        columns={destinationTravelTypeColumns({ handleEdit, handleDelete })}
        loading={loading}
        bordered
        size="middle"
        rowKey={(record: any) =>
          record.id || record.travel_type || Math.random()
        }
        pagination={{
          pageSize: 10,
          showSizeChanger: true,
          showQuickJumper: true,
          showTotal: (total: number, range: [number, number]) =>
            `${range[0]}-${range[1]} of ${total} items`,
        }}
        locale={{ emptyText: "No travel types found" }}
      />
    </div>
  );
};

export default DestinationTravelType;
