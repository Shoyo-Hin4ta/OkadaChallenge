import React from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import PropertyForm from '../components/property/PropertyForm';
import { useUpdateProperty } from '../hooks/usePropertyMutations';

const EditProperty = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const updateMutation = useUpdateProperty();
  
  // Get property data from navigation state
  const property = location.state?.property;

  const handleSubmit = async (propertyData) => {
    updateMutation.mutate(
      { id, data: propertyData },
      {
        onSuccess: () => {
          navigate('/');
        },
      }
    );
  };

  const handleCancel = () => {
    navigate('/');
  };

  // If no property data in state, redirect to dashboard
  if (!property) {
    navigate('/');
    return null;
  }

  return (
    <div>
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900">Edit Property</h2>
        <p className="text-gray-600 mt-1">Update the property details below</p>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-6">
        <PropertyForm
          initialData={property}
          onSubmit={handleSubmit}
          onCancel={handleCancel}
          isSubmitting={updateMutation.isPending}
        />
      </div>
    </div>
  );
};

export default EditProperty;