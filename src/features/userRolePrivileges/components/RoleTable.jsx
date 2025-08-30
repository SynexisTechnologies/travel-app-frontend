import {
  Box,
  Card,
  CardContent,
  Typography,
  IconButton,
  Chip,
  Tooltip,
  Button,
} from "@mui/material";
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Add as AddIcon,
} from "@mui/icons-material";
import DataTable from "@/shared/components/DataTable";

const RoleTable = ({
  roles = [],
  loading = false,
  onEdit,
  onDelete,
  onAdd,
  pagination,
  onChange,
}) => {
  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      width: "80px",
    },
    {
      title: "Role Name",
      dataIndex: "name",
      key: "name",
      render: (text, record) => (
        <Box>
          <Typography variant="body2" fontWeight="medium">
            {text || record.userRole}
          </Typography>
        </Box>
      ),
    },
    {
      title: "Actions",
      key: "actions",
      width: "120px",
      align: "center",
      render: (_, record) => (
        <Box sx={{ display: "flex", gap: 1, justifyContent: "center" }}>
          <Tooltip title="Edit Role">
            <IconButton
              size="small"
              color="primary"
              onClick={() => onEdit?.(record)}
              sx={{
                "&:hover": { backgroundColor: "primary.light", color: "white" },
              }}
            >
              <EditIcon fontSize="small" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Delete Role">
            <IconButton
              size="small"
              color="error"
              onClick={() => onDelete?.(record)}
              sx={{
                "&:hover": { backgroundColor: "error.light", color: "white" },
              }}
            >
              <DeleteIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        </Box>
      ),
    },
  ];

  return (
    <Card>
      <CardContent>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 2,
          }}
        >
          <Typography variant="h6" sx={{ fontWeight: "bold" }}>
            User Roles
          </Typography>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            size="small"
            onClick={onAdd}
            sx={{
              boxShadow: "0 3px 5px 2px rgba(0, 165, 207, .3)",
              "&:hover": {
                background: "linear-gradient(45deg, #00315C 30%, #068C6B 90%)",
              },
            }}
          >
            Add New Role
          </Button>
        </Box>

        <DataTable
          data={roles}
          bordered
          stickyHeader
          columns={columns}
          loading={loading}
          pagination={pagination}
          onChange={onChange}
          size="small"
          emptyText="No roles found"
        />
      </CardContent>
    </Card>
  );
};

export default RoleTable;
