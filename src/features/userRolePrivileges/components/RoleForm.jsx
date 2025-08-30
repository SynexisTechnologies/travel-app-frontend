import React, { useState, useEffect } from "react";
import {
  Box,
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
  Alert,
  Grid,
} from "@mui/material";
import {
  Save as SaveIcon,
  Clear as ClearIcon,
  Edit as EditIcon,
} from "@mui/icons-material";

const RoleForm = ({ selectedRole, onSubmit, onCancel, isEditing = false }) => {
  const [formData, setFormData] = useState({
    id: "",
    name: "",
  });
  const [errors, setErrors] = useState({});
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    if (selectedRole && isEditing) {
      setFormData({
        id: selectedRole.id || "",
        name: selectedRole.name || selectedRole.userRole || "",
      });
    } else {
      setFormData({
        id: "",
        name: "",
      });
    }
    setErrors({});
  }, [selectedRole, isEditing]);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) {
      newErrors.name = "Role name is required";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field) => (event) => {
    setFormData((prev) => ({
      ...prev,
      [field]: event.target.value,
    }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!validateForm()) return;

    try {
      await onSubmit(formData);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);

      if (!isEditing) {
        // Reset form only for new roles
        setFormData({ id: "", name: "" });
      }
    } catch (error) {
      console.error("Error submitting role:", error);
    }
  };

  const handleReset = () => {
    if (isEditing && selectedRole) {
      setFormData({
        id: selectedRole.id || "",
        name: selectedRole.name || selectedRole.userRole || "",
      });
    } else {
      setFormData({ id: "", name: "" });
    }
    setErrors({});
  };

  const handleCancel = () => {
    handleReset();
    onCancel?.();
  };

  return (
    <Card>
      <CardContent>
        <Typography variant="h6" sx={{ mb: 2, fontWeight: "bold" }}>
          {isEditing ? "Edit Role" : "Add New Role"}
        </Typography>

        {showSuccess && (
          <Alert severity="success" sx={{ mb: 2 }}>
            Role {isEditing ? "updated" : "created"} successfully!
          </Alert>
        )}

        <Box component="form" onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid size={{ sm: 12 }}>
              <TextField
                label="Role Name"
                name="name"
                value={formData.name}
                onChange={handleInputChange("name")}
                error={!!errors.name}
                helperText={errors.name}
                fullWidth
                required
                size="small"
                placeholder="Enter role name (e.g., Admin, User, Manager)"
              />
            </Grid>
          </Grid>

          <Box
            sx={{
              display: "flex",
              gap: 2,
              justifyContent: "flex-end",
              mt: 3,
            }}
          >
            <Button
              type="button"
              variant="outlined"
              startIcon={<ClearIcon />}
              onClick={isEditing ? handleCancel : handleReset}
              size="small"
            >
              {isEditing ? "Cancel" : "Reset"}
            </Button>
            <Button
              type="submit"
              variant="contained"
              startIcon={isEditing ? <EditIcon /> : <SaveIcon />}
              size="small"
              sx={{
                boxShadow: "0 3px 5px 2px rgba(0, 165, 207, .3)",
                "&:hover": {
                  background:
                    "linear-gradient(45deg, #00315C 30%, #068C6B 90%)",
                },
              }}
            >
              {isEditing ? "Update Role" : "Create Role"}
            </Button>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default RoleForm;
