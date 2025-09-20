import React, { useState, useEffect } from "react";
import { Select } from "antd";
import { getDistrictList } from "get-srilanka-districts-cities";

const { Option } = Select;

interface DistrictSelectorProps {
  value?: string;
  onChange?: (value: string) => void;
  province?: string;
  placeholder?: string;
  disabled?: boolean;
  size?: "small" | "middle" | "large";
}

const DistrictSelector: React.FC<DistrictSelectorProps> = ({
  value,
  onChange,
  province,
  placeholder = "Select District",
  disabled = false,
  size = "middle",
}) => {
  const [districts, setDistricts] = useState<string[]>([]);

  useEffect(() => {
    if (province) {
      const districtData = getDistrictList(province);
      setDistricts(districtData[0] || []);
    } else {
      setDistricts([]);
    }
  }, [province]);

  return (
    <Select
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      disabled={disabled || !province}
      size={size}
      style={{ width: "100%" }}
      showSearch
      filterOption={(input, option) =>
        (option?.children as unknown as string)
          ?.toLowerCase()
          ?.includes(input.toLowerCase())
      }
    >
      {districts.map((district: string) => (
        <Option key={district} value={district}>
          {district}
        </Option>
      ))}
    </Select>
  );
};

export default DistrictSelector;
