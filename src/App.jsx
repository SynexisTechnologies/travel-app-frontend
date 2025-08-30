import { ConfigProvider } from "antd";
import { BrowserRouter as Router } from "react-router";
import { AppRoutes } from "@/routes";

import "./App.css";
import { useTheme } from "@/shared";

const App = () => {
  const { theme } = useTheme();
  return (
    <ConfigProvider theme={theme}>
      <Router>
        <AppRoutes />
      </Router>
    </ConfigProvider>
  );
};

export default App;
