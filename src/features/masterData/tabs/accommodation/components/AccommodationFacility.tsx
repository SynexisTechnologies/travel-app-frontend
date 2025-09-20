import { Table } from "antd";
import { accommodationFacilityColumns } from "../config/accommodationTabConfig";
import { AccommodationFacilityProps } from "../types/props";

const AccommodationFacility: React.FC<AccommodationFacilityProps> = ({
  facilities,
  loading,
  onEdit,
  onDelete,
}) => {
  return (
    <div style={{ padding: "16px 0" }}>
      <Table
        dataSource={facilities}
        columns={accommodationFacilityColumns({
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
        locale={{ emptyText: "No facilities found" }}
      />
    </div>
  );
};

export default AccommodationFacility;
