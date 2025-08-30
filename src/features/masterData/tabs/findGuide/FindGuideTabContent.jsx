import { useState } from "react";
import { Space, Button, Row, Col, Table } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useFindGuideCategories } from "./hooks";
import { FindGuideCategoryForm } from "./components";
import { findGuideCategoryColumns } from "./config/findGuideTabConfig";
import { DeleteConfirmModal, useDeleteConfirm } from "@/shared";

const FindGuideTabContent = () => {
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
  } = useFindGuideCategories();

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
      itemType: "find guide category",
      itemName: item.name || item.categoryname,
      title: "Delete Find Guide Category",
      message:
        "Are you sure you want to delete this find guide category? This action cannot be undone and may affect related data.",
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
            Add Find Guide Category
          </Button>
        </Col>
      </Row>

      <Table
        dataSource={categories}
        columns={findGuideCategoryColumns({ handleEdit, handleDelete })}
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
        locale={{ emptyText: "No find guide categories found" }}
      />

      <FindGuideCategoryForm
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

export default FindGuideTabContent;
