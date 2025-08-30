import { useState, useEffect } from "react";
import { Modal, Button, Form, Input, Row, Col } from "antd";
import { SaveOutlined } from "@ant-design/icons";

const AccommodationFacilityForm = ({
  open,
  handleClose,
  selectedItem,
  isEditing,
  addFacility,
  updateFacility,
}) => {
  const [form] = Form.useForm();
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (selectedItem && open) {
      form.setFieldsValue({
        facility: selectedItem.facility || "",
      });
    } else if (open) {
      form.resetFields();
    }
  }, [selectedItem, open, form]);

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      setSubmitting(true);

      const facilityForm = {
        facility: values.facility,
        extra_int1: 0,
        extra_int2: 0,
        extra_text1: "",
        extra_text2: "",
      };

      if (selectedItem) {
        await updateFacility(selectedItem.id, facilityForm);
      } else {
        await addFacility(facilityForm);
      }
      handleClose();
    } catch (error) {
      console.error("Operation failed:", error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Modal
      title={
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          {submitting && <span>⏳</span>}
          {isEditing ? "Edit" : "Add"} Accommodation Facility
        </div>
      }
      open={open}
      onCancel={handleClose}
      width={500}
      footer={null}
      destroyOnHidden
    >
      <Form form={form} layout="vertical">
        <Form.Item
          label="Facility Name"
          name="facility"
          rules={[{ required: true, message: "Please enter facility name" }]}
        >
          <Input placeholder="Enter facility name" size="large" />
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

export default AccommodationFacilityForm;
