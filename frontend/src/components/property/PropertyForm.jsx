import React, { useState, useEffect } from 'react';
import Button from '../common/Button';
import StatusDropdown from './StatusDropdown';
import { validatePropertyForm, validatePositiveNumber } from '../../utils/validators';

const PropertyForm = ({ initialData = {}, onSubmit, onCancel, isSubmitting }) => {
  const [formData, setFormData] = useState({
    address: '',
    floor: '',
    suite: '',
    size: '',
    rent: '',
    annual_rent: '',
    status: 'available',
    broker_name: '',
    broker_email: '',
    broker_phone: '',
    landlord_name: '',
    landlord_email: '',
    ...initialData
  });

  const [errors, setErrors] = useState({});

  // Auto-calculate annual rent when monthly rent changes
  // Only if the user hasn't manually edited annual rent
  useEffect(() => {
    // Don't auto-calculate if user is manually editing annual rent
    if (document.activeElement?.name === 'annual_rent') return;
    
    const monthlyRent = parseFloat(formData.rent);
    if (!isNaN(monthlyRent) && monthlyRent > 0) {
      setFormData(prev => ({
        ...prev,
        annual_rent: (monthlyRent * 12).toString()
      }));
    }
  }, [formData.rent]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    // For numeric fields, validate in real-time
    const numericFields = ['floor', 'size', 'rent', 'annual_rent'];
    if (numericFields.includes(name) && value) {
      const error = validatePositiveNumber(value, name);
      if (error === 'Only numbers 0-9 allowed') {
        setErrors(prev => ({
          ...prev,
          [name]: error
        }));
        return; // Don't update the value if it contains letters
      }
    }
    
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear errors when user types valid input
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleStatusChange = (value) => {
    setFormData(prev => ({
      ...prev,
      status: value
    }));
    
    if (errors.status) {
      setErrors(prev => ({
        ...prev,
        status: ''
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const validationErrors = validatePropertyForm(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    // Remove _id field but keep id for backend
    const { _id, ...cleanFormData } = formData;
    
    const submitData = {
      ...cleanFormData,
      id: formData.id ? parseInt(formData.id) : Math.floor(Math.random() * 1000000),  // Backend expects id as int
      floor: formData.floor || undefined,  // Keep as string since backend expects Optional[str]
      suite: formData.suite || undefined,
      size: formData.size ? parseInt(formData.size) : undefined,
      rent: parseFloat(formData.rent),
      annual_rent: parseFloat(formData.annual_rent),
      broker_phone: formData.broker_phone || 'N/A'  // Backend requires this field
    };

    onSubmit(submitData);
  };

  const inputClass = (fieldName) => `
    w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500
    ${errors[fieldName] ? 'border-red-500' : 'border-gray-300'}
  `;

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Property Details</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Address *
            </label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className={inputClass('address')}
            />
            {errors.address && (
              <p className="text-red-500 text-sm mt-1">{errors.address}</p>
            )}
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Floor
            </label>
            <input
              type="text"
              name="floor"
              value={formData.floor}
              onChange={handleChange}
              className={inputClass('floor')}
            />
            {errors.floor && (
              <p className="text-red-500 text-sm mt-1">{errors.floor}</p>
            )}
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Suite
            </label>
            <input
              type="text"
              name="suite"
              value={formData.suite}
              onChange={handleChange}
              className={inputClass('suite')}
            />
            {errors.suite && (
              <p className="text-red-500 text-sm mt-1">{errors.suite}</p>
            )}
          </div>
          
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Size (sq ft) *
            </label>
            <input
              type="number"
              name="size"
              value={formData.size}
              onChange={handleChange}
              className={inputClass('size')}
              placeholder="e.g., 1500"
            />
            {errors.size && (
              <p className="text-red-500 text-sm mt-1">{errors.size}</p>
            )}
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Pricing</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Monthly Rent *
            </label>
            <input
              type="number"
              name="rent"
              value={formData.rent}
              onChange={handleChange}
              className={inputClass('rent')}
              placeholder="0"
            />
            {errors.rent && (
              <p className="text-red-500 text-sm mt-1">{errors.rent}</p>
            )}
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Annual Rent *
            </label>
            <input
              type="number"
              name="annual_rent"
              value={formData.annual_rent}
              onChange={handleChange}
              className={inputClass('annual_rent')}
              placeholder="Auto-calculated or enter custom value"
            />
            {errors.annual_rent && (
              <p className="text-red-500 text-sm mt-1">{errors.annual_rent}</p>
            )}
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Status</h3>
        <StatusDropdown
          value={formData.status}
          onChange={handleStatusChange}
          error={errors.status}
          required={true}
        />
      </div>

      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Contact Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Broker Name *
            </label>
            <input
              type="text"
              name="broker_name"
              value={formData.broker_name}
              onChange={handleChange}
              className={inputClass('broker_name')}
            />
            {errors.broker_name && (
              <p className="text-red-500 text-sm mt-1">{errors.broker_name}</p>
            )}
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Broker Email *
            </label>
            <input
              type="email"
              name="broker_email"
              value={formData.broker_email}
              onChange={handleChange}
              className={inputClass('broker_email')}
            />
            {errors.broker_email && (
              <p className="text-red-500 text-sm mt-1">{errors.broker_email}</p>
            )}
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Broker Phone
            </label>
            <input
              type="text"
              name="broker_phone"
              value={formData.broker_phone}
              onChange={handleChange}
              className={inputClass('broker_phone')}
              placeholder="1234567890"
              maxLength="10"
            />
            {errors.broker_phone && (
              <p className="text-red-500 text-sm mt-1">{errors.broker_phone}</p>
            )}
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Landlord Name *
            </label>
            <input
              type="text"
              name="landlord_name"
              value={formData.landlord_name}
              onChange={handleChange}
              className={inputClass('landlord_name')}
            />
            {errors.landlord_name && (
              <p className="text-red-500 text-sm mt-1">{errors.landlord_name}</p>
            )}
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Landlord Email *
            </label>
            <input
              type="email"
              name="landlord_email"
              value={formData.landlord_email}
              onChange={handleChange}
              className={inputClass('landlord_email')}
            />
            {errors.landlord_email && (
              <p className="text-red-500 text-sm mt-1">{errors.landlord_email}</p>
            )}
          </div>
        </div>
      </div>

      <div className="flex justify-end gap-4 pt-4">
        <Button
          type="button"
          variant="secondary"
          onClick={onCancel}
          disabled={isSubmitting}
        >
          Cancel
        </Button>
        <Button
          type="submit"
          variant="primary"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Saving...' : 'Save Property'}
        </Button>
      </div>
    </form>
  );
};

export default PropertyForm;