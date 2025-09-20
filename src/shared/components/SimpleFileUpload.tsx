import React, { useRef, useState } from "react";
import { Button, Image, Typography, Space, message } from "antd";
import { UploadOutlined, DeleteOutlined, EyeOutlined } from "@ant-design/icons";

const { Text } = Typography;

interface SimpleFileUploadProps {
  value?: File | string; // Can be a File object or existing image URL
  onChange?: (file: File | null) => void;
  accept?: string;
  disabled?: boolean;
  placeholder?: string;
  maxSize?: number; // in MB
  showPreview?: boolean;
}

const SimpleFileUpload: React.FC<SimpleFileUploadProps> = ({
  value,
  onChange,
  accept = "image/*",
  disabled = false,
  placeholder = "Choose Image",
  maxSize = 5, // 5MB default
  showPreview = true,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [messageApi, contextHolder] = message.useMessage();

  // Get display URL for preview
  const getDisplayUrl = () => {
    if (previewUrl) return previewUrl;
    if (typeof value === "string") return value; // Existing URL from server
    if (value instanceof File) return URL.createObjectURL(value);
    return null;
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (!file) return;

    // Validate file size
    if (file.size > maxSize * 1024 * 1024) {
      messageApi.error(`File size must be less than ${maxSize}MB`);
      return;
    }

    // Validate file type
    if (!file.type.startsWith("image/")) {
      messageApi.error("Please select a valid image file");
      return;
    }

    setPreviewUrl(URL.createObjectURL(file));
    onChange?.(file);
  };

  const handleRemove = () => {
    setPreviewUrl(null);
    onChange?.(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const displayUrl = getDisplayUrl();

  return (
    <div style={{ width: "100%" }}>
      {contextHolder}
      <input
        ref={fileInputRef}
        type="file"
        accept={accept}
        onChange={handleFileSelect}
        style={{ display: "none" }}
        disabled={disabled}
      />

      {displayUrl && showPreview ? (
        <div
          style={{
            border: "1px dashed #d9d9d9",
            borderRadius: 8,
            padding: 12,
            textAlign: "center",
            backgroundColor: "#fafafa",
          }}
        >
          <Image
            src={displayUrl}
            alt="Preview"
            style={{
              maxWidth: "100%",
              maxHeight: 120,
              borderRadius: 6,
              marginBottom: 8,
            }}
            fallback="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMIAAADDCAYAAADQvc6UAAABRWlDQ1BJQ0MgUHJvZmlsZQAAKJFjYGASSSwoyGFhYGDIzSspCnJ3UoiIjFJgf8LAwSDCIMogwMCcmFxc4BgQ4ANUwgCjUcG3awyMIPqyLsis7PPOq3QdDFcvjV3jOD1boQVTPQrgSkktTgbSf4A4LbmgqISBgTEFyFYuLykAsTuAbJEioKOA7DkgdjqEvQHEToKwj4DVhAQ5A9k3gGyB5IxEoBmML4BsnSQk8XQkNtReEOBxcfXxUQg1Mjc0dyHgXNJBSWpFCYh2zi+oLMpMzyhRcASGUqqCZ16yno6CkYGRAQMDKMwhqj/fAIcloxgHQqxAjIHBEugw5sUIsSQpBobtQPdLciLEVJYzMPBHMDBsayhILEqEO4DxG0txmrERhM29nYGBddr//5/DGRjYNRkY/l7////39v///y4Dmn+LgeHANwDrkl1AuO+pmgAAADhlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAAqACAAQAAAABAAAAwqADAAQAAAABAAAAwwAAAAD9b/HnAAAHlklEQVR4Ae3dP3Ik1RnG4W+FgYxN"
          />
          <div>
            <Space>
              <Button
                type="text"
                icon={<UploadOutlined />}
                size="small"
                onClick={handleButtonClick}
                disabled={disabled}
              >
                Change
              </Button>
              <Button
                type="text"
                danger
                icon={<DeleteOutlined />}
                size="small"
                onClick={handleRemove}
                disabled={disabled}
              >
                Remove
              </Button>
            </Space>
          </div>
        </div>
      ) : (
        <Button
          type="dashed"
          icon={<UploadOutlined />}
          onClick={handleButtonClick}
          disabled={disabled}
          style={{
            width: "100%",
            height: 80,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div>{placeholder}</div>
          <Text type="secondary" style={{ fontSize: 12 }}>
            Max {maxSize}MB • JPG, PNG, JPEG, WEBP
          </Text>
        </Button>
      )}
    </div>
  );
};

export default SimpleFileUpload;
