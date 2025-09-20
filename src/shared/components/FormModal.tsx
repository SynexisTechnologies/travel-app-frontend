import React, { useState } from "react";
import {
  Modal,
  Form,
  Input,
  Select,
  DatePicker,
  Switch,
  Button,
  Space,
  Card,
  Row,
  Col,
  Divider,
  Typography,
  message,
} from "antd";
import { PlusOutlined, DeleteOutlined } from "@ant-design/icons";
import {
  SimpleFileUpload,
  CloudinaryImage,
  UpdateConfirmationModal,
} from "@/shared/components";
import type { FormProps } from "antd";

const { Title } = Typography;

interface SubcategoryField {
  nameField: string;
  imageField: string;
  label?: string;
}

export interface FormField {
  name: string;
  label: string;
  type:
    | "input"
    | "textarea"
    | "select"
    | "date"
    | "switch"
    | "password"
    | "upload"
    | "subcategories"
    | "custom";
  rules?: any[];
  options?: { label: string; value: any }[] | any[];
  optionConfig?: {
    value: string;
    label: string | ((item: any) => string);
  };
  placeholder?: string;
  rows?: number;
  component?: React.ReactNode;
  valuePropName?: string;
  col?: number;
  subcategoryConfig?: SubcategoryField;
}

interface FormModalProps {
  title: string;
  open: boolean;
  onCancel: () => void;
  onSubmit: (values: any) => Promise<void> | void;
  fields: FormField[];
  initialValues?: any;
  loading?: boolean;
  width?: number;
  // Update confirmation settings
  showUpdateConfirmation?: boolean;
  updateConfirmTitle?: string;
  updateConfirmDescription?: string;
  getItemDisplayName?: () => string;
}

