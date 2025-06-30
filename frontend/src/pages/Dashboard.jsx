import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import PropertyList from '../components/property/PropertyList';
import PropertyFilters from '../components/property/PropertyFilters';
import PropertySort from '../components/property/PropertySort';
import Modal from '../components/common/Modal';
import Button from '../components/common/Button';
import { useProperties } from '../hooks/useProperties';
import { useDeleteProperty } from '../hooks/usePropertyMutations';

const Dashboard = () => {
  const navigate = useNavigate();
  const { data: properties, isLoading, error, refetch } = useProperties();
  const deleteMutation = useDeleteProperty();
  
  const [propertyToDelete, setPropertyToDelete] = useState(null);
  const [filters, setFilters] = useState({
    minRent: null,
    maxRent: null,
    minSize: null,
    maxSize: null
  });
  const [sortBy, setSortBy] = useState('created_desc');

  const handleEdit = (property) => {
    navigate(`/properties/edit/${property._id || property.id}`, { state: { property } });
  };

  const handleDelete = (property) => {
    setPropertyToDelete(property);
  };

  const confirmDelete = () => {
    if (propertyToDelete) {
      deleteMutation.mutate(propertyToDelete._id || propertyToDelete.id);
      setPropertyToDelete(null);
    }
  };

  const handleApplyFilters = (newFilters) => {
    setFilters(newFilters);
  };

  const handleClearFilters = () => {
    setFilters({
      minRent: null,
      maxRent: null,
      minSize: null,
      maxSize: null
    });
  };

  // Filter and sort properties
  const filteredAndSortedProperties = useMemo(() => {
    if (!properties) return [];
    
    // First, filter properties
    let filtered = properties.filter(property => {
      // Filter by rent
      if (filters.minRent !== null && property.rent < filters.minRent) return false;
      if (filters.maxRent !== null && property.rent > filters.maxRent) return false;
      
      // Filter by size
      if (filters.minSize !== null && property.size < filters.minSize) return false;
      if (filters.maxSize !== null && property.size > filters.maxSize) return false;
      
      return true;
    });

    // Then, sort the filtered properties
    const sorted = [...filtered].sort((a, b) => {
      switch (sortBy) {
        case 'created_desc':
          // Assuming _id contains timestamp info (MongoDB ObjectId)
          return (b._id || b.id || '').localeCompare(a._id || a.id || '');
        case 'created_asc':
          return (a._id || a.id || '').localeCompare(b._id || b.id || '');
        case 'price_desc':
          return (b.rent || 0) - (a.rent || 0);
        case 'price_asc':
          return (a.rent || 0) - (b.rent || 0);
        case 'size_desc':
          return (b.size || 0) - (a.size || 0);
        case 'size_asc':
          return (a.size || 0) - (b.size || 0);
        default:
          return 0;
      }
    });

    return sorted;
  }, [properties, filters, sortBy]);

  return (
    <div>
      <div className="mb-8">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Properties</h2>
            <p className="text-gray-600 mt-1">Manage your property listings</p>
          </div>
          <div className="flex gap-3">
            <PropertySort
              onSortChange={setSortBy}
              currentSort={sortBy}
            />
            <PropertyFilters
              onApplyFilters={handleApplyFilters}
              onClearFilters={handleClearFilters}
            />
          </div>
        </div>
      </div>

      <PropertyList
        properties={filteredAndSortedProperties}
        isLoading={isLoading}
        error={error}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onRetry={refetch}
      />

      <Modal
        isOpen={!!propertyToDelete}
        onClose={() => setPropertyToDelete(null)}
        title="Delete Property"
        actions={
          <>
            <Button
              variant="secondary"
              onClick={() => setPropertyToDelete(null)}
            >
              Cancel
            </Button>
            <Button
              variant="danger"
              onClick={confirmDelete}
              disabled={deleteMutation.isPending}
            >
              {deleteMutation.isPending ? 'Deleting...' : 'Delete'}
            </Button>
          </>
        }
      >
        <p className="text-gray-600">
          Are you sure you want to delete the property at{' '}
          <strong>{propertyToDelete?.address}</strong>? This action cannot be
          undone.
        </p>
      </Modal>
    </div>
  );
};

export default Dashboard;