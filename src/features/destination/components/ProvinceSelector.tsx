import React from "react";
import { Select } from "antd";
import { provinceList } from "get-srilanka-districts-cities";

const { Option } = Select;

interface ProvinceSelectorProps {
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  size?: "small" | "middle" | "large";
}

const ProvinceSelector: React.FC<ProvinceSelectorProps> = ({
  value,
  onChange,
  placeholder = "Select Province",
  disabled = false,
  size = "middle",
}) => {
  const provinces = provinceList();

  return (
    <Select
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      disabled={disabled}
      size={size}
      style={{ width: "100%" }}
      showSearch
      filterOption={(input, option) =>
        (option?.children as unknown as string)
          ?.toLowerCase()
          ?.includes(input.toLowerCase())
      }
    >
      {provinces[0]?.map((province: string) => (
        <Option key={province} value={province}>
          {province}
        </Option>
      ))}
    </Select>
  );
};

export default ProvinceSelector;
