import { useState, useEffect } from "react";
import { Modal, Form, Button, Steps, Space, Divider, message } from "antd";
import { UserOutlined, SaveOutlined, UserAddOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import { parsePhoneNumberFromString } from "libphonenumber-js";
import UserDetailsStep from "./UserDetailsStep";
import PrivilegesStep from "./PrivilegesStep";
import { UserFormProps } from "../types/props";

const UserForm: React.FC<UserFormProps> = ({
  open,
  onClose,
  isEditing,
  userData,
  onAdd,
  onEdit,
}) => {
  const [form] = Form.useForm();
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [fullPhoneNumber, setFullPhoneNumber] = useState("");
  const [countryAreaCode, setCountryAreaCode] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [errors, setErrors] = useState<any>({});
  const [formData, setFormData] = useState<any>({});
  const [privileges, setPrivileges] = useState({
    dashboard: false,
    master: false,
    manageUsers: false,
    managePrivileges: false,
    destination: false,
    activity: false,
    accommodation: false,
    services: false,
    transport: false,
    findGuide: false,
    food: false,
    event: false,
    news: false,
    advertisement: false,
    aboutSriLanka: false,
    gallery: false,
    topRecommendPlaces: false,
  });

  // Define pre-configured privileges for different roles
  const getDefaultPrivileges = (role: string): any => {
    const allPrivileges = {
      dashboard: true,
      master: true,
      manageUsers: true,
      managePrivileges: true,
      destination: true,
      activity: true,
      accommodation: true,
      services: true,
      transport: true,
      findGuide: true,
      food: true,
      event: true,
      news: true,
      advertisement: true,
      aboutSriLanka: true,
      gallery: true,
      topRecommendPlaces: true,
    };

    const noPrivileges = Object.keys(allPrivileges).reduce((acc: any, key) => {
      acc[key] = false;
      return acc;
    }, {});

    switch (role) {
      case "super admin":
        return allPrivileges;
      default:
        return noPrivileges;
    }
  };

  const handlePhoneChange = (phone: string) => {
    setFullPhoneNumber(phone);

    if (phone) {
      const phoneNumber = parsePhoneNumberFromString(phone);
      if (phoneNumber) {
        setCountryAreaCode("+" + phoneNumber.countryCallingCode);
        setPhoneNumber(phoneNumber.nationalNumber);

        form.setFieldsValue({
          countryAreaCode: "+" + phoneNumber.countryCallingCode,
          phoneNumber: phoneNumber.nationalNumber,
          fullPhoneNumber: phone,
        });
      }
    } else {
      setCountryAreaCode("");
      setPhoneNumber("");

      // Clear form fields
      form.setFieldsValue({
        countryAreaCode: "",
        phoneNumber: "",
        fullPhoneNumber: "",
      });
    }

    // Clear phone error when user types
    if (errors.fullPhoneNumber) {
      setErrors((prev: any) => ({ ...prev, fullPhoneNumber: "" }));
    }
  };

  // Reset form when modal opens/closes
  useEffect(() => {
    if (open) {
      setCurrentStep(0);
      setFormData({});
      if (isEditing && userData) {
        let reconstructedPhone = "";
        if (userData.countryareacode && userData.phonenumber) {
          reconstructedPhone = userData.countryareacode + userData.phonenumber;
        }

        setFullPhoneNumber(reconstructedPhone);
        setCountryAreaCode(userData.countryareacode || "+94");
        setPhoneNumber(userData.phonenumber || "");

        const initialData = {
          firstName: userData.firstname,
          lastName: userData.lastname,
          email: userData.email,
          birthday: userData.birthday ? dayjs(userData.birthday) : null,
          phoneNumber: userData.phonenumber,
          countryAreaCode: userData.countryareacode || "+94",
          fullPhoneNumber: reconstructedPhone,
          role: userData.role?.toLowerCase(),
          gender: userData.gender || "male",
          isActive: userData.isactive !== undefined ? userData.isactive : true,
          vendor: userData.vendor || false,
        };

        form.setFieldsValue(initialData);
        setFormData(initialData);

        // Set privileges from individual user fields
        const userPrivileges = {
          dashboard: userData.dashboard || false,
          master: userData.master || false,
          manageUsers: userData.manageusers || false,
          managePrivileges: userData.manageprivileges || false,
          destination: userData.destination || false,
          activity: userData.activity || false,
          accommodation: userData.accommodation || false,
          services: userData.services || false,
          transport: userData.transport || false,
          findGuide: userData.findguide || false,
          food: userData.food || false,
          event: userData.event || false,
          news: userData.news || false,
          advertisement: userData.advertisement || false,
          aboutSriLanka: userData.aboutsrilanka || false,
          gallery: userData.gallery || false,
          topRecommendPlaces: userData.toprecommendplaces || false,
        };

        setPrivileges(userPrivileges);
      } else {
        // Reset form for new user
        form.resetFields();
        setFullPhoneNumber("");
        setCountryAreaCode("+94");
        setPhoneNumber("");
        setErrors({});

        const initialData = {
          countryAreaCode: "+94",
          gender: "male",
          isActive: true,
          fullPhoneNumber: "",
        };

        form.setFieldsValue(initialData);
        setFormData(initialData);
        setPrivileges(getDefaultPrivileges(""));
      }
    }
  }, [open, isEditing, userData, form]);

  // Update privileges when role changes
  const handleRoleChange = (role: string) => {
    if (role !== "admin") {
      setPrivileges(getDefaultPrivileges(role));
    } else {
      if (!isEditing) {
        setPrivileges(getDefaultPrivileges(""));
      }
    }
  };

  const handlePrivilegeChange = (privilege: string, checked: boolean) => {
    setPrivileges((prev: any) => ({
      ...prev,
      [privilege]: checked,
    }));
  };

  const handleSubmit = async () => {
    const currentFormData = form.getFieldsValue();
    const data = { ...formData, ...currentFormData };
    setIsSubmitting(true);

    try {
      let finalPrivileges;
      if (data.role === "admin") {
        finalPrivileges = privileges;
      } else {
        finalPrivileges = getDefaultPrivileges(data.role);
      }

      delete data.fullPhoneNumber;

      const finalFormData = {
        ...data,
        birthday: data.birthday.format("YYYY-MM-DD"),
        countryAreaCode,
        phoneNumber,
        ...finalPrivileges,
        userId: isEditing
          ? userData?._id || userData?.id || userData?.userid
          : Math.floor(Math.random() * 1000000),
      };

      if (isEditing && userData) {
        const userId = userData._id || userData.id || userData.userid;
        if (userId) {
          await onEdit(userId, finalFormData);
        }
      } else {
        await onAdd(finalFormData);
      }
    } finally {
      onClose();
      setIsSubmitting(false);
    }
  };

  const role = form.getFieldValue("role")?.toLowerCase();
  const isAdminRole = role === "admin";

  const steps = [
    {
      key: "userDetails",
      title: "User Details",
      content: (
        <UserDetailsStep
          handleRoleChange={handleRoleChange}
          form={form}
          handlePhoneChange={handlePhoneChange}
          fullPhoneNumber={fullPhoneNumber}
        />
      ),
    },
    {
      key: "setPrivileges",
      title: "Set Privileges",
      content: (
        <PrivilegesStep
          isAdminRole={isAdminRole}
          privileges={privileges}
          setPrivileges={setPrivileges}
          role={role}
          getDefaultPrivileges={getDefaultPrivileges}
          handlePrivilegeChange={handlePrivilegeChange}
        />
      ),
    },
  ];

  const next = async () => {
    try {
      await form.validateFields();
      // Preserve form data when moving to next step
      const currentFormData = form.getFieldsValue();
      setFormData((prev: any) => ({ ...prev, ...currentFormData }));
      setCurrentStep(currentStep + 1);
    } catch (error) {
      console.log("Validation Failed:", error);
    }
  };

  const prev = () => {
    setCurrentStep(currentStep - 1);
  };

  return (
    <Modal
      title={
        <Space>
          {isEditing ? <UserOutlined /> : <UserAddOutlined />}
          {isEditing ? "Update User" : "Add New User"}
        </Space>
      }
      open={open}
      onCancel={onClose}
      footer={null}
      width={800}
      destroyOnHidden
    >
      <Form form={form} layout="vertical" onFinish={handleSubmit}>
        <Steps
          current={currentStep}
          items={steps}
          size="small"
          style={{ marginBottom: 8 }}
        />

        <div>{steps[currentStep].content}</div>

        <Divider style={{ marginTop: 0, marginBottom: 16 }} />

        <div style={{ textAlign: "right" }}>
          <Space>
            {currentStep > 0 && <Button onClick={prev}>Previous</Button>}
            {currentStep < steps.length - 1 && (
              <Button type="primary" onClick={next}>
                Next
              </Button>
            )}
            {currentStep === steps.length - 1 && (
              <Button
                type="primary"
                htmlType="submit"
                loading={isSubmitting}
                icon={<SaveOutlined />}
              >
                {isEditing ? "Update User" : "Create User"}
              </Button>
            )}
          </Space>
        </div>
      </Form>
    </Modal>
  );
};

export default UserForm;
