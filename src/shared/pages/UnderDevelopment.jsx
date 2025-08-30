import { Typography, Card, Space } from "antd";
import UnderDevelopmentImg from "../assets/under-development.svg";

const { Title, Text } = Typography;

const UnderDevelopment = () => {
  return (
    <>
      <Card
        variant="borderless"
        style={{
          // padding: "24px",
          textAlign: "center",
        }}
      >
        <Space direction="vertical" size="large" style={{ width: "100%" }}>
          <img
            src={UnderDevelopmentImg}
            alt="Under Development"
            style={{
              maxWidth: "100%",
              height: "auto",
              maxHeight: "300px",
              margin: "0 auto",
              display: "block",
            }}
          />

          <Title
            level={1}
            type="primary"
            style={{ fontWeight: "bold", margin: 0 }}
          >
            Under Development
          </Title>

          <Text>
            This feature is currently being developed and will be available
            soon.
          </Text>
        </Space>
      </Card>
    </>
  );
};

export default UnderDevelopment;
