import React from "react";
import {
  Modal,
  Descriptions,
  Tag,
  Rate,
  Space,
  Image,
  Typography,
  Divider,
} from "antd";
import { CloudinaryImage } from "@/shared/components";
import type { DestinationViewProps } from "../types";

const { Title, Text } = Typography;

const DestinationView: React.FC<DestinationViewProps> = ({
  module,
  viewModal,
  closeViewModal,
  handleEdit,
  loadOneItem,
  additionalData,
}) => {
  const { open, selectedObject: destination } = viewModal;

  if (!destination) return null;

  const getStatusTag = () => {
    if (destination.approved) {
      return <Tag color="green">Approved</Tag>;
    } else if (destination.reject) {
      return <Tag color="red">Rejected</Tag>;
    } else if (destination.pending) {
      return <Tag color="orange">Pending</Tag>;
    } else {
      return <Tag color="blue">Draft</Tag>;
    }
  };

  return (
    <Modal
      title={<Title level={3}>{destination.name}</Title>}
      open={open}
      onCancel={closeViewModal}
      footer={null}
      width={800}
      destroyOnHidden
    >
      <div style={{ maxHeight: "70vh", overflowY: "auto" }}>
        {/* Destination Photo */}
        {destination.photos && (
          <div style={{ marginBottom: 24, textAlign: "center" }}>
            <CloudinaryImage
              publicId={destination.photos}
              width={400}
              height={250}
              style={{ borderRadius: 8, objectFit: "cover" }}
            />
          </div>
        )}

        {/* Basic Information */}
        <Descriptions title="Basic Information" bordered column={2}>
          <Descriptions.Item label="Name" span={2}>
            {destination.name}
          </Descriptions.Item>
          {destination.province && (
            <Descriptions.Item label="Province">
              {destination.province}
            </Descriptions.Item>
          )}
          <Descriptions.Item label="District">
            {destination.district || "N/A"}
          </Descriptions.Item>
          {!destination.province && (
            <Descriptions.Item label="City">
              {destination.city || "N/A"}
            </Descriptions.Item>
          )}
          {destination.province && (
            <Descriptions.Item label="City" span={2}>
              {destination.city || "N/A"}
            </Descriptions.Item>
          )}
          <Descriptions.Item label="Rating" span={2}>
            <Space>
              <Rate disabled value={Number(destination.rating) || 0} />
              <Text>({Number(destination.rating)?.toFixed(1) || 0})</Text>
            </Space>
          </Descriptions.Item>
          <Descriptions.Item label="Status" span={2}>
            {getStatusTag()}
          </Descriptions.Item>
        </Descriptions>

        <Divider />

        {/* Location & Timing */}
        <Descriptions title="Location & Timing" bordered column={2}>
          <Descriptions.Item label="Google Maps" span={2}>
            {destination.google_map_location ? (
              <a
                href={destination.google_map_location}
                target="_blank"
                rel="noopener noreferrer"
              >
                View on Google Maps
              </a>
            ) : (
              "N/A"
            )}
          </Descriptions.Item>
          <Descriptions.Item label="Suggestion Time">
            {destination.suggestion_time || "N/A"}
          </Descriptions.Item>
          <Descriptions.Item label="Opening Time">
            {destination.open_time || "N/A"}
          </Descriptions.Item>
          <Descriptions.Item label="Always Open">
            <Tag color={destination.always_open ? "green" : "red"}>
              {destination.always_open ? "24/7 Open" : "Scheduled Hours"}
            </Tag>
          </Descriptions.Item>
          <Descriptions.Item label="Need Ticket">
            <Tag color={destination.need_ticket ? "orange" : "green"}>
              {destination.need_ticket ? "Ticket Required" : "Free Entry"}
            </Tag>
          </Descriptions.Item>
        </Descriptions>

        <Divider />

        {/* Pricing & Details */}
        <Descriptions title="Pricing & Details" bordered column={2}>
          <Descriptions.Item label="Ticket Price">
            {destination.ticket_price
              ? `${Number(destination.ticket_price).toLocaleString("en-LK", {
                  style: "currency",
                  currency: "LKR",
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}`
              : "Free"}
          </Descriptions.Item>
          <Descriptions.Item label="Tags">
            {destination.tag || "N/A"}
          </Descriptions.Item>
          <Descriptions.Item label="Category">
            {(() => {
              if (!destination.category) return "N/A";
              const category = additionalData?.categories?.find(
                (cat: any) => cat.id == destination.category
              );
              return category ? category.category_name : destination.category;
            })()}
          </Descriptions.Item>
          <Descriptions.Item label="Transport Method">
            {(() => {
              if (!destination.transport_method) return "N/A";
              const transport = additionalData?.transportMethods?.find(
                (t: any) => t.id == destination.transport_method
              );
              return transport
                ? transport.transport_method
                : destination.transport_method;
            })()}
          </Descriptions.Item>
          <Descriptions.Item label="Traveler Type" span={2}>
            {(() => {
              if (!destination.traveler_type) return "N/A";
              const travelType = additionalData?.travelTypes?.find(
                (t: any) => t.id == destination.traveler_type
              );
              return travelType
                ? travelType.travel_type
                : destination.traveler_type;
            })()}
          </Descriptions.Item>
        </Descriptions>

        <Divider />

        {/* Description */}
        <div>
          <Title level={5}>Description</Title>
          <Text>{destination.description || "No description available"}</Text>
        </div>

        {/* Contact Information */}
        {(destination.contact_no || destination.website_social_media_link) && (
          <>
            <Divider />
            <Descriptions title="Contact Information" bordered column={1}>
              {destination.contact_no && (
                <Descriptions.Item label="Contact Number">
                  {typeof destination.contact_no === "object"
                    ? JSON.stringify(destination.contact_no)
                    : destination.contact_no}
                </Descriptions.Item>
              )}
              {destination.website_social_media_link && (
                <Descriptions.Item label="Website/Social Media">
                  {typeof destination.website_social_media_link === "object"
                    ? JSON.stringify(destination.website_social_media_link)
                    : destination.website_social_media_link}
                </Descriptions.Item>
              )}
            </Descriptions>
          </>
        )}
      </div>
    </Modal>
  );
};

export default DestinationView;
