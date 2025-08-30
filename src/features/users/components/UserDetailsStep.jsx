import { useState } from "react";
import {
  Form,
  Input,
  Select,
  DatePicker,
  Row,
  Col,
  Progress,
  Checkbox,
  Radio,
  theme,
} from "antd";
import {
  UserOutlined,
  LockOutlined,
  EyeInvisibleOutlined,
  EyeTwoTone,
} from "@ant-design/icons";
import dayjs from "dayjs";
import PhoneInput from "react-phone-number-input";
import { parsePhoneNumberFromString } from "libphonenumber-js";
import "react-phone-number-input/style.css";

const { Option } = Select;

const UserDetailsStep = ({
  handleRoleChange,
  form,
  handlePhoneChange,
  fullPhoneNumber,
}) => {
  const { token } = theme.useToken();
  const [passwordStrength, setPasswordStrength] = useState(0);

  const calculatePasswordStrength = (password) => {
    let strength = 0;
    if (password.length >= 8) strength += 20;
    if (/[a-z]/.test(password)) strength += 20;
    if (/[A-Z]/.test(password)) strength += 20;
    if (/[0-9]/.test(password)) strength += 20;
    if (/[^A-Za-z0-9]/.test(password)) strength += 20;
    return Math.min(strength, 100);
  };

  const getPasswordStrengthStatus = (strength) => {
    if (strength < 40) return { status: "exception", text: "Weak" };
    if (strength < 60) return { status: "normal", text: "Fair" };
    if (strength < 80) return { status: "active", text: "Good" };
    return { status: "success", text: "Strong" };
  };

  const handlePasswordChange = (e) => {
    const password = e.target.value;
    setPasswordStrength(calculatePasswordStrength(password));
  };

  const userRoles = [
    { value: "super admin", label: "Super Admin" },
    { value: "admin", label: "Admin" },
    { value: "user", label: "User" },
  ];

  // Define styles object for PhoneInput theming
  const phoneInputStyles = {
    ".PhoneInput": {
      width: "100%",
    },
    ".PhoneInput .PhoneInputInput": {
      height: `${token.controlHeight}px`,
      padding: `${token.paddingXS}px ${token.paddingSM}px`,
      border: `1px solid ${token.colorBorder}`,
      borderRadius: `${token.borderRadius}px`,
      fontSize: `${token.fontSize}px`,
      lineHeight: token.lineHeight,
      color: token.colorText,
      backgroundColor: token.colorBgContainer,
      transition: `all ${token.motionDurationMid}`,
      boxSizing: "border-box",
    },
    ".PhoneInput .PhoneInputInput:hover": {
      borderColor: token.colorPrimaryHover,
    },
    ".PhoneInput .PhoneInputInput:focus": {
      borderColor: token.colorPrimary,
      boxShadow: `0 0 0 2px ${token.colorPrimaryBg}`,
      outline: 0,
    },
    ".PhoneInput .PhoneInputCountrySelect": {
      height: `${token.controlHeight}px`,
      marginRight: `${token.marginXS}px`,
      border: `1px solid ${token.colorBorder}`,
      borderRadius: `${token.borderRadius}px`,
      backgroundColor: token.colorBgContainer,
      transition: `all ${token.motionDurationMid}`,
    },
    ".PhoneInput .PhoneInputCountrySelect:hover": {
      borderColor: token.colorPrimaryHover,
    },
    ".PhoneInput .PhoneInputCountrySelect:focus": {
      borderColor: token.colorPrimary,
      boxShadow: `0 0 0 2px ${token.colorPrimaryBg}`,
      outline: 0,
    },
    ".PhoneInput .PhoneInputCountrySelectArrow": {
      color: token.colorTextQuaternary,
    },
    ".PhoneInput .PhoneInputCountryIcon": {
      marginRight: `${token.marginXXS}px`,
    },
    ".PhoneInput--error .PhoneInputInput": {
      borderColor: token.colorError,
    },
    ".PhoneInput--error .PhoneInputInput:hover": {
      borderColor: token.colorErrorHover,
    },
    ".PhoneInput--error .PhoneInputInput:focus": {
      borderColor: token.colorError,
      boxShadow: `0 0 0 2px ${token.colorErrorBg}`,
    },
    ".PhoneInput--error .PhoneInputCountrySelect": {
      borderColor: token.colorError,
    },
    ".PhoneInput .PhoneInputInput:disabled": {
      backgroundColor: token.colorBgContainerDisabled,
      borderColor: token.colorBorder,
      color: token.colorTextDisabled,
      cursor: "not-allowed",
    },
    ".PhoneInput .PhoneInputCountrySelect:disabled": {
      backgroundColor: token.colorBgContainerDisabled,
      borderColor: token.colorBorder,
      cursor: "not-allowed",
    },
  };

  // Convert styles object to CSS string
  const cssString = Object.entries(phoneInputStyles)
    .map(([selector, styles]) => {
      const styleProps = Object.entries(styles)
        .map(
          ([prop, value]) =>
            `${prop.replace(/([A-Z])/g, "-$1").toLowerCase()}: ${value};`
        )
        .join(" ");
      return `${selector} { ${styleProps} }`;
    })
    .join(" ");

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: cssString }} />

      <Row gutter={16}>
        <Col xs={24} sm={12}>
          <Form.Item
            name="firstName"
            label="First Name"
            rules={[
              { required: true, message: "Please enter first name" },
              { min: 2, message: "First name must be at least 2 characters" },
            ]}
          >
            <Input prefix={<UserOutlined />} placeholder="Enter first name" />
          </Form.Item>
        </Col>
        <Col xs={24} sm={12}>
          <Form.Item
            name="lastName"
            label="Last Name"
            rules={[
              { required: true, message: "Please enter last name" },
              { min: 2, message: "Last name must be at least 2 characters" },
            ]}
          >
            <Input placeholder="Enter last name" />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col xs={24} sm={12}>
          <Form.Item
            name="email"
            label="Email"
            rules={[
              { required: true, message: "Please enter email" },
              { type: "email", message: "Please enter a valid email" },
            ]}
          >
            <Input placeholder="Enter email address" />
          </Form.Item>
        </Col>
        <Col xs={24} sm={12}>
          <Form.Item
            name="birthday"
            label="Birthday"
            rules={[{ required: true, message: "Please select birthday" }]}
          >
            <DatePicker
              style={{ width: "100%" }}
              format="YYYY-MM-DD"
              disabledDate={(current) =>
                current && current > dayjs().endOf("day")
              }
            />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col xs={24} sm={24}>
          <Form.Item
            name="fullPhoneNumber"
            label="Phone Number"
            rules={[
              { required: true, message: "Please enter phone number" },
              {
                validator: (_, value) => {
                  if (!value) return Promise.resolve();
                  const phoneNumber = parsePhoneNumberFromString(value);
                  if (phoneNumber && phoneNumber.isValid()) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error("Please enter a valid phone number")
                  );
                },
              },
            ]}
          >
            <PhoneInput
              placeholder="Enter phone number"
              value={fullPhoneNumber}
              onChange={handlePhoneChange}
              defaultCountry="LK"
              international
              countryCallingCodeEditable={false}
            />
          </Form.Item>
        </Col>
      </Row>

      {/* Hidden fields to store separated values for backend */}
      <Form.Item name="countryAreaCode" hidden>
        <Input />
      </Form.Item>
      <Form.Item name="phoneNumber" hidden>
        <Input />
      </Form.Item>

      <Row gutter={16}>
        <Col xs={24} sm={12}>
          <Form.Item
            name="password"
            label="Password"
            rules={[
              // { required: true, message: "Please enter password" },
              { min: 8, message: "Password must be at least 8 characters" },
              {
                pattern:
                  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
                message:
                  "Password must contain uppercase, lowercase, number and special character",
              },
            ]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="Enter password"
              onChange={handlePasswordChange}
              iconRender={(visible) =>
                visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
              }
            />
          </Form.Item>
          {passwordStrength > 0 && (
            <Progress
              percent={passwordStrength}
              status={getPasswordStrengthStatus(passwordStrength).status}
              format={() => getPasswordStrengthStatus(passwordStrength).text}
              size="small"
              style={{ marginTop: -16, marginBottom: 16 }}
            />
          )}
        </Col>
        <Col xs={24} sm={12}>
          <Form.Item
            name="confirmPassword"
            label="Confirm Password"
            dependencies={["password"]}
            rules={[
              // { required: true, message: "Please confirm password" },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error("Passwords do not match!"));
                },
              }),
            ]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="Confirm password"
              iconRender={(visible) =>
                visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
              }
            />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col xs={24} sm={12}>
          <Form.Item
            name="role"
            label="User Role"
            rules={[{ required: true, message: "Please select a role" }]}
          >
            <Select placeholder="Select user role" onChange={handleRoleChange}>
              {userRoles.map((role) => (
                <Option key={role.value} value={role.value}>
                  {role.label}
                </Option>
              ))}
            </Select>
          </Form.Item>
        </Col>
        <Col xs={24} sm={8}>
          <Form.Item name="gender" label="Gender">
            <Radio.Group>
              <Radio value="Male">Male</Radio>
              <Radio value="Female">Female</Radio>
              <Radio value="Other">Other</Radio>
            </Radio.Group>
          </Form.Item>
        </Col>
        <Col xs={24} sm={4}>
          <Form.Item
            name="isActive"
            valuePropName="checked"
            label="Account Status"
          >
            <Checkbox defaultChecked>
              {form.getFieldValue("isActive") ? "Active" : "Inactive"}
            </Checkbox>
          </Form.Item>
        </Col>
      </Row>
    </>
  );
};

export default UserDetailsStep;
