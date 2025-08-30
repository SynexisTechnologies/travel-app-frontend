import { useState, useEffect, useCallback } from "react";
import { roleApi, privilegesApi } from "../api/userRoleApi";

export const useRoles = () => {
  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
  });

  // Fetch roles
  const fetchRoles = useCallback(
    async (params = {}) => {
      try {
        setLoading(true);
        setError(null);

        // For development/testing - replace with actual API call
        const mockRoles = [
          {
            id: 1,
            name: "Super Admin",
            userRole: "Super Admin",
            status: "Active",
          },
          { id: 2, name: "Admin", userRole: "Admin", status: "Active" },
          { id: 3, name: "Manager", userRole: "Manager", status: "Active" },
          { id: 4, name: "User", userRole: "User", status: "Active" },
        ];

        // Uncomment this for actual API integration
        // const response = await roleApi.getAllRoles({
        //   page: pagination.page,
        //   limit: pagination.limit,
        //   ...params,
        // });

        // setRoles(response.data || response || []);
        // if (response.meta || response.pagination) {
        //   setPagination(prev => ({
        //     ...prev,
        //     total: response.meta?.total || response.pagination?.total || 0,
        //   }));
        // }

        // Mock implementation
        setRoles(mockRoles);
        setPagination((prev) => ({
          ...prev,
          total: mockRoles.length,
        }));
      } catch (err) {
        setError(err.message || "Failed to fetch roles");
        console.error("Error fetching roles:", err);
      } finally {
        setLoading(false);
      }
    },
    [pagination.page, pagination.limit]
  );

  // Create role
  const createRole = async (roleData) => {
    try {
      setLoading(true);

      // Mock implementation for testing
      const newRole = {
        id: Math.max(...roles.map((r) => r.id), 0) + 1,
        name: roleData.name,
        userRole: roleData.name,
        status: "Active",
      };

      setRoles((prev) => [...prev, newRole]);

      // Uncomment for actual API integration
      // const newRole = await roleApi.createRole(roleData);
      // await fetchRoles(); // Refresh the list

      return newRole;
    } catch (err) {
      setError(err.message || "Failed to create role");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Update role
  const updateRole = async (id, roleData) => {
    try {
      setLoading(true);

      // Mock implementation for testing
      setRoles((prev) =>
        prev.map((role) =>
          role.id === id
            ? { ...role, name: roleData.name, userRole: roleData.name }
            : role
        )
      );

      // Uncomment for actual API integration
      // const updatedRole = await roleApi.updateRole(id, roleData);
      // await fetchRoles(); // Refresh the list
      // return updatedRole;

      return { id, ...roleData };
    } catch (err) {
      setError(err.message || "Failed to update role");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Delete role
  const deleteRole = async (id) => {
    try {
      setLoading(true);

      // Mock implementation for testing
      setRoles((prev) => prev.filter((role) => role.id !== id));

      // Uncomment for actual API integration
      // await roleApi.deleteRole(id);
      // await fetchRoles(); // Refresh the list
    } catch (err) {
      setError(err.message || "Failed to delete role");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Handle table changes (pagination, sorting)
  const handleTableChange = (paginationConfig, sorter) => {
    setPagination((prev) => ({
      ...prev,
      page: paginationConfig.page,
      limit: paginationConfig.limit,
    }));

    // Fetch with new parameters
    const params = {};
    if (sorter && sorter.field && sorter.order) {
      params.sortBy = sorter.field;
      params.sortOrder = sorter.order;
    }

    fetchRoles(params);
  };

  useEffect(() => {
    fetchRoles();
  }, []); // Only run on mount

  return {
    roles,
    loading,
    error,
    pagination,
    fetchRoles,
    createRole,
    updateRole,
    deleteRole,
    handleTableChange,
  };
};

export const useRolePrivileges = () => {
  const [privileges, setPrivileges] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Get privileges for a role
  const getRolePrivileges = async (roleId) => {
    try {
      setLoading(true);
      setError(null);
      const response = await privilegesApi.getRolePrivileges(roleId);
      setPrivileges(response);
      return response;
    } catch (err) {
      setError(err.message || "Failed to fetch privileges");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Update role privileges
  const updateRolePrivileges = async (roleId, privilegesData) => {
    try {
      setLoading(true);
      const response = await privilegesApi.updateRolePrivileges(
        roleId,
        privilegesData
      );
      setPrivileges(response);
      return response;
    } catch (err) {
      setError(err.message || "Failed to update privileges");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Create role with privileges
  const createRoleWithPrivileges = async (roleData) => {
    try {
      setLoading(true);
      const response = await privilegesApi.createRoleWithPrivileges(roleData);
      return response;
    } catch (err) {
      setError(err.message || "Failed to create role with privileges");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    privileges,
    loading,
    error,
    getRolePrivileges,
    updateRolePrivileges,
    createRoleWithPrivileges,
  };
};
