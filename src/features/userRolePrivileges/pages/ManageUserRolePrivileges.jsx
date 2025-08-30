import React, { useState, useEffect } from "react";
import {
  Box,
  Tabs,
  Tab,
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Alert,
  Paper,
} from "@mui/material";
import {
  SupervisorAccount as RolesIcon,
  Security as PrivilegesIcon,
  Delete as DeleteIcon,
} from "@mui/icons-material";
import RoleTable from "../components/RoleTable";
import RoleForm from "../components/RoleForm";
import UserRolePrivilegesForm from "../components/userRolePrivilegesForm";
import { useRoles, useRolePrivileges } from "../hooks/useRoles";

const TabPanel = ({ children, value, index, ...other }) => {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`role-tabpanel-${index}`}
      aria-labelledby={`role-tab-${index}`}
      {...other}
    >
      {value === index && <Box>{children}</Box>}
    </div>
  );
};

const ManageUserRolePrivileges = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [selectedRole, setSelectedRole] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [roleToDelete, setRoleToDelete] = useState(null);
  const [privilegeMode, setPrivilegeMode] = useState("create"); // "create", "edit", "view"

  const {
    roles,
    loading,
    error,
    pagination,
    createRole,
    updateRole,
    deleteRole,
    handleTableChange,
  } = useRoles();

  const {
    privileges,
    loading: privilegesLoading,
    updateRolePrivileges,
    getRolePrivileges,
  } = useRolePrivileges();

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
    setSelectedRole(null);
    setIsEditing(false);
    setShowForm(false);
    setPrivilegeMode("create");
  };

  // Role management handlers
  const handleAddRole = () => {
    setSelectedRole(null);
    setIsEditing(false);
    setShowForm(true);
  };

  const handleEditRole = (role) => {
    setSelectedRole(role);
    setIsEditing(true);
    setShowForm(true);
  };

  const handleDeleteRole = (role) => {
    setRoleToDelete(role);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = async () => {
    try {
      await deleteRole(roleToDelete.id);
      setDeleteDialogOpen(false);
      setRoleToDelete(null);
    } catch (error) {
      console.error("Error deleting role:", error);
    }
  };

  const handleRoleSubmit = async (formData) => {
    try {
      if (isEditing) {
        await updateRole(selectedRole.id, formData);
      } else {
        await createRole(formData);
      }
      setShowForm(false);
      setSelectedRole(null);
      setIsEditing(false);
    } catch (error) {
      console.error("Error submitting role:", error);
    }
  };

  const handleRoleCancel = () => {
    setShowForm(false);
    setSelectedRole(null);
    setIsEditing(false);
  };

  // Privilege management handlers
  const handlePrivilegeSubmit = async (formData) => {
    try {
      if (formData.roleId) {
        await updateRolePrivileges(formData.roleId, formData);
      }
    } catch (error) {
      console.error("Error updating privileges:", error);
    }
  };

  const handleRoleSelectForPrivileges = async (role) => {
    try {
      setSelectedRole(role);
      setPrivilegeMode("edit");
      // Optionally load existing privileges
      // await getRolePrivileges(role.id);
    } catch (error) {
      console.error("Error loading role privileges:", error);
    }
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Paper sx={{ mb: 2 }}>
        <Tabs
          value={activeTab}
          onChange={handleTabChange}
          aria-label="role management tabs"
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
        >
          <Tab
            icon={<RolesIcon />}
            label="Manage Roles"
            id="role-tab-0"
            aria-controls="role-tabpanel-0"
            iconPosition="start"
          />
          <Tab
            icon={<PrivilegesIcon />}
            label="Role Privileges"
            id="role-tab-1"
            aria-controls="role-tabpanel-1"
            iconPosition="start"
          />
        </Tabs>
      </Paper>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      {/* Tab 1: Role Management */}
      <TabPanel value={activeTab} index={0}>
        <Grid container spacing={2}>
          <Grid size={{ sm: 12, md: 8 }}>
            <RoleTable
              roles={roles}
              loading={loading}
              onEdit={handleEditRole}
              onDelete={handleDeleteRole}
              onAdd={handleAddRole}
              pagination={pagination}
              onChange={handleTableChange}
            />
          </Grid>
          <Grid size={{ sm: 12, md: 4 }}>
            {showForm && (
              <RoleForm
                selectedRole={selectedRole}
                onSubmit={handleRoleSubmit}
                onCancel={handleRoleCancel}
                isEditing={isEditing}
              />
            )}
            {!showForm && (
              <Box
                sx={{
                  height: 300,
                  border: "2px dashed",
                  borderColor: "grey.300",
                  borderRadius: 2,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexDirection: "column",
                  gap: 2,
                  backgroundColor: "background.paper",
                }}
              >
                <RolesIcon sx={{ fontSize: 48, color: "grey.400" }} />
                <Typography color="text.secondary" textAlign="center">
                  Select a role to edit or click "Add New Role" to create one
                </Typography>
              </Box>
            )}
          </Grid>
        </Grid>
      </TabPanel>

      {/* Tab 2: Role Privileges */}
      <TabPanel value={activeTab} index={1}>
        <UserRolePrivilegesForm
          selectedRole={selectedRole}
          roles={roles}
          onSubmit={handlePrivilegeSubmit}
          mode={privilegeMode}
        />
      </TabPanel>

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <DeleteIcon color="error" />
            Confirm Delete
          </Box>
        </DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete the role "
            <strong>{roleToDelete?.name || roleToDelete?.userRole}</strong>"?
            This action cannot be undone.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setDeleteDialogOpen(false)}
            color="primary"
            variant="outlined"
          >
            Cancel
          </Button>
          <Button
            onClick={confirmDelete}
            color="error"
            variant="contained"
            startIcon={<DeleteIcon />}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ManageUserRolePrivileges;
