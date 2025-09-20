import React, { useRef } from "react";
import { Button, Image, Typography, Space, message, Card } from "antd";
import { UploadOutlined, DeleteOutlined } from "@ant-design/icons";

const { Text } = Typography;

interface FileWithPreview {
  file: File | null;
  preview: string | null;
  existing?: string; // for existing URLs from server
}

interface MultipleFileUploadProps {
  value?: FileWithPreview[];
  onChange?: (files: FileWithPreview[]) => void;
  accept?: string;
  disabled?: boolean;
  maxSize?: number; // in MB
  maxCount?: number;
}

const MultipleFileUpload: React.FC<MultipleFileUploadProps> = ({
  value = [],
  onChange,
  accept = "image/*",
  disabled = false,
  maxSize = 5, // 5MB default
  maxCount = 10,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [messageApi, contextHolder] = message.useMessage();

  const handleFileSelect = (
    event: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
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

    const newFiles = [...value];
    newFiles[index] = {
      file,
      preview: URL.createObjectURL(file),
      existing: newFiles[index]?.existing,
    };

    onChange?.(newFiles);
  };

  const handleRemove = (index: number) => {
    const newFiles = [...value];
    if (newFiles[index]?.preview && newFiles[index]?.file) {
      URL.revokeObjectURL(newFiles[index].preview!);
    }
    newFiles[index] = {
      file: null,
      preview: null,
      existing: newFiles[index]?.existing,
    };
    onChange?.(newFiles);
  };

  const getDisplayUrl = (item: FileWithPreview) => {
    if (item.preview) return item.preview;
    if (item.existing) return item.existing;
    return null;
  };

  return (
    <div style={{ width: "100%" }}>
      {contextHolder}
      <Space direction="vertical" style={{ width: "100%" }} size="middle">
        {value.map((item, index) => {
          const displayUrl = getDisplayUrl(item);

          return (
            <Card
              key={index}
              size="small"
              style={{
                border: "1px dashed #d9d9d9",
                backgroundColor: "#fafafa",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <div style={{ minWidth: 80 }}>
                  <Text strong style={{ fontSize: 12 }}>
                    Image {index + 1}
                  </Text>
                </div>

                <div
                  style={{
                    flex: 1,
                    display: "flex",
                    alignItems: "center",
                    gap: 12,
                  }}
                >
                  {displayUrl ? (
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 12,
                        flex: 1,
                      }}
                    >
                      <Image
                        src={displayUrl}
                        alt={`Preview ${index + 1}`}
                        style={{
                          width: 60,
                          height: 60,
                          borderRadius: 6,
                          objectFit: "cover",
                        }}
                        fallback="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMIAAADDCAYAAADQvc6UAAABRWlDQ1BJQ0MgUHJvZmlsZQAAKJFjYGASSSwoyGFhYGDIzSspCnJ3UoiIjFJgf8LAwSDCIMogwMCcmFxc4BgQ4ANUwgCjUcG3awyMIPqyLsis7PPOq3QdDFcvjV3jOD1boQVTPQrgSkktTgbSf4A4LbmgqISBgTEFyFYuLykAsTuAbJEioKOA7DkgdjqEvQHEToKwj4DVhAQ5A9k3gGyB5IxEoBmML4BsnSQk8XQkNtReEOBxcfXxUQg1Mjc0dyHgXNJBSWpFCYh2zi+oLMpMzyhRcASGUqqCZ16yno6CkYGRAQMDKMwhqj/fAIcloxgHQqxAjIHBEugw5sUIsSQpBobtQPdLciLEVJYzMPBHMDBsayhILEqEO4DxG0txmrERhM29nYGBddr//5/DGRjYNRkY/l7////39v///y4Dmn+LgeHANwDrkl1AuO+pmgAAADhlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAAqACAAQAAAABAAAAwqADAAQAAAABAAAAwwAAAAD9b/HnAAAHlklEQVR4Ae3dP3Ik1RnG4W+FgYxN"
                      />
                      <div style={{ flex: 1 }}>
                        <Text type="secondary" style={{ fontSize: 12 }}>
                          {item.file ? item.file.name : "Existing image"}
                        </Text>
                      </div>
                    </div>
                  ) : (
                    <div style={{ flex: 1 }}>
                      <Text type="secondary" style={{ fontSize: 12 }}>
                        No image selected
                      </Text>
                    </div>
                  )}
                </div>

                <Space>
                  <input
                    type="file"
                    accept={accept}
                    onChange={(e) => handleFileSelect(e, index)}
                    style={{ display: "none" }}
                    disabled={disabled}
                    id={`file-input-${index}`}
                  />
                  <Button
                    type="text"
                    icon={<UploadOutlined />}
                    size="small"
                    onClick={() =>
                      document.getElementById(`file-input-${index}`)?.click()
                    }
                    disabled={disabled}
                  >
                    {displayUrl ? "Change" : "Select"}
                  </Button>
                  {displayUrl && (
                    <Button
                      type="text"
                      danger
                      icon={<DeleteOutlined />}
                      size="small"
                      onClick={() => handleRemove(index)}
                      disabled={disabled}
                    >
                      Remove
                    </Button>
                  )}
                </Space>
              </div>
            </Card>
          );
        })}

        <div style={{ textAlign: "center", marginTop: 8 }}>
          <Text type="secondary" style={{ fontSize: 11 }}>
            Max {maxSize}MB per image • JPG, PNG, JPEG, WEBP
          </Text>
        </div>
      </Space>
    </div>
  );
};

export default MultipleFileUpload;
