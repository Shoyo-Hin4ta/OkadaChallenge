import React from 'react';
import Dropdown from '../common/Dropdown';

const STATUS_OPTIONS = [
  { value: 'available', label: 'Available' },
  { value: 'leased', label: 'Leased' }
];

const StatusDropdown = ({ value, onChange, error, required = true }) => {
  return (
    <Dropdown
      value={value}
      onChange={onChange}
      options={STATUS_OPTIONS}
      placeholder="Select status"
      label="Status"
      error={error}
      required={required}
    />
  );
};

export default StatusDropdown;