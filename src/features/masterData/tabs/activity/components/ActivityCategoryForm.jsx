import { useState, useEffect } from "react";
import {
  Modal,
  Button,
  Form,
  Input,
  Space,
  Row,
  Col,
  Typography,
  Divider,
  message,
  theme,
} from "antd";
import { PlusOutlined, DeleteOutlined, SaveOutlined } from "@ant-design/icons";
import { ImageUpload } from "@/shared/components";

const { Title } = Typography;

const ActivityCategoryForm = ({
  open,
  handleClose,
  selectedItem,
  isEditing,
  addCategory,
  updateCategory,
}) => {
  const [form] = Form.useForm();
  const [messageApi, contextHolder] = message.useMessage();
  const [submitting, setSubmitting] = useState(false);
  const [subcategories, setSubcategories] = useState([
    { sub_category_name: "", image: "" },
  ]);

  useEffect(() => {
    if (selectedItem && open) {
      form.setFieldsValue({
        category_name: selectedItem.category_name || "",
      });
      setSubcategories(
        selectedItem.sub_categories?.length > 0
          ? selectedItem.sub_categories.map((sub) => ({
              sub_category_name: sub.sub_category_name || "",
              image: sub.image || "",
            }))
          : [{ sub_category_name: "", image: "" }]
      );
    } else if (open) {
      form.resetFields();
      setSubcategories([{ sub_category_name: "", image: "" }]);
    }
  }, [selectedItem, open, form]);

  const addSubcategory = () => {
    setSubcategories([...subcategories, { sub_category_name: "", image: "" }]);
  };

  const removeSubcategory = (index) => {
    if (subcategories.length > 1) {
      const newSubcategories = subcategories.filter((_, i) => i !== index);
      setSubcategories(newSubcategories);
    }
  };

  const updateSubcategory = (index, field, value) => {
    const newSubcategories = [...subcategories];
    newSubcategories[index][field] = value;
    setSubcategories(newSubcategories);
  };

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();

      // Enhanced validation for subcategories
      const validSubcategories = subcategories.filter(
        (sub) => sub.sub_category_name.trim() !== ""
      );

      if (validSubcategories.length === 0) {
        messageApi.error("Please add at least one subcategory with a name.");
        return;
      }

      // Check if all valid subcategories have images
      const subcategoriesWithoutImages = validSubcategories.filter(
        (sub) => !sub.image || sub.image.trim() === ""
      );

      if (subcategoriesWithoutImages.length > 0) {
        messageApi.error("Please upload images for all subcategories.");
        return;
      }

      setSubmitting(true);

      const categoryForm = {
        category_name: values.category_name,
        sub_categories: validSubcategories, // Only send subcategories with names and images
        extra_int1: 0,
        extra_int2: 0,
        extra_text1: "",
        extra_text2: "",
      };

      if (selectedItem) {
        await updateCategory(selectedItem.id, categoryForm);
        messageApi.success("Activity category updated successfully!");
      } else {
        await addCategory(categoryForm);
        messageApi.success("Activity category created successfully!");
      }
      handleClose();
    } catch (error) {
      messageApi.error("Operation failed. Please try again.");
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
          {isEditing ? "Edit" : "Add"} Activity Category
        </div>
      }
      open={open}
      onCancel={handleClose}
      width={600}
      footer={null}
      destroyOnHidden
    >
      {contextHolder}
      <Form form={form} layout="vertical">
        <Form.Item
          label="Category Name"
          name="category_name"
          rules={[{ required: true, message: "Please enter category name" }]}
        >
          <Input placeholder="Enter category name" size="large" />
        </Form.Item>

        <div style={{ marginBottom: 16 }}>
          <Title
            level={5}
            style={{ margin: 0, marginBottom: 8, color: "#1890ff" }}
          >
            🖼️ Subcategories
          </Title>
          <Divider style={{ margin: "8px 0 16px 0" }} />

          {subcategories.map((sub, index) => (
            <div
              key={index}
              style={{
                marginBottom: 24,
                padding: 16,
                borderRadius: 8,
                border: `1px solid ${theme.useToken().token.colorBorder}`,
                backgroundColor: theme.useToken().token.colorBgContainer,
              }}
            >
              <Row gutter={24} align="middle">
                <Col span={8}>
                  <div style={{ marginBottom: 8 }}>
                    <label
                      style={{ fontSize: 12, color: "#666", fontWeight: 500 }}
                    >
                      Subcategory Name *
                    </label>
                  </div>
                  <Input
                    placeholder="Enter subcategory name"
                    value={sub.sub_category_name}
                    onChange={(e) =>
                      updateSubcategory(
                        index,
                        "sub_category_name",
                        e.target.value
                      )
                    }
                    status={!sub.sub_category_name.trim() ? "error" : ""}
                  />
                </Col>
                <Col span={12}>
                  <div style={{ marginBottom: 8 }}>
                    <label
                      style={{ fontSize: 12, color: "#666", fontWeight: 500 }}
                    >
                      Image *
                    </label>
                  </div>
                  <ImageUpload
                    value={sub.image}
                    onChange={(url) => updateSubcategory(index, "image", url)}
                    placeholder="Upload Image"
                    disabled={!sub.sub_category_name.trim()}
                    required={true}
                    size="default"
                  />
                </Col>
                <Col span={4}>
                  <div style={{ marginBottom: 8 }}>
                    <label style={{ fontSize: 12, color: "transparent" }}>
                      Action
                    </label>
                  </div>
                  <Button
                    danger
                    icon={<DeleteOutlined />}
                    onClick={() => removeSubcategory(index)}
                    disabled={subcategories.length === 1}
                    style={{ width: "100%" }}
                  />
                </Col>
              </Row>
            </div>
          ))}

          <Button
            type="dashed"
            icon={<PlusOutlined />}
            onClick={addSubcategory}
            style={{ width: "100%" }}
          >
            Add Subcategory
          </Button>
        </div>

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

export default ActivityCategoryForm;
