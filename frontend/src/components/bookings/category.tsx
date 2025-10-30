import React from "react";

interface GenderSelectProps {
  value: string;
  onChange: (val: string) => void;
  placeholder?: string;
}

const GenderSelectComponent: React.FC<GenderSelectProps> = ({ value, onChange, placeholder }) => {
  return (
   <div style={{ position: "relative", width: "240px" }}>
  <select
    value={value}
    onChange={(e) => onChange(e.target.value)}
    style={{
      padding: "8px",
      paddingRight: "32px",
      borderRadius: "4px",
      border: "1px solid #ccc",
      width: "100%",
      appearance: "none",
      WebkitAppearance: "none",
      MozAppearance: "none",
    }}
  >
    <option value="">{placeholder || "Select Gender"}</option>
    <option value="Male">Male</option>
    <option value="Female">Female</option>
  </select>

  <span
    style={{
      position: "absolute",
      right: "12px",
      top: "50%",
      transform: "translateY(-50%)",
      pointerEvents: "none",
      fontSize: "14px",
    }}
  >
    ▼
  </span>
</div>

  );
};

export default GenderSelectComponent;
