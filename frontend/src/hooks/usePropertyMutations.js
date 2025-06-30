import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createProperty, updateProperty, deleteProperty } from '../api/propertyApi';
import { useNotification } from './useNotification';

export const useCreateProperty = () => {
  const queryClient = useQueryClient();
  const notify = useNotification();

  return useMutation({
    mutationFn: createProperty,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['properties'] });
      notify.success('Property created successfully');
    },
    onError: (error) => {
      notify.error(error.message || 'Failed to create property');
    },
  });
};

export const useUpdateProperty = () => {
  const queryClient = useQueryClient();
  const notify = useNotification();

  return useMutation({
    mutationFn: ({ id, data }) => updateProperty(id, data),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: ['properties'] });
      queryClient.invalidateQueries({ queryKey: ['property', id] });
      notify.success('Property updated successfully');
    },
    onError: (error) => {
      notify.error(error.message || 'Failed to update property');
    },
  });
};

export const useDeleteProperty = () => {
  const queryClient = useQueryClient();
  const notify = useNotification();

  return useMutation({
    mutationFn: deleteProperty,
    onMutate: async (id) => {
      await queryClient.cancelQueries({ queryKey: ['properties'] });
      
      const previousProperties = queryClient.getQueryData(['properties']);
      
      queryClient.setQueryData(['properties'], (old) => 
        old ? old.filter(property => (property._id || property.id) !== id) : []
      );
      
      return { previousProperties };
    },
    onError: (err, id, context) => {
      if (context?.previousProperties) {
        queryClient.setQueryData(['properties'], context.previousProperties);
      }
      notify.error('Failed to delete property');
    },
    onSuccess: () => {
      notify.success('Property deleted successfully');
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['properties'] });
    },
  });
};