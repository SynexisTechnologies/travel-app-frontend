# Travel Website Frontend

A React + TypeScript + Vite frontend application for a comprehensive travel management system. This project features generic components for rapid development, consistent UI patterns, and robust CRUD operations.

## 🏗️ Architecture Overview

This project follows a feature-based architecture with shared generic components that dramatically reduce development time and ensure consistency across the application.

### Key Components

- **GenericPage**: Reusable page component with built-in table, search, and actions
- **FormModal**: Flexible form modal with support for various field types and subcategories
- **useCrud Hook**: Generic CRUD operations hook that integrates seamlessly with components
- **Service Layer**: API integration pattern for backend communication

## 🚀 Quick Start Guide

### Using Generic Components (Recommended for Simple CRUD)

For simple CRUD operations like managing categories, use the generic components pattern. Here's a complete example:

#### 1. Create API Service

```typescript
// features/myFeature/api/myFeatureApi.ts
import apiInstance from "@/shared/api/apiInstance";

const BASE_URL = "/my-features";

export const getMyFeatures = () => apiInstance.get(BASE_URL);
export const getMyFeatureById = (id: string | number) =>
  apiInstance.get(`${BASE_URL}/${id}`);
export const createMyFeature = (data: any) => apiInstance.post(BASE_URL, data);
export const updateMyFeature = (id: string | number, data: any) =>
  apiInstance.put(`${BASE_URL}/${id}`, data);
export const deleteMyFeature = (id: string | number) =>
  apiInstance.delete(`${BASE_URL}/${id}`);

export interface MyFeatureData {
  id: number;
  name: string;
  description?: string;
  status?: boolean;
  created_at?: string;
  updated_at?: string;
}
```

#### 2. Create Custom Hook

```typescript
// features/myFeature/hooks/useMyFeatures.ts
import { useMemo } from "react";
import { useCrud } from "@/shared/hooks";
import {
  getMyFeatures,
  createMyFeature,
  updateMyFeature,
  deleteMyFeature,
  getMyFeatureById,
  MyFeatureData,
} from "../api/myFeatureApi";

export const useMyFeatures = (messageApi?: any) => {
  const operations = useMemo(
    () => ({
      list: async () => {
        const response = await getMyFeatures();
        return { data: response.data?.data || [], total: response.data?.total };
      },
      getById: async (id: string | number) => {
        const response = await getMyFeatureById(id);
        return { data: response.data?.data };
      },
      create: async (data: any) => {
        const response = await createMyFeature(data);
        return { data: response.data?.data };
      },
      update: async (id: string | number, data: any) => {
        const response = await updateMyFeature(id, data);
        return { data: response.data?.data };
      },
      delete: async (id: string | number) => {
        await deleteMyFeature(id);
      },
    }),
    []
  );

  return useCrud({
    operations,
    entityName: "My Feature",
    autoLoad: true,
    messageApi,
  });
};
```

#### 3. Create Component with Generic Page and Form

