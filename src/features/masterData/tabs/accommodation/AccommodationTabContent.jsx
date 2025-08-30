import { useState, useCallback, useMemo } from "react";
import { Button, message, Tabs } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import {
  AccommodationCategory,
  AccommodationFacility,
  AccommodationCategoryForm,
  AccommodationFacilityForm,
} from "./components";
import {
  useAccommodationCategories,
  useAccommodationFacilities,
} from "./hooks";
import { DeleteConfirmModal, useDeleteConfirm } from "@/shared";

const AccommodationTabContent = () => {
  const [activeTab, setActiveTab] = useState("0");
  const [formState, setFormState] = useState({
    open: false,
    isEditing: false,
    selectedItem: null,
    formType: null, // 'category', 'facility'
  });

  const [messageApi, contextHolder] = message.useMessage();

  // Only load data for the active tab to improve performance
  const categoryHooks = useAccommodationCategories({
    messageApi,
    autoLoad: activeTab === "0",
  });

  const facilityHooks = useAccommodationFacilities({
    messageApi,
    autoLoad: activeTab === "1",
  });

  // Delete confirmation modal
  const { deleteModal, openDeleteModal, closeDeleteModal, confirmDelete } =
    useDeleteConfirm(async (item) => {
      const { type } = item;
      switch (type) {
        case "category":
          await categoryHooks.deleteCategory(item.id);
          break;
        case "facility":
          await facilityHooks.deleteFacility(item.id);
          break;
      }
    });

  const handleTabChange = useCallback((newValue) => {
    setActiveTab(newValue);
    // Close any open forms when switching tabs
    handleFormClose();
  }, []);

  const handleFormOpen = useCallback(
    (isEditing, selectedItem = null, formType = null) => {
      let inferredFormType = formType;
      if (!inferredFormType) {
        // Infer form type from active tab if not provided
        const typeMap = {
          0: "category",
          1: "facility",
        };
        inferredFormType = typeMap[activeTab];
      }

      setFormState({
        open: true,
        isEditing,
        selectedItem,
        formType: inferredFormType,
      });
    },
    [activeTab]
  );

  const handleFormClose = useCallback(() => {
    setFormState({
      open: false,
      isEditing: false,
      selectedItem: null,
      formType: null,
    });
  }, []);

  const handleEdit = useCallback(
    async (id, type) => {
      try {
        let selectedItem;
        switch (type) {
          case "category":
            selectedItem = await categoryHooks.loadSingleCategory(id);
            break;
          case "facility":
            selectedItem = await facilityHooks.loadSingleFacility(id);
            break;
          default:
            return;
        }
        handleFormOpen(true, selectedItem, type);
      } catch (error) {
        console.error("Failed to load item for editing:", error);
      }
    },
    [
      categoryHooks.loadSingleCategory,
      facilityHooks.loadSingleFacility,
      handleFormOpen,
    ]
  );

  const handleDelete = useCallback(
    (item, type) => {
      const typeConfigs = {
        category: {
          itemType: "accommodation category",
          itemName: item.name || item.categoryname,
          title: "Delete Accommodation Category",
        },
        facility: {
          itemType: "accommodation facility",
          itemName: item.name || item.facilityname,
          title: "Delete Accommodation Facility",
        },
      };

      const config = typeConfigs[type];
      openDeleteModal(
        { ...item, type },
        {
          ...config,
          message: `Are you sure you want to delete this ${config.itemType}? This action cannot be undone and may affect related data.`,
        }
      );
    },
    [openDeleteModal]
  );

  // Render only the active tab content to avoid unnecessary re-renders
  const getActiveTabContent = useMemo(() => {
    switch (activeTab) {
      case "0":
        return (
          <AccommodationCategory
            categories={categoryHooks.categories}
            loading={categoryHooks.loading}
            onEdit={(id) => handleEdit(id, "category")}
            onDelete={(item) => handleDelete(item, "category")}
            onFormOpen={() => handleFormOpen(false, null, "category")}
          />
        );
      case "1":
        return (
          <AccommodationFacility
            facilities={facilityHooks.facilities}
            loading={facilityHooks.loading}
            onEdit={(id) => handleEdit(id, "facility")}
            onDelete={(item) => handleDelete(item, "facility")}
            onFormOpen={() => handleFormOpen(false, null, "facility")}
          />
        );
      default:
        return null;
    }
  }, [
    activeTab,
    categoryHooks,
    facilityHooks,
    handleEdit,
    handleDelete,
    handleFormOpen,
  ]);

  // Simplified tab items - content rendered separately
  const tabItems = useMemo(
    () => [
      {
        key: "0",
        label: "Category",
        children: null, // Content rendered separately for better performance
      },
      {
        key: "1",
        label: "Facility",
        children: null,
      },
    ],
    []
  );

  const getLabel = useCallback((key) => {
    const tabsLabels = {
      0: "Category",
      1: "Facility",
    };
    return tabsLabels[key] || "";
  }, []);

  const renderActiveForm = useMemo(() => {
    const { formType, open, isEditing, selectedItem } = formState;

    if (!open) return null;

    switch (formType) {
      case "category":
        return (
          <AccommodationCategoryForm
            open={open}
            handleClose={handleFormClose}
            isEditing={isEditing}
            selectedItem={selectedItem}
            addCategory={categoryHooks.createCategory}
            updateCategory={categoryHooks.updateCategory}
          />
        );
      case "facility":
        return (
          <AccommodationFacilityForm
            open={open}
            handleClose={handleFormClose}
            isEditing={isEditing}
            selectedItem={selectedItem}
            addFacility={facilityHooks.createFacility}
            updateFacility={facilityHooks.updateFacility}
          />
        );
      default:
        return null;
    }
  }, [formState, categoryHooks, facilityHooks, handleFormClose]);

  return (
    <>
      {contextHolder}
      <Tabs
        activeKey={activeTab}
        onChange={handleTabChange}
        items={tabItems}
        type="line"
        size="middle"
        tabBarStyle={{
          padding: "0 16px",
          margin: 0,
        }}
        tabBarExtraContent={{
          right: (
            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={() => handleFormOpen(false)}
              style={{
                background: "linear-gradient(135deg, #00A5CF 0%, #00315C 100%)",
                border: "none",
              }}
            >
              Add {getLabel(activeTab)}
            </Button>
          ),
        }}
      />
      {/* Render active tab content separately for better performance */}
      <div style={{ marginTop: "16px" }}>{getActiveTabContent}</div>
      {renderActiveForm}

      {/* Delete Confirmation Modal */}
      <DeleteConfirmModal
        open={deleteModal.open}
        onClose={closeDeleteModal}
        onConfirm={confirmDelete}
        title={deleteModal.title}
        message={deleteModal.message}
        itemName={deleteModal.itemName}
        itemType={deleteModal.itemType}
        loading={deleteModal.loading}
      />
    </>
  );
};

export default AccommodationTabContent;
