import {
  Box,
  Typography,
  Chip,
  IconButton,
  Stack,
  Tooltip,
  Button,
  Collapse,
} from "@mui/material";
import {
  Edit,
  Delete,
  ExpandMore as ExpandMoreIcon,
  ExpandLess as ExpandLessIcon,
  Dashboard as DashboardIcon,
  PersonOutline as PersonOutlineIcon,
  Build as BuildIcon,
  Map as MapIcon,
  LocalActivity as LocalActivityIcon,
  Hotel as HotelIcon,
  DirectionsCar as DirectionsCarIcon,
  PeopleOutline as PeopleOutlineIcon,
  Restaurant as RestaurantIcon,
  Event as EventIcon,
  Newspaper as NewspaperIcon,
  Campaign as CampaignIcon,
  Info as InfoIcon,
  PhotoLibrary as PhotoLibraryIcon,
  Star as StarIcon,
  ShieldOutlined as ShieldOutlinedIcon,
} from "@mui/icons-material";
import { useState } from "react";

const STATUS_COLORS = {
  Active: "success",
  Inactive: "error",
  Pending: "warning",
};

const ROLE_COLORS = {
  "Super Admin": "error",
  Admin: "warning",
  Manager: "info",
  User: "primary",
  "Content Editor": "secondary",
  Moderator: "primary",
};

const privilegeIcons = {
  dashboard: <DashboardIcon fontSize="small" />,
  master: <BuildIcon fontSize="small" />,
  manageUsers: <PersonOutlineIcon fontSize="small" />,
  managePrivileges: <ShieldOutlinedIcon fontSize="small" />,
  destination: <MapIcon fontSize="small" />,
  activity: <LocalActivityIcon fontSize="small" />,
  accommodation: <HotelIcon fontSize="small" />,
  services: <BuildIcon fontSize="small" />,
  transport: <DirectionsCarIcon fontSize="small" />,
  findGuide: <PeopleOutlineIcon fontSize="small" />,
  food: <RestaurantIcon fontSize="small" />,
  event: <EventIcon fontSize="small" />,
  news: <NewspaperIcon fontSize="small" />,
  advertisement: <CampaignIcon fontSize="small" />,
  aboutSriLanka: <InfoIcon fontSize="small" />,
  gallery: <PhotoLibraryIcon fontSize="small" />,
  topRecommendPlaces: <StarIcon fontSize="small" />,
};

const privilegeLabels = {
  dashboard: "Dashboard",
  master: "Master Data",
  manageUsers: "Manage Users",
  managePrivileges: "Manage Privileges",
  destination: "Destinations",
  activity: "Activities",
  accommodation: "Accommodation",
  services: "Services",
  transport: "Transport",
  findGuide: "Find Guide",
  food: "Food",
  event: "Events",
  news: "News",
  advertisement: "Advertisement",
  aboutSriLanka: "About Sri Lanka",
  gallery: "Gallery",
  topRecommendPlaces: "Top Places",
};

const getRoleColor = (role) => ROLE_COLORS[role] || "default";
const getStatusColor = (status) => STATUS_COLORS[status] || "default";

// Get role privileges from the role data
const getRolePrivileges = (role) => {
  const privilegeKeys = Object.keys(privilegeLabels);
  return privilegeKeys.filter((key) => role[key] === true);
};

// Expandable privileges component
const PrivilegesCell = ({ record }) => {
  const [expanded, setExpanded] = useState(false);
  const rolePrivileges = getRolePrivileges(record);

  return (
    <Box>
      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <Chip
          label={`${rolePrivileges.length} privileges`}
          color="primary"
          size="small"
          variant="outlined"
        />
        <IconButton size="small" onClick={() => setExpanded(!expanded)}>
          {expanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
        </IconButton>
      </Box>

      <Collapse in={expanded}>
        <Box sx={{ mt: 1, display: "flex", flexWrap: "wrap", gap: 0.5 }}>
          {rolePrivileges.map((privilege) => (
            <Chip
              key={privilege}
              icon={privilegeIcons[privilege]}
              label={privilegeLabels[privilege]}
              size="small"
              color="primary"
              variant="outlined"
              sx={{ fontSize: "0.75rem", height: "24px" }}
            />
          ))}
        </Box>
      </Collapse>
    </Box>
  );
};

export const getUserRolePrivilegesConfigs = (handleEdit, handleDelete) => {
  return {
    tabData: [{ label: "All Roles", count: 0 }],

    columnConfigs: [
      {
        title: "Role Name",
        dataIndex: "userRole",
        render: (userRole, record) => (
          <Box>
            <Typography variant="body2" fontWeight={500}>
              {userRole}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              ID: {record.id}
            </Typography>
          </Box>
        ),
        width: 200,
      },
      {
        title: "Privileges",
        dataIndex: "privileges",
        render: (_, record) => <PrivilegesCell record={record} />,
      },
      {
        title: "Actions",
        dataIndex: "actions",
        align: "center",
        render: (_, record) => (
          <Stack direction="row" spacing={1} justifyContent="center">
            <Tooltip title="Edit Role & Privileges">
              <IconButton
                size="small"
                onClick={() => handleEdit(record)}
                sx={{ color: "primary.main" }}
              >
                <Edit fontSize="small" />
              </IconButton>
            </Tooltip>
            <Tooltip title="Delete Role">
              <IconButton
                size="small"
                onClick={() => handleDelete(record)}
                sx={{ color: "error.main" }}
              >
                <Delete fontSize="small" />
              </IconButton>
            </Tooltip>
          </Stack>
        ),
        width: 150,
      },
    ],
  };
};