```typescript
// features/myFeature/components/MyFeatureTabContent.tsx
import React, { useState } from "react";
import { message } from "antd";
import { GenericPage, FormModal } from "@/shared/components";
import { useMyFeatures } from "../hooks/useMyFeatures";
import type { MyFeatureData } from "../api/myFeatureApi";

const MyFeatureTabContent: React.FC = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const hookData = useMyFeatures(messageApi);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<MyFeatureData | null>(null);

  // Define table columns
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status: boolean) => (status ? "Active" : "Inactive"),
    },
  ];

  // Define form fields
  const formFields = [
    {
      name: "name",
      label: "Name",
      type: "input" as const,
      rules: [{ required: true, message: "Please enter name" }],
    },
    {
      name: "description",
      label: "Description",
      type: "textarea" as const,
      rows: 3,
    },
    {
      name: "status",
      label: "Status",
      type: "switch" as const,
      valuePropName: "checked",
    },
  ];

  // Event handlers
  const handleAdd = () => {
    setEditingItem(null);
    setModalOpen(true);
  };

  const handleEdit = (item: MyFeatureData) => {
    setEditingItem(item);
    setModalOpen(true);
  };

  const handleDelete = async (item: MyFeatureData) => {
    await hookData.deleteItem(item.id);
  };

  const handleSubmit = async (values: any) => {
    try {
      if (editingItem) {
        await hookData.updateItem(editingItem.id, values);
        messageApi.success("Updated successfully");
      } else {
        await hookData.addItem(values);
        messageApi.success("Created successfully");
      }
      setModalOpen(false);
    } catch (error) {
      messageApi.error("Failed to save");
    }
  };

  return (
    <>
      {contextHolder}
      <GenericPage
        title="My Features"
        data={hookData.data}
        columns={columns}
        loading={hookData.loading}
        onAdd={handleAdd}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      <FormModal
        title={editingItem ? "Edit Feature" : "Add Feature"}
        open={modalOpen}
        onCancel={() => setModalOpen(false)}
        onSubmit={handleSubmit}
        fields={formFields}
        initialValues={editingItem}
      />
    </>
  );
};

export default MyFeatureTabContent;
```

### Using Custom Forms (For Complex Requirements)

For complex forms with custom logic, cascading dropdowns, or special validation, create custom form components:

#### 1. Create Custom Form Component

```typescript
// features/destination/components/DestinationForm.tsx
import React, { useState, useEffect } from "react";
import {
  Modal,
  Form,
  Input,
  Select,
  Button,
  Space,
  Row,
  Col,
  message,
} from "antd";
import { ProvinceSelector, DistrictSelector, CitySelector } from "./selectors";

interface DestinationFormProps {
  open: boolean;
  onClose: () => void;
  isEditing: boolean;
  destinationData?: any;
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

  // Initialize form when modal opens
  useEffect(() => {
    if (open) {
      if (isEditing && destinationData) {
        form.setFieldsValue(destinationData);
        setSelectedProvince(destinationData.province);
        setSelectedDistrict(destinationData.district);
      } else {
        form.resetFields();
        setSelectedProvince(undefined);
        setSelectedDistrict(undefined);
      }
    }
  }, [open, isEditing, destinationData, form]);

  // Handle cascading dropdown changes
  const handleProvinceChange = (value: string) => {
    setSelectedProvince(value);
    form.setFieldValue("district", undefined);
    form.setFieldValue("city", undefined);
    setSelectedDistrict(undefined);
  };

  const handleDistrictChange = (value: string) => {
    setSelectedDistrict(value);
    form.setFieldValue("city", undefined);
  };

  // Handle form submission
  const handleSubmit = async (values: any) => {
    try {
      setIsSubmitting(true);

      if (isEditing && destinationData?.id) {
        await onEdit(destinationData.id, values);
        messageApi.success("Destination updated successfully");
      } else {
        await onAdd(values);
        messageApi.success("Destination created successfully");
      }

      onClose();
    } catch (error) {
      messageApi.error("Failed to save destination");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {contextHolder}
      <Modal
        title={isEditing ? "Edit Destination" : "Add Destination"}
        open={open}
        onCancel={onClose}
        footer={null}
        width={900}
        destroyOnHidden
      >
        <Form form={form} layout="vertical" onFinish={handleSubmit}>
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item
                name="name"
                label="Destination Name"
                rules={[
                  { required: true, message: "Please input destination name!" },
                ]}
              >
                <Input placeholder="Enter destination name" />
              </Form.Item>
            </Col>

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

            <Col span={8}>
              <Form.Item
                name="category"
                label="Category"
                rules={[{ required: true, message: "Please select category!" }]}
              >
                <Select placeholder="Select category">
                  {additionalData?.categories?.map((category) => (
                    <Select.Option key={category.id} value={category.id}>
                      {category.category_name}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
          </Row>

          <Form.Item style={{ textAlign: "right", marginTop: 24 }}>
            <Space>
              <Button onClick={onClose}>Cancel</Button>
              <Button type="primary" htmlType="submit" loading={isSubmitting}>
                {isEditing ? "Update" : "Create"}
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default DestinationForm;
```

