import { useState } from "react";
import {
  Box,
  Card,
  Grid,
  Button,
  Typography,
  TextField,
  InputAdornment,
  Stack,
  Tooltip,
  Paper,
  Skeleton,
  Chip,
  IconButton,
  CardMedia,
  CardContent,
  CardActions,
  Rating,
} from "@mui/material";
import {
  Add as AddIcon,
  Search as SearchIcon,
  LocationOn as LocationIcon,
  AttachMoney as PriceIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Visibility as VisibilityIcon,
  FilterList as FilterIcon,
  Refresh as RefreshIcon,
} from "@mui/icons-material";
import DestinationForm from "../components/DestinationForm";
import { useDestinations } from "../hooks/useDestinations";

const ManageDestinations = () => {
  const [open, setOpen] = useState(false);
  const [selectedDestination, setSelectedDestination] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  // Form modal handlers
  const handleOpen = () => {
    setIsEditing(false);
    setSelectedDestination(null);
    setOpen(true);
  };

  const handleClose = () => setOpen(false);

  const handleEdit = (destination) => {
    setSelectedDestination(destination);
    setIsEditing(true);
    setOpen(true);
  };

  const handleView = (destination) => {
    // Handle view destination logic here
    console.log("Viewing destination:", destination);
  };

  const {
    destinations,
    loading,
    handleAdd,
    handleEdit: updateDestination,
    handleDelete,
  } = useDestinations();

  // Mock destination data
  const mockDestinations = [
    {
      id: 1,
      name: "Bali Paradise",
      description:
        "Beautiful tropical island with stunning beaches and rich culture",
      location: "Bali, Indonesia",
      price: 1200,
      rating: 4.8,
      imageUrl: "https://images.unsplash.com/photo-1537953773345-d172ccf13cf1",
      category: "Beach",
      status: "Active",
    },
    {
      id: 2,
      name: "Swiss Alps Adventure",
      description: "Breathtaking mountain scenery with world-class skiing",
      location: "Swiss Alps, Switzerland",
      price: 2500,
      rating: 4.9,
      imageUrl: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4",
      category: "Mountain",
      status: "Active",
    },
    {
      id: 3,
      name: "Tokyo Cultural Tour",
      description:
        "Experience the blend of traditional and modern Japanese culture",
      location: "Tokyo, Japan",
      price: 1800,
      rating: 4.7,
      imageUrl: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf",
      category: "Cultural",
      status: "Active",
    },
    {
      id: 4,
      name: "Safari Experience",
      description: "Wildlife adventure in the heart of Africa",
      location: "Serengeti, Tanzania",
      price: 3200,
      rating: 4.9,
      imageUrl: "https://images.unsplash.com/photo-1547036967-23d11aacaee0",
      category: "Adventure",
      status: "Inactive",
    },
  ];

  const currentDestinations =
    destinations.length > 0 ? destinations : mockDestinations;

  const filteredDestinations = currentDestinations.filter(
    (destination) =>
      destination.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      destination.location?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      destination.description?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status) => {
    switch (status) {
      case "Active":
        return "success";
      case "Inactive":
        return "error";
      case "Pending":
        return "warning";
      default:
        return "default";
    }
  };

  return (
    <>
      <Card
        variant="outlined"
        sx={{ borderRadius: 1, overflow: "hidden", mb: 3 }}
      >
        {/* Top Actions Bar */}
        <Box
          sx={{
            p: 2,
            borderBottom: 1,
            borderColor: "divider",
            bgcolor: "background.paper",
          }}
        >
          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={2}
            alignItems={{ xs: "stretch", sm: "center" }}
            justifyContent="space-between"
          >
            <Stack direction="row" spacing={2} alignItems="center">
              <TextField
                size="small"
                placeholder="Search destinations..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                sx={{ minWidth: 280 }}
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchIcon fontSize="small" color="action" />
                      </InputAdornment>
                    ),
                  },
                }}
              />
              <Tooltip title="Refresh">
                <IconButton size="small">
                  <RefreshIcon />
                </IconButton>
              </Tooltip>
            </Stack>

            <Stack direction="row" spacing={1}>
              <Button
                variant="contained"
                startIcon={<AddIcon />}
                onClick={handleOpen}
                sx={{
                  background:
                    "linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)",
                  boxShadow: "0 3px 5px 2px rgba(33, 203, 243, .3)",
                }}
              >
                Add Destination
              </Button>
            </Stack>
          </Stack>
        </Box>

        {/* Results Summary */}
        {searchTerm && (
          <Box sx={{ px: 2, py: 1, bgcolor: "grey.50" }}>
            <Typography variant="body2" color="text.secondary">
              Showing {filteredDestinations.length} of{" "}
              {currentDestinations.length} destinations
              {searchTerm && ` for "${searchTerm}"`}
            </Typography>
          </Box>
        )}
      </Card>

      {/* Destinations Grid */}
      <Grid container spacing={3}>
        {loading ? (
          // Loading skeleton
          Array.from({ length: 8 }).map((_, index) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
              <Card>
                <Skeleton variant="rectangular" height={200} />
                <CardContent>
                  <Skeleton width="80%" height={24} />
                  <Skeleton width="60%" height={20} sx={{ mt: 1 }} />
                  <Skeleton width="100%" height={60} sx={{ mt: 1 }} />
                </CardContent>
                <CardActions>
                  <Skeleton width={80} height={32} />
                  <Skeleton width={60} height={32} />
                </CardActions>
              </Card>
            </Grid>
          ))
        ) : filteredDestinations.length === 0 ? (
          <Grid item xs={12}>
            <Paper sx={{ p: 4, textAlign: "center" }}>
              <Typography variant="h6" color="text.secondary" gutterBottom>
                {searchTerm
                  ? `No destinations found matching "${searchTerm}"`
                  : "No destinations found"}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {!searchTerm && "Start by adding your first destination"}
              </Typography>
            </Paper>
          </Grid>
        ) : (
          filteredDestinations.map((destination) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={destination.id}>
              <Card
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  transition: "transform 0.2s, box-shadow 0.2s",
                  "&:hover": {
                    transform: "translateY(-4px)",
                    boxShadow: 3,
                  },
                }}
              >
                <CardMedia
                  component="img"
                  height="200"
                  image={
                    destination.imageUrl ||
                    "https://via.placeholder.com/300x200"
                  }
                  alt={destination.name}
                  sx={{ objectFit: "cover" }}
                />

                <CardContent sx={{ flexGrow: 1, p: 2 }}>
                  <Box
                    display="flex"
                    justifyContent="space-between"
                    alignItems="flex-start"
                    mb={1}
                  >
                    <Typography
                      variant="h6"
                      component="h2"
                      sx={{
                        fontWeight: 600,
                        fontSize: "1.1rem",
                        lineHeight: 1.2,
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        display: "-webkit-box",
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: "vertical",
                      }}
                    >
                      {destination.name}
                    </Typography>
                    <Chip
                      label={destination.status}
                      color={getStatusColor(destination.status)}
                      size="small"
                      variant="outlined"
                    />
                  </Box>

                  <Box display="flex" alignItems="center" gap={0.5} mb={1}>
                    <LocationIcon fontSize="small" color="action" />
                    <Typography variant="body2" color="text.secondary" noWrap>
                      {destination.location}
                    </Typography>
                  </Box>

                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{
                      mb: 2,
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      display: "-webkit-box",
                      WebkitLineClamp: 3,
                      WebkitBoxOrient: "vertical",
                      minHeight: "3.6em",
                    }}
                  >
                    {destination.description}
                  </Typography>

                  <Box
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                  >
                    <Box display="flex" alignItems="center" gap={0.5}>
                      <PriceIcon fontSize="small" color="primary" />
                      <Typography
                        variant="h6"
                        color="primary"
                        fontWeight={600}
                        fontSize="1rem"
                      >
                        ${destination.price}
                      </Typography>
                    </Box>
                    <Box display="flex" alignItems="center" gap={0.5}>
                      <Rating
                        value={destination.rating}
                        readOnly
                        size="small"
                        precision={0.1}
                      />
                      <Typography variant="body2" color="text.secondary">
                        ({destination.rating})
                      </Typography>
                    </Box>
                  </Box>
                </CardContent>

                <CardActions sx={{ p: 2, pt: 0 }}>
                  <Stack direction="row" spacing={1} width="100%">
                    <Tooltip title="View Details">
                      <IconButton
                        size="small"
                        onClick={() => handleView(destination)}
                        sx={{ color: "info.main" }}
                      >
                        <VisibilityIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Edit Destination">
                      <IconButton
                        size="small"
                        onClick={() => handleEdit(destination)}
                        sx={{ color: "primary.main" }}
                      >
                        <EditIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete Destination">
                      <IconButton
                        size="small"
                        onClick={() => handleDelete(destination.id)}
                        sx={{ color: "error.main" }}
                      >
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  </Stack>
                </CardActions>
              </Card>
            </Grid>
          ))
        )}
      </Grid>

      {/* Destination Form Modal */}
      <DestinationForm
        open={open}
        handleClose={handleClose}
        isEditing={isEditing}
        destinationData={selectedDestination}
        handleAdd={handleAdd}
        handleEdit={updateDestination}
      />
    </>
  );
};

export default ManageDestinations;