const FormModal: React.FC<FormModalProps> = ({
  title,
  open,
  onCancel,
  onSubmit,
  fields,
  initialValues,
  loading,
  width = 600,
  // Update confirmation props
  showUpdateConfirmation = false,
  updateConfirmTitle = "Confirm Update",
  updateConfirmDescription,
  getItemDisplayName = () => "this item",
}) => {
  const [messageApi, contextHolder] = message.useMessage();
  const [form] = Form.useForm();
  const [subcategories, setSubcategories] = useState<Record<string, any[]>>({});
  const [updateModalOpen, setUpdateModalOpen] = useState(false);
  const [pendingValues, setPendingValues] = useState<any>(null);
  const [submitLoading, setSubmitLoading] = useState(false);

  // Initialize subcategories when modal opens
  React.useEffect(() => {
    if (open && initialValues) {
      const newSubcategories: Record<string, any[]> = {};
      fields.forEach((field) => {
        if (field.type === "subcategories" && field.subcategoryConfig) {
          const existingSubcats = initialValues[field.name] || [{}];
          newSubcategories[field.name] =
            existingSubcats.length > 0 ? existingSubcats : [{}];
        }
      });
      setSubcategories(newSubcategories);
    } else if (open) {
      // Initialize empty subcategories for new items
      const newSubcategories: Record<string, any[]> = {};
      fields.forEach((field) => {
        if (field.type === "subcategories") {
          newSubcategories[field.name] = [{}];
        }
      });
      setSubcategories(newSubcategories);
    }
  }, [open, initialValues, fields]);

  const addSubcategory = (fieldName: string) => {
    setSubcategories((prev) => ({
      ...prev,
      [fieldName]: [...(prev[fieldName] || []), {}],
    }));
  };

  const removeSubcategory = (fieldName: string, index: number) => {
    setSubcategories((prev) => ({
      ...prev,
      [fieldName]: prev[fieldName]?.filter((_, i) => i !== index) || [],
    }));
  };

  const updateSubcategory = (
    fieldName: string,
    index: number,
    field: string,
    value: any
  ) => {
    setSubcategories((prev) => {
      const newSubcats = [...(prev[fieldName] || [])];
      newSubcats[index] = { ...newSubcats[index], [field]: value };
      return { ...prev, [fieldName]: newSubcats };
    });
  };

  const handleSubmit: FormProps["onFinish"] = async (values) => {
    try {
      // Merge form values with subcategories
      const finalValues = { ...values };

      // Add subcategories to form values
      Object.keys(subcategories).forEach((fieldName) => {
        const subcats = subcategories[fieldName] || [];
        const validSubcats = subcats.filter((sub) => {
          const field = fields.find((f) => f.name === fieldName);
          if (field?.subcategoryConfig) {
            const nameField = field.subcategoryConfig.nameField;
            return sub[nameField] && sub[nameField].trim();
          }
          return false;
        });
        finalValues[fieldName] = validSubcats;
      });

      // Prepare FormData if there are file uploads
      let submitData: any = finalValues;
      const hasFiles = Object.values(subcategories).some((subcats) =>
        subcats.some((sub) => sub.imageFile)
      );

      if (hasFiles) {
        const formData = new FormData();

        // Add regular form fields
        Object.keys(finalValues).forEach((key) => {
          if (key !== "subcategories" && typeof finalValues[key] !== "object") {
            formData.append(key, finalValues[key]);
          }
        });

        // Add subcategories with image metadata
        const subcategoriesData = finalValues.subcategories?.map(
          (sub: any, index: number) => ({
            sub_category_name: sub.sub_category_name,
            image: sub.image || "",
            hasNewImage: !!sub.imageFile, // Flag to indicate new image upload
            imageIndex: sub.imageFile ? index : -1, // Index for mapping to uploaded files
          })
        );

        if (subcategoriesData) {
          formData.append("subcategories", JSON.stringify(subcategoriesData));
        }

        // Add files with consistent ordering based on subcategory index
        const filesToUpload: { file: File; subcategoryIndex: number }[] = [];
        finalValues.subcategories?.forEach((sub: any, index: number) => {
          if (sub.imageFile) {
            filesToUpload.push({
              file: sub.imageFile,
              subcategoryIndex: index,
            });
          }
        });

        // Sort files by subcategory index to maintain order
        filesToUpload.sort((a, b) => a.subcategoryIndex - b.subcategoryIndex);
        filesToUpload.forEach(({ file }) => {
          formData.append("subcategory_images", file);
        });

        submitData = formData;
      }

      // Show confirmation for updates if enabled
      if (showUpdateConfirmation && initialValues) {
        setPendingValues(submitData);
        setUpdateModalOpen(true);
      } else {
        await performSubmit(submitData);
      }
    } catch (error) {
      console.error("Form submission error:", error);
      messageApi.error("Failed to save. Please try again.");
    }
  };

  const performSubmit = async (submitData: any) => {
    setSubmitLoading(true);
    try {
      await onSubmit(submitData);
      form.resetFields();
      setSubcategories({});
      onCancel();
    } catch (error) {
      console.error("Form submission error:", error);
      messageApi.error("Failed to save. Please try again.");
    } finally {
      setSubmitLoading(false);
    }
  };

  const handleUpdateConfirm = async () => {
    if (pendingValues) {
      await performSubmit(pendingValues);
      setUpdateModalOpen(false);
      setPendingValues(null);
    }
  };

  const handleUpdateCancel = () => {
    setUpdateModalOpen(false);
    setPendingValues(null);
  };

  const renderField = (field: FormField) => {
    const { type, options, placeholder, rows, name } = field;

    switch (type) {
      case "textarea":
        return <Input.TextArea rows={rows || 4} placeholder={placeholder} />;
      case "password":
        return <Input.Password placeholder={placeholder} />;
      case "select":
        return (
          <Select placeholder={placeholder}>
            {options?.map((option, index) => {
              let value, label;

              if (field.optionConfig) {
                // Use custom option configuration
                value = option[field.optionConfig.value];
                label =
                  typeof field.optionConfig.label === "function"
                    ? field.optionConfig.label(option)
                    : option[field.optionConfig.label];
              } else {
                // Default: expect {label, value} format
                value = option.value || option;
                label = option.label || option;
              }

              return (
                <Select.Option key={value || index} value={value}>
                  {label}
                </Select.Option>
              );
            })}
          </Select>
        );
      case "date":
        return <DatePicker style={{ width: "100%" }} />;
      case "switch":
        return <Switch />;
      case "upload":
        return (
          <div>
            <SimpleFileUpload
              value={initialValues?.[name]}
              onChange={(file) => {
                form.setFieldsValue({ [name]: file });
              }}
              placeholder={placeholder || "Upload image"}
            />
            {/* {initialValues?.[name] &&
              typeof initialValues[name] === "string" && (
                <div style={{ marginTop: 8 }}>
                  <CloudinaryImage
                    publicId={initialValues[name]}
                    width={100}
                    height={100}
                    alt="Current image"
                  />
                </div>
              )} */}
          </div>
        );
      case "subcategories":
        return renderSubcategoriesField(field);
      case "custom":
        return field.component || <Input placeholder={placeholder} />;
      default:
        return <Input placeholder={placeholder} />;
    }
  };

  const renderSubcategoriesField = (field: FormField) => {
    const fieldSubcats = subcategories[field.name] || [{}];
    const config = field.subcategoryConfig;

    if (!config) return null;

    return (
      <div>
        <Title level={5} style={{ color: "#1890ff", marginBottom: 16 }}>
          {field.label || "Subcategories"}
        </Title>
        <Divider style={{ margin: "8px 0 16px 0" }} />

        {fieldSubcats.map((subcat, index) => (
          <Card
            key={index}
            size="small"
            style={{ marginBottom: 16 }}
            title={`${config.label || "Subcategory"} ${index + 1}`}
            extra={
              fieldSubcats.length > 1 && (
                <Button
                  type="link"
                  danger
                  icon={<DeleteOutlined />}
                  onClick={() => removeSubcategory(field.name, index)}
                  size="small"
                />
              )
            }
          >
            <Row gutter={16}>
              <Col span={12}>
                <div style={{ marginBottom: 8 }}>
                  <label style={{ fontSize: 12, fontWeight: 500 }}>
                    Name *
                  </label>
                </div>
                <Input
                  placeholder="Enter subcategory name"
                  value={subcat[config.nameField] || ""}
                  onChange={(e) =>
                    updateSubcategory(
                      field.name,
                      index,
                      config.nameField,
                      e.target.value
                    )
                  }
                />
              </Col>
              <Col span={12}>
                <div style={{ marginBottom: 8 }}>
                  <label style={{ fontSize: 12, fontWeight: 500 }}>
                    Image *
                  </label>
                </div>
                <SimpleFileUpload
                  value={subcat.imageFile || subcat[config.imageField]}
                  onChange={(file) => {
                    updateSubcategory(field.name, index, "imageFile", file);
                  }}
                  placeholder="Upload Image"
                />
                {/* {subcat[config.imageField] &&
                  typeof subcat[config.imageField] === "string" && (
                    <div style={{ marginTop: 8 }}>
                      <CloudinaryImage
                        publicId={subcat[config.imageField]}
                        width={60}
                        height={60}
                        alt="Subcategory image"
                      />
                    </div>
                  )} */}
              </Col>
            </Row>
          </Card>
        ))}

        <Button
          type="dashed"
          icon={<PlusOutlined />}
          onClick={() => addSubcategory(field.name)}
          block
        >
          Add {config.label || "Subcategory"}
        </Button>
      </div>
    );
  };

  return (
    <>
      {contextHolder}
      <Modal
        title={title}
        open={open}
        onCancel={onCancel}
        footer={null}
        width={width}
        destroyOnHidden
      >
        <Form
          form={form}
          layout="vertical"
          initialValues={initialValues}
          onFinish={handleSubmit}
        >
          <Row gutter={16}>
            {fields.map((field) =>
              field.type === "subcategories" ? (
                <Col span={24} key={field.name}>
                  <div>{renderField(field)}</div>
                </Col>
              ) : (
                <Col span={field.col || 24} key={field.name}>
                  <Form.Item
                    name={field.name}
                    label={field.label}
                    rules={field.rules}
                    valuePropName={field.valuePropName}
                  >
                    {renderField(field)}
                  </Form.Item>
                </Col>
              )
            )}
          </Row>

          <Form.Item style={{ marginTop: 24, textAlign: "right" }}>
            <Space>
              <Button onClick={onCancel}>Cancel</Button>
              <Button type="primary" htmlType="submit" loading={loading}>
                {initialValues ? "Update" : "Create"}
              </Button>
            </Space>
          </Form.Item>
        </Form>

        <UpdateConfirmationModal
          open={updateModalOpen}
          onConfirm={handleUpdateConfirm}
          onCancel={() => setUpdateModalOpen(false)}
          title={title}
        />
      </Modal>
    </>
  );
};

export default FormModal;
