import React from 'react';
import PropertyCard from './PropertyCard';
import LoadingSpinner from '../common/LoadingSpinner';
import ErrorMessage from '../common/ErrorMessage';

const PropertyList = ({ properties, isLoading, error, onEdit, onDelete, onRetry }) => {
  if (isLoading) {
    return <LoadingSpinner size="lg" className="py-20" />;
  }

  if (error) {
    return (
      <ErrorMessage 
        message={error.message || 'Failed to load properties'} 
        onRetry={onRetry}
      />
    );
  }

  if (!properties || properties.length === 0) {
    return (
      <div className="text-center py-20">
        <p className="text-gray-600 mb-4">No properties found</p>
        <p className="text-sm text-gray-500">Add your first property to get started</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {properties.map((property) => (
        <PropertyCard
          key={property._id || property.id}
          property={property}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};

export default PropertyList;