const API_BASE = 'http://localhost:8000/api/properties';

export const fetchProperties = async () => {
  const response = await fetch(API_BASE);
  if (!response.ok) {
    throw new Error('Failed to fetch properties');
  }
  const data = await response.json();
  // Map _id to id for consistency in frontend
  return data.map(property => ({
    ...property,
    id: property._id
  }));
};

// Note: Single property endpoint not needed - we pass property data through navigation state

export const createProperty = async (propertyData) => {
  const response = await fetch(API_BASE, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(propertyData),
  });
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.detail || 'Failed to create property');
  }
  return response.json();
};

export const updateProperty = async (id, propertyData) => {
  const response = await fetch(`${API_BASE}/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(propertyData),
  });
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.detail || 'Failed to update property');
  }
  return response.json();
};

export const deleteProperty = async (id) => {
  const response = await fetch(`${API_BASE}/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) {
    throw new Error('Failed to delete property');
  }
  return response.json();
};