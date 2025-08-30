import { useState, useEffect } from "react";
import { Modal, Button, Form, Input, Row, Col } from "antd";
import { SaveOutlined } from "@ant-design/icons";

const { TextArea } = Input;

const DestinationTravelTypeForm = ({
  open,
  handleClose,
  selectedItem,
  isEditing,
  addTravelType,
  updateTravelType,
}) => {
  const [form] = Form.useForm();
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (selectedItem && open) {
      form.setFieldsValue({
        type_name: selectedItem.type_name,
        description: selectedItem.description,
      });
    } else if (open) {
      form.resetFields();
    }
  }, [selectedItem, open, form]);

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      setSubmitting(true);

      if (selectedItem) {
        await updateTravelType(selectedItem.id, values);
      } else {
        await addTravelType(values);
      }
      handleClose();
    } catch (error) {
      // Error handling is done in the hook
      console.error("Form validation failed:", error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Modal
      title={
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          {submitting && <span>⏳</span>}
          {isEditing ? "Edit" : "Add"} Travel Type
        </div>
      }
      open={open}
      onCancel={handleClose}
      width={600}
      footer={null}
      destroyOnHidden
    >
      <Form form={form} layout="vertical" onFinish={handleSubmit}>
        <Form.Item
          label="Travel Type Name"
          name="type_name"
          rules={[{ required: true, message: "Please enter travel type name" }]}
        >
          <Input
            placeholder="Enter travel type name"
            prefix="✈️"
            size="large"
          />
        </Form.Item>

        <Form.Item label="Description" name="description">
          <TextArea
            placeholder="Enter travel type description"
            rows={3}
            size="large"
          />
        </Form.Item>

        <Row justify="end" gutter={16}>
          <Col>
            <Button onClick={handleClose} disabled={submitting}>
              Cancel
            </Button>
          </Col>
          <Col>
            <Button
              type="primary"
              icon={<SaveOutlined />}
              loading={submitting}
              onClick={handleSubmit}
              style={{
                background: "linear-gradient(135deg, #00A5CF 0%, #00315C 100%)",
                border: "none",
              }}
            >
              {selectedItem ? "Update" : "Create"}
            </Button>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};

export default DestinationTravelTypeForm;
