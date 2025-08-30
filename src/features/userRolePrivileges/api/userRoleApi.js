import apiInstance from "@/shared/api/apiInstance";

// Role management APIs
export const roleApi = {
  // Get all roles
  getAllRoles: async (params = {}) => {
    const response = await apiInstance.get("/user-role-privileges", { params });
    return response.data;
  },

  // Get role by ID
  getRoleById: async (id) => {
    const response = await apiInstance.get(`/user-role-privileges/${id}`);
    return response.data;
  },

  // Create new role
  createRole: async (roleData) => {
    const response = await apiInstance.post("/user-role-privileges", roleData);
    return response.data;
  },

  // Update role
  updateRole: async (id, roleData) => {
    const response = await apiInstance.put(
      `/user-role-privileges/${id}`,
      roleData
    );
    return response.data;
  },

  // Delete role
  deleteRole: async (id) => {
    const response = await apiInstance.delete(`/user-role-privileges/${id}`);
    return response.data;
  },
};

// Privileges management APIs
export const privilegesApi = {
  // Get privileges for a specific role
  getRolePrivileges: async (roleId) => {
    const response = await apiInstance.get(`/user-role-privileges/${roleId}`);
    return response.data;
  },

  // Update role privileges
  updateRolePrivileges: async (roleId, privilegesData) => {
    const response = await apiInstance.put(
      `/user-role-privileges/${roleId}`,
      privilegesData
    );
    return response.data;
  },

  // Create role with privileges
  createRoleWithPrivileges: async (roleData) => {
    const response = await apiInstance.post("/user-role-privileges", roleData);
    return response.data;
  },
};

export default {
  roleApi,
  privilegesApi,
};
