import { Result, Button } from "antd";
import { useNavigate } from "react-router";
import { useAuth } from "@/shared";

const NotFound = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  return (
    <Result
      status="404"
      title="404"
      subTitle="Sorry, the page you visited does not exist."
      extra={
        <Button
          type="primary"
          onClick={() => navigate(user ? "/dashboard" : "/login")} // Redirect to dashboard if logged in, otherwise to login page
        >
          Back Home
        </Button>
      }
    />
  );
};

export default NotFound;
