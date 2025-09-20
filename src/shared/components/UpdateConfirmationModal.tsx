import React from "react";
import { Modal, Typography, Space, Button } from "antd";
import { ExclamationCircleOutlined, EditOutlined } from "@ant-design/icons";

const { Text, Title } = Typography;

interface UpdateConfirmationModalProps {
  open: boolean;
  onConfirm: () => void;
  onCancel: () => void;
  title?: string;
  itemName?: string;
  description?: string;
  loading?: boolean;
}

const UpdateConfirmationModal: React.FC<UpdateConfirmationModalProps> = ({
  open,
  onConfirm,
  onCancel,
  title = "Confirm Update",
  itemName = "this item",
  description,
  loading = false,
}) => {
  return (
    <Modal
      title={
        <Space>
          <EditOutlined style={{ color: "#1890ff" }} />
          {title}
        </Space>
      }
      open={open}
      onCancel={onCancel}
      footer={null}
      width={400}
      centered
    >
      <div style={{ textAlign: "center", padding: "20px 0" }}>
        <ExclamationCircleOutlined
          style={{
            fontSize: 48,
            color: "#1890ff",
            marginBottom: 16,
          }}
        />

        <Title level={4} style={{ marginBottom: 8 }}>
          Update {itemName}?
        </Title>

        <Text type="secondary" style={{ display: "block", marginBottom: 24 }}>
          {description ||
            `Are you sure you want to update ${itemName}? This action will modify the existing data.`}
        </Text>

        <Space size="middle">
          <Button onClick={onCancel} disabled={loading}>
            Cancel
          </Button>
          <Button
            type="primary"
            onClick={onConfirm}
            loading={loading}
            style={{
              background: "linear-gradient(135deg, #1890ff 0%, #096dd9 100%)",
              border: "none",
            }}
          >
            Update
          </Button>
        </Space>
      </div>
    </Modal>
  );
};

export default UpdateConfirmationModal;
