import React from "react";
import { Input, Select, DatePicker, Radio, Switch } from "antd";
import type { FormField } from "@/shared/components/FormModal";

const { Option } = Select;

// User role options
const userRoleOptions = [
  { label: "Super Admin", value: "Super Admin" },
  { label: "Admin", value: "Admin" },
  { label: "Manager", value: "Manager" },
  { label: "User", value: "User" },
];

export const userFormFields: FormField[] = [
  {
    name: "firstName",
    label: "First Name",
    type: "input",
    rules: [
      { required: true, message: "Please enter first name" },
      { min: 2, message: "First name must be at least 2 characters" },
    ],
    placeholder: "Enter first name",
    col: 12,
  },
  {
    name: "lastName",
    label: "Last Name",
    type: "input",
    rules: [
      { required: true, message: "Please enter last name" },
      { min: 2, message: "Last name must be at least 2 characters" },
    ],
    placeholder: "Enter last name",
    col: 12,
  },
  {
    name: "email",
    label: "Email Address",
    type: "input",
    rules: [
      { required: true, message: "Please enter email address" },
      { type: "email", message: "Please enter a valid email address" },
    ],
    placeholder: "Enter email address",
  },
  {
    name: "role",
    label: "User Role",
    type: "select",
    rules: [{ required: true, message: "Please select a role" }],
    options: userRoleOptions,
    placeholder: "Select user role",
    col: 12,
  },
  {
    name: "gender",
    label: "Gender",
    type: "custom",
    component: (
      <Radio.Group>
        <Radio value="Male">Male</Radio>
        <Radio value="Female">Female</Radio>
        <Radio value="Other">Other</Radio>
      </Radio.Group>
    ),
    col: 12,
  },
  {
    name: "birthday",
    label: "Date of Birth",
    type: "date",
    col: 12,
  },
  {
    name: "phoneNumber",
    label: "Phone Number",
    type: "input",
    placeholder: "Enter phone number",
    col: 12,
  },
  {
    name: "password",
    label: "Password",
    type: "password",
    rules: [
      { required: true, message: "Please enter password" },
      { min: 8, message: "Password must be at least 8 characters" },
    ],
    placeholder: "Enter password",
    col: 12,
  },
  {
    name: "isActive",
    label: "Active Status",
    type: "custom",
    component: <Switch />,
    valuePropName: "checked",
    col: 6,
  },
  {
    name: "vendor",
    label: "Is Vendor",
    type: "custom",
    component: <Switch />,
    valuePropName: "checked",
    col: 6,
  },
];

// Simplified privilege fields - we can make this more sophisticated later
export const privilegeFields: FormField[] = [
  {
    name: "dashboard",
    label: "Dashboard Access",
    type: "custom",
    component: <Switch />,
    valuePropName: "checked",
    col: 8,
  },
  {
    name: "master",
    label: "Master Data Access",
    type: "custom",
    component: <Switch />,
    valuePropName: "checked",
    col: 8,
  },
  {
    name: "manageUsers",
    label: "Manage Users",
    type: "custom",
    component: <Switch />,
    valuePropName: "checked",
    col: 8,
  },
  {
    name: "destination",
    label: "Destinations",
    type: "custom",
    component: <Switch />,
    valuePropName: "checked",
    col: 8,
  },
  {
    name: "activity",
    label: "Activities",
    type: "custom",
    component: <Switch />,
    valuePropName: "checked",
    col: 8,
  },
  {
    name: "accommodation",
    label: "Accommodations",
    type: "custom",
    component: <Switch />,
    valuePropName: "checked",
    col: 8,
  },
  {
    name: "services",
    label: "Services",
    type: "custom",
    component: <Switch />,
    valuePropName: "checked",
    col: 8,
  },
  {
    name: "event",
    label: "Events",
    type: "custom",
    component: <Switch />,
    valuePropName: "checked",
    col: 8,
  },
  {
    name: "news",
    label: "News",
    type: "custom",
    component: <Switch />,
    valuePropName: "checked",
    col: 8,
  },
];

// Combined form fields for single-modal approach
export const combinedUserFormFields: FormField[] = [
  ...userFormFields,
  // Add a divider section for privileges
  ...privilegeFields,
];
