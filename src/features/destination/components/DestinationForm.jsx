import { useState, useEffect } from "react";
import {
  Box,
  Button,
  Modal,
  TextField,
  Typography,
  IconButton,
  MenuItem,
  InputAdornment,
  Select,
  FormControl,
  InputLabel,
  Paper,
  Stack,
  LinearProgress,
  FormHelperText,
  Chip,
  Autocomplete,
} from "@mui/material";
import {
  Close as CloseIcon,
  LocationOn as LocationIcon,
  Category as CategoryIcon,
  Description as DescriptionIcon,
  AttachMoney as PriceIcon,
  Star as StarIcon,
  Save as SaveIcon,
  Add as AddIcon,
  Image as ImageIcon,
} from "@mui/icons-material";
import { useTheme } from "../../../shared/contexts/ThemeContext";
import {
  useDestinationCategories,
  useTransportMethods,
  useTravelTypes,
} from "../hooks/useDestinations";

const DestinationForm = ({
  open,
  handleClose,
  isEditing,
  destinationData,
  handleAdd,
  handleEdit,
}) => {
  const { themeMode } = useTheme();
  const { categories } = useDestinationCategories();
  const { transportMethods } = useTransportMethods();
  const { travelTypes } = useTravelTypes();

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    location: "",
    price: "",
    rating: "",
    imageUrl: "",
    category: "",
    transportMethods: [],
    travelTypes: [],
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Initialize form data when editing
  useEffect(() => {
    if (isEditing && destinationData) {
      setFormData({
        name: destinationData.name || "",
        description: destinationData.description || "",
        location: destinationData.location || "",
        price: destinationData.price || "",
        rating: destinationData.rating || "",
        imageUrl: destinationData.imageUrl || "",
        category: destinationData.category || "",
        transportMethods: destinationData.transportMethods || [],
        travelTypes: destinationData.travelTypes || [],
      });
    } else {
      // Reset form for new destination
      setFormData({
        name: "",
        description: "",
        location: "",
        price: "",
        rating: "",
        imageUrl: "",
        category: "",
        transportMethods: [],
        travelTypes: [],
      });
    }
  }, [isEditing, destinationData, open]);

  const handleInputChange = (field) => (e) => {
    const value = e.target.value;
    setFormData((prev) => ({ ...prev, [field]: value }));

    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) newErrors.name = "Destination name is required";
    if (!formData.description.trim())
      newErrors.description = "Description is required";
    if (!formData.location.trim()) newErrors.location = "Location is required";
    if (!formData.price) newErrors.price = "Price is required";
    if (!formData.rating) newErrors.rating = "Rating is required";
    if (!formData.category) newErrors.category = "Category is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      // Call the appropriate handler
      if (isEditing) {
        await handleEdit(destinationData.id, formData);
      } else {
        await handleAdd(formData);
      }

      // Reset form and close modal
      handleCloseModal();
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCloseModal = () => {
    setFormData({
      name: "",
      description: "",
      location: "",
      price: "",
      rating: "",
      imageUrl: "",
      category: "",
      transportMethods: [],
      travelTypes: [],
    });
    setErrors({});
    handleClose();
  };

  return (
    <Modal
      open={open}
      onClose={handleCloseModal}
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        p: 2,
        boxShadow: "none",
      }}
    >
      <Paper
        sx={{
          width: "100%",
          maxWidth: 600,
          maxHeight: "95vh",
          display: "flex",
          flexDirection: "column",
          borderRadius: 1,
          overflow: "hidden",
        }}
      >
        {/* Header */}
        <Box
          sx={{
            px: 2,
            pt: 2,
            pb: 1.5,
            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            color: "white",
          }}
        >
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            mb={0.5}
          >
            <Stack direction="row" alignItems="center" spacing={1}>
              <Box
                sx={{
                  p: 1,
                  borderRadius: 1,
                  bgcolor: "rgba(255,255,255,0.2)",
                  backdropFilter: "blur(10px)",
                  display: "flex",
                }}
              >
                {isEditing ? (
                  <LocationIcon fontSize="small" />
                ) : (
                  <AddIcon fontSize="small" />
                )}
              </Box>
              <Box>
                <Typography variant="subtitle1" fontWeight={700}>
                  {isEditing ? "Update destination" : "Add a new destination"}
                </Typography>
              </Box>
            </Stack>

            <IconButton
              onClick={handleCloseModal}
              sx={{
                color: "white",
                bgcolor: "rgba(255,255,255,0.1)",
                "&:hover": { bgcolor: "rgba(255,255,255,0.2)" },
              }}
            >
              <CloseIcon />
            </IconButton>
          </Stack>
        </Box>

        {/* Progress indicator */}
        {isSubmitting && (
          <LinearProgress
            sx={{
              height: 3,
              bgcolor: "rgba(255,255,255,0.1)",
              "& .MuiLinearProgress-bar": {
                bgcolor: "primary.main",
              },
            }}
          />
        )}

        {/* Form Content */}
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
            p: 2,
            overflowY: "auto",
            flexGrow: 1,
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
          className={`sider-content-scroll ${themeMode}`}
        >
          {/* Basic Information Section */}
          <Box>
            <Typography
              variant="subtitle2"
              color="primary"
              mb={1}
              display="flex"
              alignItems="center"
              gap={1}
            >
              <LocationIcon fontSize="small" />
              Basic Information
            </Typography>
            <Stack spacing={1.5}>
              <TextField
                fullWidth
                label="Destination Name"
                value={formData.name}
                onChange={handleInputChange("name")}
                error={!!errors.name}
                helperText={errors.name}
                variant="outlined"
                size="small"
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start">
                        <LocationIcon fontSize="small" color="action" />
                      </InputAdornment>
                    ),
                  },
                }}
              />

              <TextField
                fullWidth
                label="Location"
                value={formData.location}
                onChange={handleInputChange("location")}
                error={!!errors.location}
                helperText={errors.location}
                variant="outlined"
                size="small"
                placeholder="City, Country"
              />

              <TextField
                fullWidth
                label="Description"
                value={formData.description}
                onChange={handleInputChange("description")}
                error={!!errors.description}
                helperText={errors.description}
                variant="outlined"
                size="small"
                multiline
                rows={3}
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment
                        position="start"
                        sx={{ alignSelf: "flex-start", mt: 1 }}
                      >
                        <DescriptionIcon fontSize="small" color="action" />
                      </InputAdornment>
                    ),
                  },
                }}
              />

              <TextField
                fullWidth
                label="Image URL"
                value={formData.imageUrl}
                onChange={handleInputChange("imageUrl")}
                variant="outlined"
                size="small"
                placeholder="https://example.com/image.jpg"
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start">
                        <ImageIcon fontSize="small" color="action" />
                      </InputAdornment>
                    ),
                  },
                }}
              />
            </Stack>
          </Box>

          {/* Pricing & Rating Section */}
          <Box>
            <Typography
              variant="subtitle2"
              color="primary"
              mb={1}
              display="flex"
              alignItems="center"
              gap={1}
            >
              <PriceIcon fontSize="small" />
              Pricing & Rating
            </Typography>
            <Stack spacing={1.5}>
              <Box display="flex" gap={1}>
                <TextField
                  fullWidth
                  label="Price (USD)"
                  type="number"
                  value={formData.price}
                  onChange={handleInputChange("price")}
                  error={!!errors.price}
                  helperText={errors.price}
                  variant="outlined"
                  size="small"
                  slotProps={{
                    input: {
                      startAdornment: (
                        <InputAdornment position="start">
                          <PriceIcon fontSize="small" color="action" />
                        </InputAdornment>
                      ),
                    },
                  }}
                />
                <TextField
                  fullWidth
                  label="Rating"
                  type="number"
                  value={formData.rating}
                  onChange={handleInputChange("rating")}
                  error={!!errors.rating}
                  helperText={errors.rating}
                  variant="outlined"
                  size="small"
                  inputProps={{ min: 0, max: 5, step: 0.1 }}
                  slotProps={{
                    input: {
                      startAdornment: (
                        <InputAdornment position="start">
                          <StarIcon fontSize="small" color="action" />
                        </InputAdornment>
                      ),
                    },
                  }}
                />
              </Box>
            </Stack>
          </Box>

          {/* Category & Options Section */}
          <Box>
            <Typography
              variant="subtitle2"
              color="primary"
              mb={1}
              display="flex"
              alignItems="center"
              gap={1}
            >
              <CategoryIcon fontSize="small" />
              Category & Options
            </Typography>
            <Stack spacing={1.5}>
              <FormControl fullWidth error={!!errors.category} size="small">
                <InputLabel>Category</InputLabel>
                <Select
                  label="Category"
                  value={formData.category}
                  onChange={handleInputChange("category")}
                >
                  {categories.map((category) => (
                    <MenuItem key={category.id} value={category.id}>
                      {category.name}
                    </MenuItem>
                  ))}
                </Select>
                {errors.category && (
                  <FormHelperText>{errors.category}</FormHelperText>
                )}
              </FormControl>

              <Autocomplete
                multiple
                options={transportMethods}
                getOptionLabel={(option) => option.name}
                value={transportMethods.filter((method) =>
                  formData.transportMethods.includes(method.id)
                )}
                onChange={(event, newValue) => {
                  setFormData((prev) => ({
                    ...prev,
                    transportMethods: newValue.map((item) => item.id),
                  }));
                }}
                renderTags={(value, getTagProps) =>
                  value.map((option, index) => (
                    <Chip
                      key={option.id}
                      variant="outlined"
                      label={option.name}
                      size="small"
                      {...getTagProps({ index })}
                    />
                  ))
                }
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Transport Methods"
                    placeholder="Select transport methods"
                    size="small"
                  />
                )}
              />

              <Autocomplete
                multiple
                options={travelTypes}
                getOptionLabel={(option) => option.name}
                value={travelTypes.filter((type) =>
                  formData.travelTypes.includes(type.id)
                )}
                onChange={(event, newValue) => {
                  setFormData((prev) => ({
                    ...prev,
                    travelTypes: newValue.map((item) => item.id),
                  }));
                }}
                renderTags={(value, getTagProps) =>
                  value.map((option, index) => (
                    <Chip
                      key={option.id}
                      variant="outlined"
                      label={option.name}
                      size="small"
                      {...getTagProps({ index })}
                    />
                  ))
                }
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Travel Types"
                    placeholder="Select travel types"
                    size="small"
                  />
                )}
              />
            </Stack>
          </Box>

          {/* Action Buttons */}
          <Box
            display="flex"
            gap={1}
            pt={2}
            sx={{
              justifyContent: "flex-end",
              borderTop: 1,
              borderColor: "divider",
              mt: 1,
            }}
          >
            <Button
              variant="outlined"
              onClick={handleCloseModal}
              disabled={isSubmitting}
              size="small"
              sx={{ minWidth: 80 }}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              type="submit"
              disabled={isSubmitting}
              size="small"
              startIcon={isSubmitting ? null : <SaveIcon />}
              sx={{
                minWidth: 100,
                background: "linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)",
                boxShadow: "0 3px 5px 2px rgba(33, 203, 243, .3)",
              }}
            >
              {isSubmitting ? (
                <Box display="flex" alignItems="center" gap={1}>
                  <Box
                    sx={{
                      width: 16,
                      height: 16,
                      border: 2,
                      borderColor: "white",
                      borderTopColor: "transparent",
                      borderRadius: "50%",
                      animation: "spin 1s linear infinite",
                      "@keyframes spin": {
                        "0%": { transform: "rotate(0deg)" },
                        "100%": { transform: "rotate(360deg)" },
                      },
                    }}
                  />
                  Saving...
                </Box>
              ) : (
                `${isEditing ? "Update" : "Create"} Destination`
              )}
            </Button>
          </Box>
        </Box>
      </Paper>
    </Modal>
  );
};

export default DestinationForm;
