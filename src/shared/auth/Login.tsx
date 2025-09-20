import React, { useState } from "react";
import { useNavigate } from "react-router";
import { Form, Input, Button, Card, Typography, Alert, Space } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { useAuth } from "../contexts/AuthContext";
import LoginBg from "../assets/loginbg.jpg";
import { LoginFormValues } from "@/types";

const { Title, Text } = Typography;

const Login: React.FC = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (values: LoginFormValues): Promise<void> => {
    setLoading(true);
    setError("");

    const result = await login(values.email, values.password);
    if (result.success) {
      navigate("/dashboard");
    } else {
      setError(result.error || "Login failed");
    }

    setLoading(false);
  };

  const containerStyle: React.CSSProperties = {
    minHeight: "100vh",
    backgroundImage: `url(${LoginBg})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: "0 32px",
    position: "relative",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  };

  const overlayStyle: React.CSSProperties = {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.3)",
    zIndex: 1,
  };

  const welcomeTextStyle: React.CSSProperties = {
    position: "absolute",
    left: "4rem",
    top: "50%",
    transform: "translateY(-50%)",
    zIndex: 2,
    color: "white",
    maxWidth: "500px",
  };

  const cardStyle = {
    zIndex: 2,
    width: "100%",
    maxWidth: "420px",
    marginRight: "32px",
    backdropFilter: "blur(10px)",
    borderRadius: "8px",
  };

  const loginButtonStyle = {
    width: "100%",
    height: "48px",
    fontSize: "16px",
    fontWeight: 600,
    borderRadius: "6px",
    transition: "all 0.3s ease",
  };

  const registerButtonStyle = {
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    border: "none",
    color: "#fff",
    padding: "8px 32px",
    height: "40px",
    borderRadius: "4px",
    fontWeight: 600,
    boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
    transition: "all 0.3s ease",
  };

  return (
    <div style={containerStyle}>
      {/* Overlay */}
      <div style={overlayStyle} />

      {/* Left Welcome Text */}
      <div style={welcomeTextStyle}>
        <Title
          level={1}
          style={{
            fontSize: "3.5rem",
            fontWeight: 700,
            margin: "0 0 16px 0",
            textShadow: "2px 2px 8px rgba(0,0,0,0.7)",
            lineHeight: 1.1,
            color: "white",
          }}
        >
          Welcome to Your Journey
        </Title>
        <Text
          style={{
            fontSize: "1.3rem",
            opacity: 0.95,
            textShadow: "1px 1px 4px rgba(0,0,0,0.7)",
            lineHeight: 1.4,
            color: "white",
            display: "block",
          }}
        >
          Discover amazing destinations and plan unforgettable adventures with
          us
        </Text>
      </div>

      {/* Login Card */}
      <Card style={cardStyle} styles={{ body: { padding: "32px" } }}>
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "24px" }}>
          <Title level={2} style={{ fontWeight: 700, marginBottom: "8px" }}>
            Sign In
          </Title>
          <Text type="secondary">Welcome back! Please enter your details</Text>
        </div>

        {error && (
          <Alert
            message={error}
            type="error"
            showIcon
            style={{ marginBottom: "16px" }}
          />
        )}

        {/* Form */}
        <Form
          form={form}
          name="login"
          onFinish={handleSubmit}
          layout="vertical"
          size="large"
        >
          <Form.Item
            label="Email Address"
            name="email"
            rules={[
              {
                required: true,
                message: "Please input your email!",
              },
              {
                type: "email",
                message: "Please enter a valid email!",
              },
            ]}
          >
            <Input
              prefix={<UserOutlined />}
              placeholder="Enter your email"
              autoComplete="email"
            />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
            ]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="Enter your password"
              autoComplete="current-password"
            />
          </Form.Item>

          <Form.Item style={{ marginBottom: "16px", marginTop: "24px" }}>
            <Button
              type="primary"
              htmlType="submit"
              loading={loading}
              style={loginButtonStyle}
            >
              {loading ? "Signing in..." : "Sign In"}
            </Button>
          </Form.Item>
        </Form>

        {/* Bottom Text */}
        <div style={{ textAlign: "center", marginTop: "16px" }}>
          <Space direction="vertical" size="small">
            <Text type="secondary">Don't have an account?</Text>
            <Button
              onClick={() => navigate("/register")}
              disabled
              style={registerButtonStyle}
              onMouseEnter={(e: React.MouseEvent<HTMLButtonElement>) => {
                const target = e.target as HTMLButtonElement;
                target.style.boxShadow = "0 6px 16px rgba(0,0,0,0.2)";
                target.style.transform = "translateY(-2px)";
              }}
              onMouseLeave={(e: React.MouseEvent<HTMLButtonElement>) => {
                const target = e.target as HTMLButtonElement;
                target.style.boxShadow = "0 4px 12px rgba(0,0,0,0.15)";
                target.style.transform = "translateY(0)";
              }}
            >
              Create New Account
            </Button>
          </Space>
        </div>
      </Card>
    </div>
  );
};

export default Login;
