import React, { useState, useEffect } from "react";
import { Select } from "antd";
import { cityList } from "get-srilanka-districts-cities";

const { Option } = Select;

interface CitySelectorProps {
  value?: string;
  onChange?: (value: string) => void;
  province?: string;
  district?: string;
  placeholder?: string;
  disabled?: boolean;
  size?: "small" | "middle" | "large";
}

const CitySelector: React.FC<CitySelectorProps> = ({
  value,
  onChange,
  province,
  district,
  placeholder = "Select City",
  disabled = false,
  size = "middle",
}) => {
  const [cities, setCities] = useState<string[]>([]);

  useEffect(() => {
    if (province && district) {
      const cityData = cityList(province, district);
      setCities(cityData[0] || []);
    } else {
      setCities([]);
    }
  }, [province, district]);

  return (
    <Select
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      disabled={disabled || !province || !district}
      size={size}
      style={{ width: "100%" }}
      showSearch
      filterOption={(input, option) =>
        (option?.children as unknown as string)
          ?.toLowerCase()
          ?.includes(input.toLowerCase())
      }
    >
      {cities.map((city: string) => (
        <Option key={city} value={city}>
          {city}
        </Option>
      ))}
    </Select>
  );
};

export default CitySelector;
