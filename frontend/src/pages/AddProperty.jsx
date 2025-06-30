import React from 'react';
import { useNavigate } from 'react-router-dom';
import PropertyForm from '../components/property/PropertyForm';
import { useCreateProperty } from '../hooks/usePropertyMutations';

const AddProperty = () => {
  const navigate = useNavigate();
  const createMutation = useCreateProperty();

  const handleSubmit = async (propertyData) => {
    createMutation.mutate(propertyData, {
      onSuccess: () => {
        navigate('/');
      },
    });
  };

  const handleCancel = () => {
    navigate('/');
  };

  return (
    <div>
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900">Add New Property</h2>
        <p className="text-gray-600 mt-1">Enter the property details below</p>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-6">
        <PropertyForm
          onSubmit={handleSubmit}
          onCancel={handleCancel}
          isSubmitting={createMutation.isPending}
        />
      </div>
    </div>
  );
};

export default AddProperty;