#### 2. Integrate Custom Form with Page

```typescript
// features/destination/pages/ManageDestinations.tsx
import React, { useState } from "react";
import { Card, message } from "antd";
import { GenericPage } from "@/shared/components";
import { useDestinations } from "../hooks/useDestinations";
import { DestinationForm } from "../components";

const ManageDestinations: React.FC = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const hookData = useDestinations(messageApi);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);

  const columns = [
    { title: "Name", dataIndex: "name", key: "name" },
    { title: "Province", dataIndex: "province", key: "province" },
    { title: "City", dataIndex: "city", key: "city" },
  ];

  const handleAdd = async (data: any) => {
    await hookData.addItem(data);
  };

  const handleEdit = async (id: string | number, data: any) => {
    await hookData.updateItem(id, data);
  };

  return (
    <>
      {contextHolder}
      <Card>
        <GenericPage
          title="Manage Destinations"
          data={hookData.data}
          columns={columns}
          loading={hookData.loading}
          onAdd={() => {
            setEditingItem(null);
            setModalOpen(true);
          }}
          onEdit={(record) => {
            setEditingItem(record);
            setModalOpen(true);
          }}
          onDelete={hookData.deleteItem}
        />
      </Card>

      <DestinationForm
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        isEditing={!!editingItem}
        destinationData={editingItem}
        onAdd={handleAdd}
        onEdit={handleEdit}
        additionalData={hookData.additionalData}
      />
    </>
  );
};

export default ManageDestinations;
```

## 📋 Component Reference

### GenericPage Props

```typescript
interface GenericPageProps<T = any> {
  title: string; // Page title
  data: T[]; // Table data
  columns: TableProps<T>["columns"]; // Ant Design table columns
  loading?: boolean; // Loading state
  onAdd?: () => void; // Add button handler
  onEdit?: (record: T) => void; // Edit action handler
  onDelete?: (record: T) => void; // Delete action handler
  onView?: (record: T) => void; // View action handler
  rowKey?: string; // Table row key (default: "id")
  showActions?: boolean; // Show action column (default: true)
  showSearch?: boolean; // Show search input (default: true)
  searchPlaceholder?: string; // Search placeholder text
  tableProps?: any; // Additional table props
  showDeleteConfirmation?: boolean; // Show delete confirmation (default: true)
  getItemDisplayName?: (record: T) => string; // Get display name for confirmations
  deleteConfirmTitle?: string; // Delete confirmation title
  deleteConfirmDescription?: string; // Delete confirmation description
}
```

### FormModal Props

```typescript
interface FormModalProps {
  title: string; // Modal title
  open: boolean; // Modal visibility
  onCancel: () => void; // Cancel handler
  onSubmit: (values: any) => Promise<void> | void; // Submit handler
  fields: FormField[]; // Form field configuration
  initialValues?: any; // Initial form values
  loading?: boolean; // Loading state
  width?: number; // Modal width (default: 600)
  showUpdateConfirmation?: boolean; // Show update confirmation
  updateConfirmTitle?: string; // Update confirmation title
  updateConfirmDescription?: string; // Update confirmation description
  getItemDisplayName?: () => string; // Get display name for update confirmation
}
```

### FormField Configuration

```typescript
interface FormField {
  name: string; // Field name
  label: string; // Field label
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
  rules?: any[]; // Validation rules
  options?: { label: string; value: any }[] | any[]; // Select options
  optionConfig?: {
    // Custom option configuration
    value: string;
    label: string | ((item: any) => string);
  };
  placeholder?: string; // Placeholder text
  rows?: number; // Textarea rows
  component?: React.ReactNode; // Custom component
  valuePropName?: string; // Value prop name (e.g., "checked" for Switch)
  col?: number; // Column span (1-24)
  subcategoryConfig?: SubcategoryField; // Subcategory configuration
}
```

