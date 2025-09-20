import React, { useState, useEffect } from "react";
import {
  Modal,
  Form,
  Input,
  InputNumber,
  Switch,
  Button,
  Space,
  Row,
  Col,
  Select,
  message,
} from "antd";
import { SaveOutlined } from "@ant-design/icons";
import ProvinceSelector from "./ProvinceSelector";
import DistrictSelector from "./DistrictSelector";
import CitySelector from "./CitySelector";
import type { DestinationData } from "../types";

const { TextArea } = Input;
const { Option } = Select;

interface DestinationFormProps {
  open: boolean;
  onClose: () => void;
  isEditing: boolean;
  destinationData?: DestinationData | null;
  onAdd: (data: any) => Promise<void>;
  onEdit: (id: string | number, data: any) => Promise<void>;
  additionalData?: {
    categories: any[];
    transportMethods: any[];
    travelTypes: any[];
  };
}

const DestinationForm: React.FC<DestinationFormProps> = ({
  open,
  onClose,
  isEditing,
  destinationData,
  onAdd,
  onEdit,
  additionalData,
}) => {
  const [messageApi, contextHolder] = message.useMessage();
  const [form] = Form.useForm();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedProvince, setSelectedProvince] = useState<string>();
  const [selectedDistrict, setSelectedDistrict] = useState<string>();

  // Watch form values for cascading dropdowns
  const provinceValue = Form.useWatch("province", form);
  const districtValue = Form.useWatch("district", form);

  // Initialize form when modal opens
  useEffect(() => {
    if (open) {
      if (isEditing && destinationData) {
        form.setFieldsValue({
          ...destinationData,
          // Handle any data transformation if needed
        });
        setSelectedProvince(destinationData.province);
        setSelectedDistrict(destinationData.district);
      } else {
        form.resetFields();
        setSelectedProvince(undefined);
        setSelectedDistrict(undefined);
      }
    }
  }, [open, isEditing, destinationData, form]);

  // Update selected values when form values change
  useEffect(() => {
    setSelectedProvince(provinceValue);
  }, [provinceValue]);

  useEffect(() => {
    setSelectedDistrict(districtValue);
  }, [districtValue]);

  // Handle province change - clear dependent fields
  const handleProvinceChange = (value: string) => {
    setSelectedProvince(value);
    form.setFieldValue("district", undefined);
    form.setFieldValue("city", undefined);
    setSelectedDistrict(undefined);
  };

  // Handle district change - clear city
  const handleDistrictChange = (value: string) => {
    setSelectedDistrict(value);
    form.setFieldValue("city", undefined);
  };

  // Handle form submission
  const handleSubmit = async (values: any) => {
    try {
      setIsSubmitting(true);

      // Transform data if needed
      const formData = {
        ...values,
        pending: isEditing && values.pending ? values.pending : true,
        approved: isEditing && values.approved ? values.approved : false,
        rejected: isEditing && values.rejected ? values.rejected : false,
      };

      if (isEditing && destinationData?.id) {
        await onEdit(destinationData.id, formData);
        messageApi.success("Destination updated successfully");
      } else {
        await onAdd(formData);
        messageApi.success("Destination created successfully");
      }

      onClose();
    } catch (error) {
      console.error("Form submission error:", error);
      messageApi.error("Failed to save destination. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    form.resetFields();
    onClose();
  };

  return (
    <>
      {contextHolder}
      <Modal
        title={isEditing ? "Edit Destination" : "Add Destination"}
        open={open}
        onCancel={handleCancel}
        footer={null}
        width={900}
        destroyOnHidden
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          initialValues={{
            rating: 0,
            ticket_price: 0,
            always_open: false,
            need_ticket: false,
            pending: true,
          }}
        >
          <Row gutter={16}>
            {/* Basic Information */}
            <Col span={24}>
              <Form.Item
                name="name"
                label="Destination Name"
                rules={[
                  { required: true, message: "Please input destination name!" },
                  { min: 3, message: "Name must be at least 3 characters" },
                ]}
              >
                <Input placeholder="Enter destination name" />
              </Form.Item>
            </Col>

            {/* Location Fields */}
            <Col span={8}>
              <Form.Item
                name="province"
                label="Province"
                rules={[{ required: true, message: "Please select province!" }]}
              >
                <ProvinceSelector
                  placeholder="Select Province"
                  onChange={handleProvinceChange}
                />
              </Form.Item>
            </Col>

            <Col span={8}>
              <Form.Item
                name="district"
                label="District"
                rules={[{ required: true, message: "Please select district!" }]}
              >
                <DistrictSelector
                  province={selectedProvince}
                  placeholder="Select District"
                  onChange={handleDistrictChange}
                />
              </Form.Item>
            </Col>

            <Col span={8}>
              <Form.Item
                name="city"
                label="City"
                rules={[{ required: true, message: "Please select city!" }]}
              >
                <CitySelector
                  province={selectedProvince}
                  district={selectedDistrict}
                  placeholder="Select City"
                />
              </Form.Item>
            </Col>

            {/* Google Map Location */}
            <Col span={24}>
              <Form.Item name="google_map_location" label="Google Map Location">
                <Input placeholder="Enter Google Maps URL or location" />
              </Form.Item>
            </Col>

            {/* Description */}
            <Col span={24}>
              <Form.Item
                name="description"
                label="Description"
                rules={[
                  { required: true, message: "Please input description!" },
                  {
                    min: 10,
                    message: "Description must be at least 10 characters",
                  },
                ]}
              >
                <TextArea
                  rows={4}
                  placeholder="Enter destination description"
                />
              </Form.Item>
            </Col>

            {/* Category, Transport Method, and Travel Type in same row */}
            <Col span={8}>
              <Form.Item
                name="category"
                label="Category"
                rules={[{ required: true, message: "Please select category!" }]}
              >
                <Select placeholder="Select category">
                  {additionalData?.categories?.map((category) => (
                    <Option key={category.id} value={category.id}>
                      {category.category_name}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>

            <Col span={8}>
              <Form.Item
                name="transport_method"
                label="Transport Method"
                rules={[
                  {
                    required: true,
                    message: "Please select transport method!",
                  },
                ]}
              >
                <Select placeholder="Select transport method">
                  {additionalData?.transportMethods?.map((method) => (
                    <Option key={method.id} value={method.id}>
                      {method.transport_method}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>

            <Col span={8}>
              <Form.Item
                name="traveler_type"
                label="Traveler Type"
                rules={[
                  { required: true, message: "Please select traveler type!" },
                ]}
              >
                <Select placeholder="Select traveler type">
                  {additionalData?.travelTypes?.map((type) => (
                    <Option key={type.id} value={type.id}>
                      {type.travel_type}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>

            {/* Pricing and Rating */}
            <Col span={8}>
              <Form.Item
                name="ticket_price"
                label="Ticket Price"
                rules={[
                  { type: "number", min: 0, message: "Price must be positive" },
                ]}
              >
                <InputNumber
                  style={{ width: "100%" }}
                  placeholder="Enter price"
                  min={0}
                  precision={2}
                />
              </Form.Item>
            </Col>

            <Col span={8}>
              <Form.Item
                name="rating"
                label="Rating"
                rules={[
                  {
                    type: "number",
                    min: 0,
                    max: 5,
                    message: "Rating must be between 0 and 5",
                  },
                ]}
              >
                <InputNumber
                  style={{ width: "100%" }}
                  placeholder="Enter rating"
                  min={0}
                  max={5}
                  step={0.1}
                  precision={1}
                />
              </Form.Item>
            </Col>

            <Col span={8}>
              <Form.Item
                name="need_ticket"
                label="Need Ticket"
                valuePropName="checked"
              >
                <Switch />
              </Form.Item>
            </Col>

            {/* Opening hours and Always Open */}
            <Col span={16}>
              <Form.Item name="open_time" label="Opening Hours">
                <Input placeholder="e.g., 9:00 AM - 5:00 PM" />
              </Form.Item>
            </Col>

            <Col span={8}>
              <Form.Item
                name="always_open"
                label="Always Open"
                valuePropName="checked"
              >
                <Switch />
              </Form.Item>
            </Col>

            {/* Additional Information */}
            <Col span={12}>
              <Form.Item
                name="website_social_media_link"
                label="Website/Social Media"
              >
                <Input placeholder="Enter website or social media links" />
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item name="contact_no" label="Contact Number">
                <Input placeholder="Enter contact number" />
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item name="suggestion_time" label="Suggested Visit Time">
                <Input placeholder="e.g., 2-3 hours" />
              </Form.Item>
            </Col>

            {/* Tags - Last row */}
            <Col span={24}>
              <Form.Item name="tag" label="Tags">
                <Input placeholder="Enter tags (comma separated)" />
              </Form.Item>
            </Col>
          </Row>

          {/* Form Actions */}
          <Row>
            <Col span={24} style={{ textAlign: "right", marginTop: 24 }}>
              <Space>
                <Button onClick={handleCancel}>Cancel</Button>
                <Button
                  type="primary"
                  htmlType="submit"
                  loading={isSubmitting}
                  icon={<SaveOutlined />}
                >
                  {isEditing ? "Update Destination" : "Create Destination"}
                </Button>
              </Space>
            </Col>
          </Row>
        </Form>
      </Modal>
    </>
  );
};

export default DestinationForm;
