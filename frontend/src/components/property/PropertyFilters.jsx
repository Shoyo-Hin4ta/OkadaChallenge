import React, { useState, useRef, useEffect } from 'react';
import { Filter, X } from 'lucide-react';
import Button from '../common/Button';

const PropertyFilters = ({ onApplyFilters, onClearFilters }) => {
  const [isOpen, setIsOpen] = useState(false);
  const filterRef = useRef(null);
  const [filters, setFilters] = useState({
    minRent: '',
    maxRent: '',
    minSize: '',
    maxSize: ''
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (filterRef.current && !filterRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateFilters = () => {
    const newErrors = {};
    
    // Validate rent range
    if (filters.minRent && filters.maxRent) {
      const min = parseFloat(filters.minRent);
      const max = parseFloat(filters.maxRent);
      if (min > max) {
        newErrors.minRent = 'Min rent must be less than max rent';
      }
    }
    
    // Validate size range
    if (filters.minSize && filters.maxSize) {
      const min = parseFloat(filters.minSize);
      const max = parseFloat(filters.maxSize);
      if (min > max) {
        newErrors.minSize = 'Min size must be less than max size';
      }
    }
    
    // Validate positive numbers
    if (filters.minRent && parseFloat(filters.minRent) < 0) {
      newErrors.minRent = 'Must be a positive number';
    }
    if (filters.maxRent && parseFloat(filters.maxRent) < 0) {
      newErrors.maxRent = 'Must be a positive number';
    }
    if (filters.minSize && parseFloat(filters.minSize) < 0) {
      newErrors.minSize = 'Must be a positive number';
    }
    if (filters.maxSize && parseFloat(filters.maxSize) < 0) {
      newErrors.maxSize = 'Must be a positive number';
    }
    
    return newErrors;
  };

  const handleApply = () => {
    const validationErrors = validateFilters();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    
    // Convert to numbers for filtering
    const filterData = {
      minRent: filters.minRent ? parseFloat(filters.minRent) : null,
      maxRent: filters.maxRent ? parseFloat(filters.maxRent) : null,
      minSize: filters.minSize ? parseFloat(filters.minSize) : null,
      maxSize: filters.maxSize ? parseFloat(filters.maxSize) : null
    };
    
    onApplyFilters(filterData);
    setIsOpen(false);
  };

  const handleClear = () => {
    setFilters({
      minRent: '',
      maxRent: '',
      minSize: '',
      maxSize: ''
    });
    setErrors({});
    onClearFilters();
    setIsOpen(false);
  };

  const hasActiveFilters = filters.minRent || filters.maxRent || filters.minSize || filters.maxSize;

  return (
    <div className="relative" ref={filterRef}>
      <Button
        variant="secondary"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2"
      >
        <Filter size={18} />
        <span>Filters</span>
        {hasActiveFilters && (
          <span className="bg-blue-600 text-white text-xs rounded-full px-2 py-0.5">
            Active
          </span>
        )}
      </Button>

      {isOpen && (
        <div className="absolute top-12 right-0 bg-white rounded-lg shadow-lg border border-gray-200 p-6 w-80 z-10">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Filter Properties</h3>
            <button
              onClick={() => setIsOpen(false)}
              className="text-gray-400 hover:text-gray-600"
            >
              <X size={20} />
            </button>
          </div>

          <div className="space-y-4">
            {/* Rent Range */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Monthly Rent Range ($)
              </label>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <input
                    type="number"
                    name="minRent"
                    value={filters.minRent}
                    onChange={handleChange}
                    placeholder="Min"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  {errors.minRent && (
                    <p className="text-red-500 text-xs mt-1">{errors.minRent}</p>
                  )}
                </div>
                <div>
                  <input
                    type="number"
                    name="maxRent"
                    value={filters.maxRent}
                    onChange={handleChange}
                    placeholder="Max"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  {errors.maxRent && (
                    <p className="text-red-500 text-xs mt-1">{errors.maxRent}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Size Range */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Size Range (sq ft)
              </label>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <input
                    type="number"
                    name="minSize"
                    value={filters.minSize}
                    onChange={handleChange}
                    placeholder="Min"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  {errors.minSize && (
                    <p className="text-red-500 text-xs mt-1">{errors.minSize}</p>
                  )}
                </div>
                <div>
                  <input
                    type="number"
                    name="maxSize"
                    value={filters.maxSize}
                    onChange={handleChange}
                    placeholder="Max"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  {errors.maxSize && (
                    <p className="text-red-500 text-xs mt-1">{errors.maxSize}</p>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="flex gap-2 mt-6">
            <Button
              variant="primary"
              onClick={handleApply}
              className="flex-1"
            >
              Apply Filters
            </Button>
            <Button
              variant="secondary"
              onClick={handleClear}
              className="flex-1"
            >
              Clear
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PropertyFilters;