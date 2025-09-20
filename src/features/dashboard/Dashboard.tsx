import { Card, Row, Col, Statistic, Typography, Space } from "antd";
import {
  UserOutlined,
  EnvironmentOutlined,
  StarOutlined,
  ShopOutlined,
} from "@ant-design/icons";

const { Title } = Typography;

const Dashboard = () => {
  return (
    <>
      <Row gutter={[16, 16]} style={{ marginBottom: 16 }}>
        <Col xs={24} sm={12} lg={6}>
          <Card variant="borderless">
            <Statistic
              title="Total Users"
              value={1234}
              prefix={<UserOutlined />}
              valueStyle={{ color: "#3f8600" }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card variant="borderless">
            <Statistic
              title="Destinations"
              value={89}
              prefix={<EnvironmentOutlined />}
              valueStyle={{ color: "#1890ff" }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card variant="borderless">
            <Statistic
              title="Activities"
              value={156}
              prefix={<StarOutlined />}
              valueStyle={{ color: "#722ed1" }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card variant="borderless">
            <Statistic
              title="Services"
              value={67}
              prefix={<ShopOutlined />}
              valueStyle={{ color: "#eb2f96" }}
            />
          </Card>
        </Col>
      </Row>

      <Row gutter={[16, 16]}>
        <Col xs={24} lg={16}>
          <Card
            variant="borderless"
            title="Recent Activities"
            style={{ height: 400 }}
          >
            <p>Chart or activity list would go here...</p>
          </Card>
        </Col>
        <Col xs={24} lg={8}>
          <Card
            variant="borderless"
            title="Quick Actions"
            style={{ height: 400 }}
          >
            <Space direction="vertical" style={{ width: "100%" }}>
              <Card type="inner" size="small">
                Add New Destination
              </Card>
              <Card type="inner" size="small">
                Manage Users
              </Card>
              <Card type="inner" size="small">
                View Reports
              </Card>
              <Card type="inner" size="small">
                System Settings
              </Card>
            </Space>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default Dashboard;
