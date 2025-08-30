import { useCallback, useState, useMemo } from "react";
import { Button, Tabs, message } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import {
  DestinationCategory,
  DestinationTravelType,
  DestinationTransportMethod,
  DestinationCategoryForm,
  DestinationTravelTypeForm,
  DestinationTransportMethodForm,
} from "./components";
import {
  useDestinationCategories,
  useDestinationTravelTypes,
  useDestinationTransportMethods,
} from "./hooks";
import { DeleteConfirmModal, useDeleteConfirm } from "@/shared";

const DestinationTabContent = () => {
  const [activeTab, setActiveTab] = useState("0");
  const [formState, setFormState] = useState({
    open: false,
    isEditing: false,
    selectedItem: null,
    formType: null, // 'category', 'travelType', 'transportMethod'
  });
  const [messageApi, contextHolder] = message.useMessage();

  // Only initialize the hooks for the active tab to improve performance
  const categoryHooks = useDestinationCategories({
    messageApi,
    autoLoad: activeTab === "0",
  });

  const travelTypeHooks = useDestinationTravelTypes({
    messageApi,
    autoLoad: activeTab === "1",
  });

  const transportMethodHooks = useDestinationTransportMethods({
    messageApi,
    autoLoad: activeTab === "2",
  });

  // Delete confirmation modal
  const { deleteModal, openDeleteModal, closeDeleteModal, confirmDelete } =
    useDeleteConfirm(async (item) => {
      const { type } = item;
      switch (type) {
        case "category":
          await categoryHooks.deleteCategory(item.id);
          break;
        case "travelType":
          await travelTypeHooks.deleteTravelType(item.id);
          break;
        case "transportMethod":
          await transportMethodHooks.deleteTransportMethod(item.id);
          break;
      }
    });

  const handleTabChange = useCallback((newValue) => {
    setActiveTab(newValue);
    handleFormClose();
  }, []);

  const handleFormOpen = useCallback(
    (isEditing, selectedItem = null, formType = null) => {
      let inferredFormType = formType;
      if (!inferredFormType) {
        // Infer form type from active tab if not provided
        const typeMap = {
          0: "category",
          1: "travelType",
          2: "transportMethod",
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
          case "travelType":
            selectedItem = await travelTypeHooks.loadSingleTravelType(id);
            break;
          case "transportMethod":
            selectedItem = await transportMethodHooks.loadSingleTransportMethod(
              id
            );
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
      travelTypeHooks.loadSingleTravelType,
      transportMethodHooks.loadSingleTransportMethod,
      handleFormOpen,
    ]
  );

  const handleDelete = useCallback(
    (item, type) => {
      const typeConfigs = {
        category: {
          itemType: "destination category",
          itemName: item.name || item.categoryname,
          title: "Delete Destination Category",
        },
        travelType: {
          itemType: "travel type",
          itemName: item.name || item.traveltypename,
          title: "Delete Travel Type",
        },
        transportMethod: {
          itemType: "transport method",
          itemName: item.name || item.transportmethodname,
          title: "Delete Transport Method",
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
          <DestinationCategory
            categories={categoryHooks.categories}
            loading={categoryHooks.loading}
            onEdit={(id) => handleEdit(id, "category")}
            onDelete={(item) => handleDelete(item, "category")}
            onFormOpen={() => handleFormOpen(false, null, "category")}
          />
        );
      case "1":
        return (
          <DestinationTravelType
            travelTypes={travelTypeHooks.travelTypes}
            loading={travelTypeHooks.loading}
            onEdit={(id) => handleEdit(id, "travelType")}
            onDelete={(item) => handleDelete(item, "travelType")}
            onFormOpen={() => handleFormOpen(false, null, "travelType")}
          />
        );
      case "2":
        return (
          <DestinationTransportMethod
            transportMethods={transportMethodHooks.transportMethods}
            loading={transportMethodHooks.loading}
            onEdit={(id) => handleEdit(id, "transportMethod")}
            onDelete={(item) => handleDelete(item, "transportMethod")}
            onFormOpen={() => handleFormOpen(false, null, "transportMethod")}
          />
        );
      default:
        return null;
    }
  }, [
    activeTab,
    categoryHooks,
    travelTypeHooks,
    transportMethodHooks,
    handleEdit,
    handleDelete,
    handleFormOpen,
  ]);

  // Simplified tab items structure - just labels, content rendered separately
  const tabItems = useMemo(
    () => [
      {
        key: "0",
        label: "Destination Category",
        children: null, // Content rendered separately for better performance
      },
      {
        key: "1",
        label: "Travel Type",
        children: null,
      },
      {
        key: "2",
        label: "Transport Method",
        children: null,
      },
    ],
    []
  );

  const getLabel = useCallback((key) => {
    const tabsLabels = {
      0: "Destination Category",
      1: "Travel Type",
      2: "Transport Method",
    };
    return tabsLabels[key] || "";
  }, []);

  const renderActiveForm = useMemo(() => {
    const { formType, open, isEditing, selectedItem } = formState;

    if (!open) return null;

    switch (formType) {
      case "category":
        return (
          <DestinationCategoryForm
            open={open}
            handleClose={handleFormClose}
            isEditing={isEditing}
            selectedItem={selectedItem}
            addCategory={categoryHooks.createCategory}
            updateCategory={categoryHooks.updateCategory}
          />
        );
      case "travelType":
        return (
          <DestinationTravelTypeForm
            open={open}
            handleClose={handleFormClose}
            isEditing={isEditing}
            selectedItem={selectedItem}
            addTravelType={travelTypeHooks.createTravelType}
            updateTravelType={travelTypeHooks.updateTravelType}
          />
        );
      case "transportMethod":
        return (
          <DestinationTransportMethodForm
            open={open}
            handleClose={handleFormClose}
            isEditing={isEditing}
            selectedItem={selectedItem}
            addTransportMethod={transportMethodHooks.createTransportMethod}
            updateTransportMethod={transportMethodHooks.updateTransportMethod}
          />
        );
      default:
        return null;
    }
  }, [
    formState,
    categoryHooks,
    travelTypeHooks,
    transportMethodHooks,
    handleFormClose,
  ]);

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
      <div>{getActiveTabContent}</div>
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

export default DestinationTabContent;