### useCrud Hook

```typescript
interface CrudOperations<T = any> {
  list: () => Promise<{ data: T[]; total?: number }>;
  getById: (id: string | number) => Promise<{ data: T }>;
  create: (data: Omit<T, "id">) => Promise<{ data: T }>;
  update: (id: string | number, data: Partial<T>) => Promise<{ data: T }>;
  delete: (id: string | number) => Promise<void>;
}

interface UseCrudConfig<T = any> {
  operations: CrudOperations<T>; // CRUD operations
  entityName: string; // Entity name for messages
  autoLoad?: boolean; // Auto-load data on mount (default: true)
  messageApi?: any; // Ant Design message API
}

// Hook return type
interface CrudHookReturn<T = any> {
  data: T[]; // Current data
  loading: boolean; // Loading state
  paginationDetails: PaginationDetails; // Pagination info
  setPaginationDetails: (details: any) => void;
  loadOneItem: (id: string | number) => Promise<T>;
  addItem: (data: Omit<T, "id">) => Promise<T>;
  updateItem: (id: string | number, data: Partial<T>) => Promise<T>;
  deleteItem: (id: string | number) => Promise<void>;
  loadData: () => Promise<void>;
  contextHolder: React.ReactElement; // Message context holder
}
```

## 🎯 Best Practices

### When to Use Generic Components

- ✅ Simple CRUD operations (categories, settings, master data)
- ✅ Standard form fields (input, textarea, select, switch, date)
- ✅ Basic table display with search and actions
- ✅ Consistent UI patterns across features

### When to Use Custom Forms

- ✅ Complex validation logic
- ✅ Cascading dropdowns or dependent fields
- ✅ File uploads with preview
- ✅ Multi-step forms
- ✅ Custom field types or layouts
- ✅ Advanced user interactions

### Code Organization

```
features/
├── myFeature/
│   ├── api/
│   │   └── myFeatureApi.ts          # API calls and types
│   ├── hooks/
│   │   └── useMyFeatures.ts         # Custom hook with useCrud
│   ├── components/
│   │   ├── MyFeatureTabContent.tsx  # Generic component usage
│   │   └── MyFeatureForm.tsx        # Custom form (if needed)
│   ├── pages/
│   │   └── ManageMyFeatures.tsx     # Page component
│   └── types/
│       └── index.ts                 # TypeScript types
```

## 🔧 Advanced Features

### FormModal Field Types

#### Basic Fields

```typescript
// Input field
{ name: "name", label: "Name", type: "input", rules: [{ required: true }] }

// Textarea field
{ name: "description", label: "Description", type: "textarea", rows: 4 }

// Select field
{
  name: "category",
  label: "Category",
  type: "select",
  options: [
    { label: "Option 1", value: "1" },
    { label: "Option 2", value: "2" }
  ]
}

// Select with custom option configuration
{
  name: "category",
  label: "Category",
  type: "select",
  options: categories, // Array of objects
  optionConfig: {
    value: "id",
    label: "category_name" // or function: (item) => item.category_name
  }
}

// Switch field
{ name: "active", label: "Active", type: "switch", valuePropName: "checked" }

// Date field
{ name: "date", label: "Date", type: "date" }

// File upload field
{ name: "image", label: "Image", type: "upload" }
```

#### Advanced Fields

```typescript
// Subcategories field (dynamic list)
{
  name: "subcategories",
  label: "Subcategories",
  type: "subcategories",
  subcategoryConfig: {
    nameField: "subcategory_name",
    imageField: "subcategory_image",
    label: "Subcategory"
  }
}

// Custom component
{
  name: "custom_field",
  label: "Custom Field",
  type: "custom",
  component: <YourCustomComponent />
}
```

### Advanced Hook Patterns

#### Multiple Data Sources

