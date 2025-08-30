import { useState, useEffect } from "react";
import {
  Box,
  Card,
  CardContent,
  FormControlLabel,
  Checkbox,
  Button,
  IconButton,
  Grid,
  Typography,
  Divider,
  Alert,
  Select,
  MenuItem,
  FormControl,
} from "@mui/material";
import {
  Save as SaveIcon,
  Clear as ClearIcon,
  Build as BuildIcon,
  Map as MapIcon,
  LocalActivity as LocalActivityIcon,
  Hotel as HotelIcon,
  DirectionsCar as DirectionsCarIcon,
  PeopleOutline as PeopleOutlineIcon,
  Restaurant as RestaurantIcon,
  Event as EventIcon,
  PersonAdd as PlusIcon,
} from "@mui/icons-material";

const UserRolePrivilegesForm = ({
  selectedRole = null,
  users = [],
  onSubmit,
  mode = "create", // "create", "edit", "view"
}) => {
  const [formData, setFormData] = useState({
    userId: "",
    destination: false,
    activity: false,
    accommodation: false,
    services: false,
    transport: false,
    findGuide: false,
    food: false,
    event: false,
  });

  const [showSuccess, setShowSuccess] = useState(false);

  // Load data when selectedRole changes
  useEffect(() => {
    if (selectedRole && (mode === "edit" || mode === "view")) {
      setFormData({
        userId: selectedRole.id || "",
        destination: selectedRole.destination || false,
        activity: selectedRole.activity || false,
        accommodation: selectedRole.accommodation || false,
        services: selectedRole.services || false,
        transport: selectedRole.transport || false,
        findGuide: selectedRole.findGuide || false,
        food: selectedRole.food || false,
        event: selectedRole.event || false,
      });
    } else if (mode === "create") {
      // Reset form for create mode
      setFormData({
        userId: "",
        destination: false,
        activity: false,
        accommodation: false,
        services: false,
        transport: false,
        findGuide: false,
        food: false,
        event: false,
      });
    }
  }, [selectedRole, mode]);

  const privilegeCategories = [
    // {
    //   title: "Super Admin Features",
    //   items: [
    //     { key: "dashboard", label: "Dashboard", icon: <DashboardIcon /> },
    //     {
    //       key: "manageUsers",
    //       label: "Manage Users",
    //       icon: <PersonOutlineIcon />,
    //     },
    //     {
    //       key: "managePrivileges",
    //       label: "Manage Privileges",
    //       icon: <ShieldOutlinedIcon />,
    //     },
    //     { key: "master", label: "Master Data", icon: <BuildIcon /> },
    //   ],
    // },
    {
      title: "Features",
      items: [
        { key: "destination", label: "Destinations", icon: <MapIcon /> },
        { key: "activity", label: "Activities", icon: <LocalActivityIcon /> },
        { key: "accommodation", label: "Accommodation", icon: <HotelIcon /> },
        { key: "services", label: "Services", icon: <BuildIcon /> },
        { key: "transport", label: "Transport", icon: <DirectionsCarIcon /> },
        { key: "findGuide", label: "Find Guide", icon: <PeopleOutlineIcon /> },
        { key: "food", label: "Food", icon: <RestaurantIcon /> },
        { key: "event", label: "Event", icon: <EventIcon /> },
      ],
    },
    // {
    //   title: "Common Features",
    //   items: [
    //     { key: "news", label: "News", icon: <NewspaperIcon /> },
    //     {
    //       key: "advertisement",
    //       label: "Advertisement",
    //       icon: <CampaignIcon />,
    //     },
    //     { key: "aboutSriLanka", label: "About SriLanka", icon: <InfoIcon /> },
    //     { key: "gallery", label: "Gallery", icon: <PhotoLibraryIcon /> },
    //     {
    //       key: "topRecommendPlaces",
    //       label: "Recommend Places",
    //       icon: <StarIcon />,
    //     },
    //   ],
    // },
  ];

  const handleUserChange = (event) => {
    const selectedUserId = event.target.value;

    setFormData((prev) => ({
      ...prev,
      userId: selectedUserId,
    }));
  };

  const handlePrivilegeChange = (privilege) => (event) => {
    setFormData((prev) => ({
      ...prev,
      [privilege]: event.target.checked,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await onSubmit?.(formData);
      console.log("Form submitted:", formData);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  const handleReset = () => {
    if (selectedRole) {
      // Reset to original values
      setFormData({
        userId: selectedRole.id || "",
        destination: selectedRole.destination || false,
        activity: selectedRole.activity || false,
        accommodation: selectedRole.accommodation || false,
        services: selectedRole.services || false,
        transport: selectedRole.transport || false,
        findGuide: selectedRole.findGuide || false,
        food: selectedRole.food || false,
        event: selectedRole.event || false,
      });
    } else {
      setFormData({
        userId: "",
        destination: false,
        activity: false,
        accommodation: false,
        services: false,
        transport: false,
        findGuide: false,
        food: false,
        event: false,
      });
    }
  };

  return (
    <Box>
      <Card>
        <CardContent>
          {showSuccess && (
            <Alert severity="success" sx={{ mb: 3 }}>
              User role privileges saved successfully!
            </Alert>
          )}

          <Box component="div" onSubmit={handleSubmit}>
            {/* User Role Selection */}
            <Typography
              variant="h6"
              sx={{
                fontWeight: "bold",
                fontSize: "1rem",
                mb: 2,
                color: "primary.main",
              }}
            >
              Select User
            </Typography>
            <Box sx={{ mb: 2, display: "flex", gap: 1, alignItems: "center" }}>
              <FormControl size="small" sx={{ flexGrow: 1 }}>
                {/* <InputLabel>Select Role</InputLabel> */}
                <Select
                  value={formData.userId}
                  onChange={handleUserChange}
                  label={null}
                  displayEmpty
                >
                  <MenuItem value="" disabled>
                    <em>Select a user</em>
                  </MenuItem>
                  {users.map((user) => (
                    <MenuItem key={user.id} value={user.id}>
                      {user.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <IconButton
                color="primary"
                size="small"
                sx={{
                  border: "1px solid",
                  borderColor: "primary.main",
                  "&:hover": {
                    backgroundColor: "primary.main",
                    color: "white",
                  },
                }}
                title="Add new users"
              >
                <PlusIcon />
              </IconButton>
            </Box>

            {/* Privileges Categories */}
            {privilegeCategories.map((category) => (
              <Box key={category.title}>
                <Box>
                  <Divider textAlign="left" sx={{ color: "primary.main" }}>
                    <Typography
                      variant="h6"
                      sx={{ fontWeight: "bold", fontSize: "1rem" }}
                    >
                      {category.title}
                    </Typography>
                  </Divider>
                </Box>
                <Box sx={{ py: 2 }}>
                  <Grid container spacing={2}>
                    {category.items.map((item) => (
                      <Grid size={{ xs: 12, lg: 2.4, md: 4 }} key={item.key}>
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={formData[item.key]}
                              onChange={handlePrivilegeChange(item.key)}
                              color="primary"
                            />
                          }
                          label={
                            <Box
                              sx={{
                                display: "flex",
                                alignItems: "center",
                                gap: 1,
                                cursor: "pointer",
                                flexWrap: "wrap",
                              }}
                            >
                              {item.icon}
                              <Typography variant="body2">
                                {item.label}
                              </Typography>
                            </Box>
                          }
                          sx={{
                            border: "1px solid",
                            borderColor: "divider",
                            borderRadius: 1,
                            p: 1,
                            m: 0,
                            width: "100%",
                            transition: "all 0.2s ease-in-out",
                            "&:hover": {
                              backgroundColor: "action.hover",
                              borderColor: "primary.main",
                              transform: "translateY(-2px)",
                            },
                          }}
                        />
                      </Grid>
                    ))}
                  </Grid>
                </Box>
              </Box>
            ))}
            <Divider sx={{ mt: 1 }} />

            {/* Action Buttons */}
            <Box
              sx={{
                display: "flex",
                gap: 2,
                justifyContent: "flex-end",
                mt: 2,
              }}
            >
              <Button
                type="button"
                variant="outlined"
                startIcon={<ClearIcon />}
                onClick={handleReset}
                size="small"
              >
                Reset
              </Button>
              <Button
                onClick={handleSubmit}
                variant="contained"
                startIcon={<SaveIcon />}
                size="small"
                disabled={!formData.userId}
                sx={{
                  boxShadow: "0 3px 5px 2px rgba(0, 165, 207, .3)",
                  "&:hover": {
                    background:
                      "linear-gradient(45deg, #00315C 30%, #068C6B 90%)",
                  },
                }}
              >
                Save Privileges
              </Button>
            </Box>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default UserRolePrivilegesForm;
