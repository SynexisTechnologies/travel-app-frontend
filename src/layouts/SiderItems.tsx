import {
  DashboardOutlined,
  UserOutlined,
  ToolOutlined,
  EnvironmentOutlined,
  CarOutlined,
  TeamOutlined,
  CalendarOutlined,
  InfoCircleOutlined,
  PictureOutlined,
  StarOutlined,
  SettingOutlined,
  ShopOutlined,
  HomeOutlined,
  NotificationOutlined,
  FileTextOutlined,
  SoundOutlined,
} from "@ant-design/icons";

// Menu structure
export const menuItems = [
  {
    key: "super-admin",
    title: "Super Admin Features",
    items: [
      {
        key: "dashboard",
        label: "Dashboard",
        icon: <DashboardOutlined />,
        path: "/dashboard",
      },
      {
        key: "users",
        label: "Manage Users",
        icon: <UserOutlined />,
        path: "/users",
      },
      // {
      //   key: "privileges",
      //   label: "Role Management",
      //   icon: <ShieldOutlined />,
      //   path: "/privileges",
      // },
      {
        key: "master-data",
        label: "Master Data",
        icon: <ToolOutlined />,
        path: "/master-data",
      },
    ],
  },
  {
    key: "basic-features",
    title: "Basic Features",
    items: [
      {
        key: "destinations",
        label: "Destinations",
        icon: <EnvironmentOutlined />,
        path: "/destinations",
      },
      {
        key: "activities",
        label: "Activities",
        icon: <StarOutlined />,
        path: "/activities",
      },
      {
        key: "accommodation",
        label: "Accommodation",
        icon: <HomeOutlined />,
        path: "/accommodation",
      },
      {
        key: "services",
        label: "Services",
        icon: <ToolOutlined />,
        path: "/services",
      },
      {
        key: "transport",
        label: "Transport",
        icon: <CarOutlined />,
        path: "/transport",
      },
      {
        key: "guides",
        label: "Find Guide",
        icon: <TeamOutlined />,
        path: "/guides",
      },
      {
        key: "food",
        label: "Food",
        icon: <ShopOutlined />,
        path: "/food",
      },
      {
        key: "events",
        label: "Event",
        icon: <CalendarOutlined />,
        path: "/events",
      },
    ],
  },
  {
    key: "common-features",
    title: "Common Features",
    items: [
      {
        key: "news",
        label: "News",
        icon: <FileTextOutlined />,
        path: "/news",
      },
      {
        key: "ads",
        label: "Advertisement",
        icon: <SoundOutlined />,
        path: "/ads",
      },
      {
        key: "about-srilanka",
        label: "About SriLanka",
        icon: <InfoCircleOutlined />,
        path: "/about-srilanka",
      },
      {
        key: "gallery",
        label: "Gallery",
        icon: <PictureOutlined />,
        path: "/gallery",
      },
      {
        key: "top-places",
        label: "Top Recommend Places",
        icon: <StarOutlined />,
        path: "/top-places",
      },
      // { key: "settings", label: "Settings", icon: <SettingOutlined />, path: "/settings" },
      // { key: "profile", label: "Profile", icon: <UserOutlined />, path: "/profile" },
    ],
  },
];
