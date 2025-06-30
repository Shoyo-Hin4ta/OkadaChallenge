import React, { useState, useRef, useEffect } from 'react';
import { ArrowUpDown, ArrowUp, ArrowDown, ChevronDown } from 'lucide-react';
import Button from '../common/Button';

const PropertySort = ({ onSortChange, currentSort }) => {
  const [isOpen, setIsOpen] = useState(false);
  const sortRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sortRef.current && !sortRef.current.contains(event.target)) {
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

  const sortOptions = [
    { value: 'created_desc', label: 'Newest First', icon: <ArrowDown size={16} /> },
    { value: 'created_asc', label: 'Oldest First', icon: <ArrowUp size={16} /> },
    { value: 'price_desc', label: 'Highest Price', icon: <ArrowDown size={16} /> },
    { value: 'price_asc', label: 'Lowest Price', icon: <ArrowUp size={16} /> },
    { value: 'size_desc', label: 'Largest Size', icon: <ArrowDown size={16} /> },
    { value: 'size_asc', label: 'Smallest Size', icon: <ArrowUp size={16} /> },
  ];

  const handleSort = (sortValue) => {
    onSortChange(sortValue);
    setIsOpen(false);
  };

  const currentOption = sortOptions.find(opt => opt.value === currentSort) || sortOptions[0];

  return (
    <div className="relative" ref={sortRef}>
      <Button
        variant="secondary"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2"
      >
        <ArrowUpDown size={18} />
        <span>Sort: {currentOption.label}</span>
        <ChevronDown size={16} className={`transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </Button>

      {isOpen && (
        <div className="absolute top-12 right-0 left-0 bg-white rounded-lg shadow-lg border border-gray-200 z-10 min-w-max">
          <div className="py-1">
            {sortOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => handleSort(option.value)}
                className={`w-full px-4 py-2 text-left text-sm hover:bg-gray-100 flex items-center gap-2 transition-colors ${
                  currentSort === option.value ? 'bg-blue-50 text-blue-700' : 'text-gray-700'
                }`}
              >
                {option.icon}
                <span>{option.label}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default PropertySort;