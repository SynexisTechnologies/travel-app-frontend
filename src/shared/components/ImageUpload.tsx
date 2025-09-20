import { useState, useEffect } from "react";
import { Upload, message, theme } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import type { UploadFile, UploadProps } from "antd";
import type { RcFile, UploadRequestOption } from "rc-upload/lib/interface";
import {
  cld,
  CLOUDINARY_UPLOAD_URL,
  CLOUDINARY_UPLOAD_PRESET,
} from "../config/cloudinaryConfig";

interface CloudinaryFile extends UploadFile {
  cloudinaryId?: string;
}

interface ImageUploadProps {
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  required?: boolean;
  size?: "small" | "default" | "large";
}

const ImageUpload: React.FC<ImageUploadProps> = ({
  value,
  onChange,
  placeholder = "Upload Image",
  disabled = false,
  required = false,
  size = "large", // "small", "default", "large"
}) => {
  const [uploading, setUploading] = useState<boolean>(false);
  const [fileList, setFileList] = useState<CloudinaryFile[]>(
    value
      ? [
          {
            uid: "-1",
            name: "image.png",
            status: "done",
            url:
              typeof value === "string" && !value.startsWith("http")
                ? cld.image(value).format("auto").quality("auto").toURL()
                : value,
            cloudinaryId: value,
          } as CloudinaryFile,
        ]
      : []
  );

  // Update fileList when value changes (for edit mode)
  useEffect(() => {
    if (value && fileList.length === 0) {
      const newFileList: CloudinaryFile[] = [
        {
          uid: "-1",
          name: "image.png",
          status: "done",
          url:
            typeof value === "string" && !value.startsWith("http")
              ? cld.image(value).format("auto").quality("auto").toURL()
              : value,
          cloudinaryId: value,
          response: value, // Also set as response for consistency
        } as CloudinaryFile,
      ];
      setFileList(newFileList);
    } else if (!value && fileList.length > 0) {
      setFileList([]);
    }
  }, [value]); // Remove fileList from dependencies to prevent infinite loop

  const [messageApi, contextHolder] = message.useMessage();
  const { token } = theme.useToken();

  // Get dimensions based on size prop
  const getUploadDimensions = () => {
    switch (size) {
      case "small":
        return { width: 80, height: 80 };
      case "large":
        return { width: 140, height: 140 };
      default:
        return { width: 104, height: 104 }; // Default picture-card size
    }
  };

  const { width, height } = getUploadDimensions();

  const handleUploadChange: UploadProps["onChange"] = ({
    fileList: newFileList,
  }) => {
    console.log("Upload change:", newFileList); // Debug log
    setFileList(newFileList as CloudinaryFile[]);

    // Check if there's a file and it's done uploading
    if (newFileList.length > 0 && newFileList[0].status === "done") {
      const uploadedFile = newFileList[0] as CloudinaryFile;
      // The response from customRequest should be the publicId
      const cloudinaryId = uploadedFile.response || uploadedFile.cloudinaryId;

      console.log("Cloudinary ID:", cloudinaryId); // Debug log

      if (cloudinaryId) {
        onChange?.(cloudinaryId);
      }
    } else if (newFileList.length === 0) {
      onChange?.("");
    }
  };

  // Validate image before upload
  const beforeUpload = (file: RcFile) => {
    const isImage = file.type.startsWith("image/");
    if (!isImage) {
      setFileList([]);
      messageApi.error("You can only upload image files!");
      return false;
    }

    const isLt10M = file.size / 1024 / 1024 < 10;
    if (!isLt10M) {
      messageApi.error("Image must be smaller than 10MB!");
      return false;
    }

    return true;
  };

  // Upload to Cloudinary
  const uploadToCloudinary = async (options: UploadRequestOption) => {
    const { file, onSuccess, onError } = options;
    setUploading(true);

    try {
      // Create FormData for Cloudinary upload
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);
      formData.append("folder", "travel-website/master-data");

      // Upload to Cloudinary
      const response = await fetch(CLOUDINARY_UPLOAD_URL, {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        const publicId = data.public_id;
        const optimizedUrl = cld
          .image(publicId)
          .format("auto")
          .quality("auto")
          .toURL();

        onSuccess?.(publicId);
        messageApi.success("Image uploaded successfully!");
      } else {
        throw new Error("Cloudinary upload failed");
      }
    } catch (error) {
      console.error("Upload error:", error);
      messageApi.error("Failed to upload image. Please try again.");
      onError?.(error as Error);
    } finally {
      setUploading(false);
    }
  };

  // Remove image
  const removeImage = () => {
    setFileList([]);
    onChange?.("");
    return true;
  };

  return (
    <>
      {contextHolder}
      <Upload
        name="image"
        listType="picture-card"
        fileList={fileList}
        beforeUpload={beforeUpload}
        onChange={handleUploadChange}
        showUploadList={{
          showPreviewIcon: true,
          showRemoveIcon: true,
        }}
        maxCount={1}
        onRemove={removeImage}
        accept="image/*"
        customRequest={uploadToCloudinary}
        disabled={disabled}
        style={{
          width: width,
          opacity: disabled ? 0.5 : 1,
        }}
        className={`upload-picture-card ${
          required && !value ? "upload-required" : ""
        } ${size}`}
      >
        {fileList.length >= 1 ? null : (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              height: "100%",
              color: disabled
                ? `${token.colorTextSecondary}`
                : required && !value
                ? `${token.colorError}`
                : `${token.colorText}`,
            }}
          >
            <UploadOutlined
              style={{
                fontSize: 24,
                marginBottom: 8,
              }}
            />
            <div
              style={{
                fontSize: 12,
                textAlign: "center",
                lineHeight: 1.2,
              }}
            >
              {uploading ? "Uploading..." : placeholder}
              {required && !value && (
                <div
                  style={{
                    color: `${token.colorError}`,
                    fontSize: 10,
                    marginTop: 2,
                  }}
                >
                  Required
                </div>
              )}
            </div>
          </div>
        )}
      </Upload>
    </>
  );
};

export default ImageUpload;