```typescript
export const useDestinations = (messageApi?: any) => {
  const [additionalData, setAdditionalData] = useState({
    categories: [],
    transportMethods: [],
    travelTypes: [],
  });

  // Load additional data
  useEffect(() => {
    const loadAdditionalData = async () => {
      try {
        const [categoriesRes, transportRes, travelRes] = await Promise.all([
          getDestinationCategories(),
          getTransportMethods(),
          getTravelTypes(),
        ]);

        setAdditionalData({
          categories: categoriesRes.data?.data || [],
          transportMethods: transportRes.data?.data || [],
          travelTypes: travelRes.data?.data || [],
        });
      } catch (error) {
        console.error("Failed to load additional data:", error);
      }
    };

    loadAdditionalData();
  }, []);

  // Main CRUD operations
  const operations = useMemo(
    () => ({
      /* ... */
    }),
    []
  );
  const crudResult = useCrud({
    operations,
    entityName: "Destination",
    autoLoad: true,
    messageApi,
  });

  return {
    ...crudResult,
    additionalData,
  };
};
```

#### Status-based Filtering

```typescript
export const useDestinations = (messageApi?: any) => {
  const [selectedTab, setSelectedTab] = useState(0);
  const [filteredData, setFilteredData] = useState<DestinationData[]>([]);

  const crudResult = useCrud({
    /* ... */
  });

  // Filter data when tab changes
  useEffect(() => {
    const statusFilter = STATUS_TABS[selectedTab] || "All";
    if (statusFilter === "All") {
      setFilteredData(crudResult.data);
    } else {
      setFilteredData(
        crudResult.data.filter(
          (item) => item.status === statusFilter.toLowerCase()
        )
      );
    }
  }, [crudResult.data, selectedTab]);

  return {
    ...crudResult,
    data: filteredData, // Override data with filtered version
    selectedTab,
    setSelectedTab,
    statusTabs: STATUS_TABS,
  };
};
```

## 🎨 Styling and Customization

### Custom Table Columns

```typescript
const columns = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
    sorter: true,
    ellipsis: true,
  },
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
    render: (status: string) => (
      <Tag color={status === "active" ? "green" : "red"}>
        {status.toUpperCase()}
      </Tag>
    ),
  },
  {
    title: "Actions",
    key: "actions",
    render: (_, record) => (
      <Space>
        <Button type="link" onClick={() => handleCustomAction(record)}>
          Custom Action
        </Button>
      </Space>
    ),
  },
];
```

### Modal Customization

```typescript
<FormModal
  title="Custom Form"
  open={modalOpen}
  onCancel={() => setModalOpen(false)}
  onSubmit={handleSubmit}
  fields={formFields}
  width={800} // Custom width
  showUpdateConfirmation={true} // Enable update confirmation
  updateConfirmTitle="Confirm Changes"
  getItemDisplayName={() => editingItem?.name || "item"}
/>
```

## 🚀 Getting Started Checklist

For new developers joining the project:

1. **✅ Study the Examples**: Look at existing implementations in `features/masterData/tabs/`
2. **✅ Understand the Pattern**: API → Hook → Component structure
3. **✅ Start Simple**: Use generic components for basic CRUD operations
4. **✅ Customize When Needed**: Create custom forms for complex requirements
5. **✅ Follow TypeScript**: Always define proper interfaces and types
6. **✅ Test Your Components**: Ensure CRUD operations work correctly
7. **✅ Use Consistent Messaging**: Follow the established success/error message patterns

## 📚 Real-World Examples

Check these files for reference:

- **Generic Pattern**: `features/masterData/tabs/event/EventTabContent.tsx`
- **Custom Form**: `features/destination/components/DestinationForm.tsx`
- **Complex Hook**: `features/destination/hooks/useDestinations.ts`
- **Page Integration**: `features/destination/pages/ManageDestinations.tsx`

This architecture allows for rapid development while maintaining flexibility for complex requirements. New developers can be productive immediately using the generic components, and experienced developers can create sophisticated custom solutions when needed.
