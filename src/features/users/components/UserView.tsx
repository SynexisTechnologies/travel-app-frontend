import React from "react";
import {
  Modal,
  Avatar,
  Button,
  Space,
  Typography,
  Row,
  Col,
  Card,
  Tag,
  Divider,
  Flex,
} from "antd";
import {
  UserOutlined,
  EditOutlined,
  MailOutlined,
  PhoneOutlined,
  CalendarOutlined,
  CrownOutlined,
  SettingOutlined,
  TeamOutlined,
  CloseOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
  ClockCircleOutlined,
  IdcardOutlined,
  ManOutlined,
  WomanOutlined,
  QuestionCircleOutlined,
} from "@ant-design/icons";
import dayjs from "dayjs";
import { UserViewProps } from "../types/props";

const { Title, Text } = Typography;

const UserView: React.FC<UserViewProps> = ({
  open,
  onClose,
  userData,
  onEdit,
}) => {
  if (!userData) return null;

  // Format date for display
  const formatDate = (dateString: string) => {
    if (!dateString) return "N/A";
    return dayjs(dateString).format("MMM D, YYYY");
  };

  // Format datetime for display
  const formatDateTime = (dateString: string) => {
    if (!dateString) return "N/A";
    return dayjs(dateString).format("MMM D, YY h:mm A");
  };

  // Get role color
  const getRoleColor = (role: string) => {
    switch (role?.toLowerCase()) {
      case "super admin":
        return "#d32f2f";
      case "admin":
        return "#ed6c02";
      case "manager":
        return "#2e7d32";
      case "user":
        return "#1976d2";
      default:
        return "#757575";
    }
  };

  // Get gender icon
  const getGenderIcon = (gender?: string) => {
    switch (gender?.toLowerCase()) {
      case "male":
        return <ManOutlined style={{ fontSize: "14px" }} />;
      case "female":
        return <WomanOutlined style={{ fontSize: "14px" }} />;
      default:
        return <QuestionCircleOutlined style={{ fontSize: "14px" }} />;
    }
  };

  // Get user initials for avatar
  const getUserInitials = (firstName?: string, lastName?: string) => {
    return `${firstName?.charAt(0) || ""}${
      lastName?.charAt(0) || ""
    }`.toUpperCase();
  };

  const InfoItem: React.FC<{
    label: string;
    value: any;
    icon: React.ReactNode;
    color?: string;
  }> = ({ label, value, icon, color }) => (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "8px",
        paddingTop: "4px",
        paddingBottom: "4px",
      }}
    >
      <div
        style={{
          color: color || "#8c8c8c",
          display: "flex",
          minWidth: "20px",
          justifyContent: "center",
        }}
      >
        {icon}
      </div>
      <div style={{ flex: 1 }}>
        <div>
          <Text
            style={{
              fontSize: "11px",
              color: "#8c8c8c",
              display: "block",
            }}
          >
            {label}
          </Text>
          <Text
            style={{
              fontWeight: 500,
              fontSize: "13.6px",
              lineHeight: 1.2,
              display: "block",
            }}
          >
            {value || "N/A"}
          </Text>
        </div>
      </div>
    </div>
  );

  const SectionCard: React.FC<{
    title: string;
    icon: React.ReactNode;
    children: React.ReactNode;
  }> = ({ title, icon, children }) => (
    <Card
      size="small"
      style={{
        height: "100%",
      }}
      styles={{ body: { padding: "12px" } }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "8px",
          marginBottom: "12px",
          paddingBottom: "8px",
        }}
      >
        <div style={{ color: "#00A5CF", display: "flex" }}>{icon}</div>
        <Text
          style={{
            color: "#00A5CF",
            fontWeight: 600,
            fontSize: "13.6px",
          }}
        >
          {title}
        </Text>
      </div>
      <Divider style={{ margin: "4px 0" }} />
      {children}
    </Card>
  );

  return (
    <Modal
      open={open}
      onCancel={onClose}
      width={800}
      styles={{
        body: { padding: 0 },
        header: { display: "none" },
      }}
      footer={null}
      closable={false}
    >
      <div
        style={{
          width: "100%",
          overflow: "hidden",
        }}
      >
        {/* Compact Header */}
        <div
          style={{
            padding: "16px 24px",
            background: "linear-gradient(135deg, #00315C 0%, #00A5CF 100%)",
            color: "white",
            borderRadius: 8,
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            {/* Left side - User info */}
            <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
              <Avatar
                size={50}
                style={{
                  backgroundColor: "rgba(255,255,255,0.2)",
                  fontSize: "17.6px",
                  fontWeight: "bold",
                  border: "2px solid rgba(255,255,255,0.3)",
                }}
              >
                {getUserInitials(userData.firstname, userData.lastname)}
              </Avatar>
              <div>
                <Title
                  level={4}
                  style={{
                    color: "white",
                    margin: 0,
                    fontWeight: 700,
                    lineHeight: 1.2,
                  }}
                >
                  {userData.firstname} {userData.lastname}
                </Title>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    marginTop: "4px",
                  }}
                >
                  <Text
                    style={{ fontSize: "12px", color: "rgba(255,255,255,0.9)" }}
                  >
                    ID: {userData.userid}
                  </Text>
                  <div
                    style={{
                      width: "4px",
                      height: "4px",
                      backgroundColor: "rgba(255,255,255,0.6)",
                      borderRadius: "50%",
                    }}
                  />
                  <Tag>{userData.role?.toUpperCase() || "N/A"}</Tag>
                  {userData.vendor && <Tag>VENDOR</Tag>}
                  <Tag
                    icon={
                      userData.isactive ? (
                        <CheckCircleOutlined style={{ fontSize: "12px" }} />
                      ) : (
                        <CloseCircleOutlined style={{ fontSize: "12px" }} />
                      )
                    }
                    color={userData.isactive ? "green" : "red"}
                  >
                    {userData.isactive ? "ACTIVE" : "INACTIVE"}
                  </Tag>
                </div>
              </div>
            </div>

            <Button
              type="text"
              icon={<CloseOutlined style={{ fontSize: "14px" }} />}
              onClick={onClose}
              style={{
                color: "white",
                backgroundColor: "rgba(255,255,255,0.15)",
                border: "none",
              }}
              onMouseEnter={(e) => {
                (e.target as HTMLElement).style.backgroundColor =
                  "rgba(255,255,255,0.25)";
              }}
              onMouseLeave={(e) => {
                (e.target as HTMLElement).style.backgroundColor =
                  "rgba(255,255,255,0.15)";
              }}
            />
          </div>
        </div>

        {/* Content - Compact Grid Layout */}
        <div style={{ padding: "20px 0" }}>
          <Row gutter={[16, 16]}>
            {/* Personal Info */}
            <Col xs={24} md={8}>
              <SectionCard
                title="Personal"
                icon={<UserOutlined style={{ fontSize: "14px" }} />}
              >
                <Space direction="vertical" size={4} style={{ width: "100%" }}>
                  <InfoItem
                    label="Full Name"
                    value={`${userData.firstname} ${userData.lastname}`}
                    icon={<UserOutlined style={{ fontSize: "14px" }} />}
                  />
                  <InfoItem
                    label="Birthday"
                    value={
                      userData.birthday
                        ? formatDate(userData.birthday)
                        : "Not specified"
                    }
                    icon={<CalendarOutlined style={{ fontSize: "14px" }} />}
                  />
                  <InfoItem
                    label="Gender"
                    value={
                      userData.gender
                        ? userData.gender.charAt(0).toUpperCase() +
                          userData.gender.slice(1)
                        : "Not specified"
                    }
                    icon={getGenderIcon(userData.gender)}
                  />
                </Space>
              </SectionCard>
            </Col>

            {/* Contact Info */}
            <Col xs={24} md={8}>
              <SectionCard
                title="Contact"
                icon={<PhoneOutlined style={{ fontSize: "14px" }} />}
              >
                <Space direction="vertical" size={4} style={{ width: "100%" }}>
                  <InfoItem
                    label="Email"
                    value={userData.email}
                    icon={<MailOutlined style={{ fontSize: "14px" }} />}
                  />
                  <InfoItem
                    label="Phone"
                    value={
                      userData.countryareacode && userData.phonenumber
                        ? `${userData.countryareacode} ${userData.phonenumber}`
                        : "N/A"
                    }
                    icon={<PhoneOutlined style={{ fontSize: "14px" }} />}
                  />
                  <InfoItem
                    label="Country Code"
                    value={userData.countryareacode}
                    icon={<IdcardOutlined style={{ fontSize: "14px" }} />}
                  />
                </Space>
              </SectionCard>
            </Col>

            {/* Account Info */}
            <Col xs={24} md={8}>
              <SectionCard
                title="Account"
                icon={<CrownOutlined style={{ fontSize: "14px" }} />}
              >
                <Space direction="vertical" size={4} style={{ width: "100%" }}>
                  <InfoItem
                    label="Role"
                    value={
                      userData.role?.charAt(0).toUpperCase() +
                      userData.role?.slice(1)
                    }
                    icon={<CrownOutlined style={{ fontSize: "14px" }} />}
                    color={getRoleColor(userData.role)}
                  />
                  <InfoItem
                    label="Status"
                    value={userData.isactive ? "Active" : "Inactive"}
                    icon={
                      userData.isactive ? (
                        <CheckCircleOutlined style={{ fontSize: "14px" }} />
                      ) : (
                        <CloseCircleOutlined style={{ fontSize: "14px" }} />
                      )
                    }
                    color={userData.isactive ? "#2e7d32" : "#d32f2f"}
                  />
                  {userData.role?.toLowerCase() === "user" && (
                    <InfoItem
                      label="Vendor"
                      value={userData.vendor ? "Yes" : "No"}
                      icon={<IdcardOutlined style={{ fontSize: "14px" }} />}
                    />
                  )}
                </Space>
              </SectionCard>
            </Col>

            {/* System Info - Full width */}
            <Col span={24}>
              <SectionCard
                title="System Information"
                icon={<ClockCircleOutlined style={{ fontSize: "14px" }} />}
              >
                <Row gutter={[16, 0]}>
                  <Col xs={12} md={6}>
                    <InfoItem
                      label="Created"
                      value={
                        userData.addeddatetime
                          ? formatDateTime(userData.addeddatetime)
                          : "N/A"
                      }
                      icon={
                        <ClockCircleOutlined style={{ fontSize: "14px" }} />
                      }
                    />
                  </Col>
                  <Col xs={12} md={6}>
                    <InfoItem
                      label="Last Login"
                      value={
                        userData.loggeddatetime
                          ? formatDateTime(userData.loggeddatetime)
                          : "N/A"
                      }
                      icon={
                        <ClockCircleOutlined style={{ fontSize: "14px" }} />
                      }
                    />
                  </Col>
                  <Col xs={12} md={6}>
                    <InfoItem
                      label="Last Modified"
                      value={
                        userData.lastmodifieddatetime
                          ? formatDateTime(userData.lastmodifieddatetime)
                          : "N/A"
                      }
                      icon={
                        <ClockCircleOutlined style={{ fontSize: "14px" }} />
                      }
                    />
                  </Col>
                  <Col xs={12} md={6}>
                    <InfoItem
                      label="Database ID"
                      value={userData.id?.toString()}
                      icon={<IdcardOutlined style={{ fontSize: "14px" }} />}
                    />
                  </Col>
                </Row>
              </SectionCard>
            </Col>
          </Row>

          <Divider style={{ margin: "16px 0" }} />
          {/* Compact Action Footer */}
          <Flex justify="space-between" align="center">
            <Button
              type="default"
              onClick={() => onEdit(userData.id || userData._id || "")}
              icon={<EditOutlined style={{ fontSize: "14px" }} />}
            >
              Edit User
            </Button>
            <Button type="default" onClick={onClose}>
              Close
            </Button>
          </Flex>
        </div>
      </div>
    </Modal>
  );
};

export default UserView;
