import React from "react";
import { Modal, Typography, Space, Button } from "antd";
import { ExclamationCircleOutlined, DeleteOutlined } from "@ant-design/icons";

const { Text, Title } = Typography;

interface DeleteConfirmationModalProps {
  open: boolean;
  onConfirm: () => void;
  onCancel: () => void;
  title?: string;
  itemName?: string;
  description?: string;
  loading?: boolean;
  danger?: boolean;
}

const DeleteConfirmationModal: React.FC<DeleteConfirmationModalProps> = ({
  open,
  onConfirm,
  onCancel,
  title = "Confirm Delete",
  itemName = "this item",
  description,
  loading = false,
  danger = true,
}) => {
  return (
    <Modal
      title={
        <Space>
          <DeleteOutlined style={{ color: "#ff4d4f" }} />
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
            color: "#ff4d4f",
            marginBottom: 16,
          }}
        />

        <Title
          level={4}
          style={{ marginBottom: 8, color: danger ? "#ff4d4f" : undefined }}
        >
          Delete {itemName}?
        </Title>

        <Text type="secondary" style={{ display: "block", marginBottom: 24 }}>
          {description ||
            `Are you sure you want to delete ${itemName}? This action cannot be undone.`}
        </Text>

        <Space size="middle">
          <Button onClick={onCancel} disabled={loading}>
            Cancel
          </Button>
          <Button
            type="primary"
            danger={danger}
            onClick={onConfirm}
            loading={loading}
          >
            Delete
          </Button>
        </Space>
      </div>
    </Modal>
  );
};

export default DeleteConfirmationModal;
