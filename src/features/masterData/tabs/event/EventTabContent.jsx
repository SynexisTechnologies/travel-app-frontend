import { useState } from "react";
import { Space, Button, Row, Col, Table } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useEventCategories } from "./hooks";
import { EventCategoryForm } from "./components";
import { eventCategoryColumns } from "./config/eventTabConfig";
import { DeleteConfirmModal, useDeleteConfirm } from "@/shared";

const EventTabContent = () => {
  const [formState, setFormState] = useState({
    open: false,
    isEditing: false,
    selectedItem: null,
  });

  const {
    categories,
    loading,
    loadSingleCategory,
    createCategory,
    updateCategory,
    deleteCategory,
    contextHolder,
  } = useEventCategories();

  // Delete confirmation modal
  const { deleteModal, openDeleteModal, closeDeleteModal, confirmDelete } =
    useDeleteConfirm(async (item) => {
      await deleteCategory(item.id);
    });

  const handleFormOpen = (isEditing, selectedItem = null) => {
    setFormState({
      open: true,
      isEditing,
      selectedItem,
    });
  };

  const handleFormClose = () => {
    setFormState({
      open: false,
      isEditing: false,
      selectedItem: null,
    });
  };

  const handleEdit = async (id) => {
    const category = await loadSingleCategory(id);
    setFormState({
      open: true,
      isEditing: true,
      selectedItem: category,
    });
  };

  const handleDelete = (item) => {
    openDeleteModal(item, {
      itemType: "event category",
      itemName: item.name || item.categoryname,
      title: "Delete Event Category",
      message:
        "Are you sure you want to delete this event category? This action cannot be undone and may affect related data.",
    });
  };

  return (
    <>
      {contextHolder}
      <Row justify="end" style={{ marginBottom: 16, marginTop: 16 }}>
        <Col>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => handleFormOpen(false)}
            style={{
              background: "linear-gradient(135deg, #00A5CF 0%, #00315C 100%)",
              border: "none",
            }}
          >
            Add Event Category
          </Button>
        </Col>
      </Row>

      <Table
        dataSource={categories}
        columns={eventCategoryColumns({ handleEdit, handleDelete })}
        loading={loading}
        bordered
        size="middle"
        pagination={{
          pageSize: 10,
          showSizeChanger: true,
          showQuickJumper: true,
          showTotal: (total, range) =>
            `${range[0]}-${range[1]} of ${total} items`,
        }}
        locale={{ emptyText: "No event categories found" }}
      />

      <EventCategoryForm
        open={formState.open}
        handleClose={handleFormClose}
        isEditing={formState.isEditing}
        selectedItem={formState.selectedItem}
        addCategory={createCategory}
        updateCategory={updateCategory}
      />

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

export default EventTabContent;
