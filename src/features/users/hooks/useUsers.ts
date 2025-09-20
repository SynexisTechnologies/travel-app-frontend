import { useMemo, useState, useEffect } from "react";
import { useCrud } from "@/shared/hooks";
import type { User } from "../types";
import {
  getUsers,
  registerUser,
  updateUser,
  deleteUser,
  getUserById,
} from "../api/userApi";

const ROLES = ["All", "Super Admin", "Admin", "User", "Vendor", "Contributor"];

export const useUsers = (messageApi?: any) => {
  const [selectedTab, setSelectedTab] = useState(0);
  const [filteredData, setFilteredData] = useState<User[]>([]);

  const operations = useMemo(
    () => ({
      list: async () => {
        const roleName = ROLES[selectedTab] || "All";
        const params = roleName !== "All" ? { role: roleName } : {};

        const response = await getUsers(params);
        return {
          data: response.data?.users || response.data?.data || [],
          total: response.data?.total || response.data?.pagination?.total || 0,
        };
      },
      getById: async (id: string | number) => {
        const response = await getUserById(id.toString());
        return { data: response.data?.user };
      },
      create: async (data: any) => {
        const response = await registerUser(data);
        return { data: response.data?.user || response.data };
      },
      update: async (id: string | number, data: any) => {
        const response = await updateUser(id.toString(), data);
        return { data: response.data?.user || response.data };
      },
      delete: async (id: string | number) => {
        await deleteUser(id.toString());
      },
    }),
    [selectedTab]
  );

  const crudResult = useCrud<User>({
    operations,
    entityName: "User",
    autoLoad: true,
    messageApi,
  });

  // Filter data when tab changes
  useEffect(() => {
    const roleName = ROLES[selectedTab] || "All";
    if (roleName === "All") {
      setFilteredData(crudResult.data);
    } else {
      const filtered = crudResult.data.filter((user) => {
        if (roleName === "Vendor") {
          return user.role?.toLowerCase() === "user" && user.vendor;
        } else if (roleName === "Contributor") {
          return user.role?.toLowerCase() === "user" && !user.vendor;
        }
        return user.role?.toLowerCase() === roleName.toLowerCase();
      });
      setFilteredData(filtered);
    }
  }, [crudResult.data, selectedTab]);

  // Reload data when tab changes
  useEffect(() => {
    crudResult.loadData();
  }, [selectedTab]);

  return {
    ...crudResult,
    data: filteredData,
    selectedTab,
    setSelectedTab,
    roles: ROLES,
    tabData: ROLES.map((label, index) => ({
      key: index.toString(),
      label,
      count: index === selectedTab ? filteredData.length : 0,
    })),
  };
};
