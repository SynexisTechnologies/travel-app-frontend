import { useState, useEffect } from "react";
import { Modal, Button, Form, Input, Row, Col } from "antd";
import { SaveOutlined } from "@ant-design/icons";

const AccommodationCategoryForm = ({
  open,
  handleClose,
  selectedItem,
  isEditing,
  addCategory,
  updateCategory,
}) => {
  const [form] = Form.useForm();
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (selectedItem && open) {
      form.setFieldsValue({
        main_category: selectedItem.main_category || "",
      });
    } else if (open) {
      form.resetFields();
    }
  }, [selectedItem, open, form]);

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      setSubmitting(true);

      const categoryForm = {
        main_category: values.main_category,
        extra_int1: 0,
        extra_int2: 0,
        extra_text1: "",
        extra_text2: "",
      };

      if (selectedItem) {
        await updateCategory(selectedItem.id, categoryForm);
      } else {
        await addCategory(categoryForm);
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
          {isEditing ? "Edit" : "Add"} Accommodation Category
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
          label="Category Name"
          name="main_category"
          rules={[{ required: true, message: "Please enter category name" }]}
        >
          <Input placeholder="Enter category name" size="large" />
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

export default AccommodationCategoryForm;
