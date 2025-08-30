import {
  Button,
  Row,
  Col,
  Space,
  Typography,
  Checkbox,
  Alert,
  Flex,
} from "antd";
import { InfoCircleOutlined } from "@ant-design/icons";

const { Text } = Typography;

const PrivilegesStep = ({
  isAdminRole,
  privileges,
  setPrivileges,
  role,
  getDefaultPrivileges,
  handlePrivilegeChange,
}) => {
  const privilegeOptions = [
    { key: "destination", label: "Destination" },
    { key: "activity", label: "Activity" },
    { key: "accommodation", label: "Accommodation" },
    { key: "services", label: "Services" },
    { key: "transport", label: "Transport" },
    { key: "findGuide", label: "Find Guide" },
    { key: "food", label: "Food" },
    { key: "event", label: "Event" },
  ];

  const getAlertDescription = (role) => {
    switch (role) {
      case "super admin":
        return "Super Admin has full control over all privileges. No need to customize. You can update the user details.";
      case "admin":
        return "Select privileges for the admin user.";
      default:
        return "User has no custom privileges. You can update the user details.";
    }
  };

  return (
    <>
      {!isAdminRole && (
        <Alert
          message="Privilege Management Restricted"
          description={getAlertDescription(role)}
          type="info"
          icon={<InfoCircleOutlined />}
          style={{ marginBottom: 16 }}
          showIcon
        />
      )}

      {isAdminRole && (
        <>
          <Text type="secondary" style={{ marginBottom: 16, display: "block" }}>
            Select the specific privileges that this admin user should have
            access to:
          </Text>

          <Flex justify="end" style={{ marginBottom: 16 }}>
            <Space>
              <Button
                size="small"
                onClick={() =>
                  setPrivileges(getDefaultPrivileges("super admin"))
                }
              >
                Select All
              </Button>
              <Button
                size="small"
                onClick={() => setPrivileges(getDefaultPrivileges(""))}
              >
                Clear All
              </Button>
            </Space>
          </Flex>

          <Row gutter={[16, 16]}>
            {privilegeOptions.map((privilege) => (
              <Col xs={24} sm={12} md={8} key={privilege.key}>
                <Checkbox
                  checked={privileges[privilege.key]}
                  onChange={(e) =>
                    handlePrivilegeChange(privilege.key, e.target.checked)
                  }
                >
                  {privilege.label}
                </Checkbox>
              </Col>
            ))}
          </Row>
        </>
      )}
    </>
  );
};
export default PrivilegesStep;
