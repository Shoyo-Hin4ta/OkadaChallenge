import { useQuery } from '@tanstack/react-query';
import { fetchProperties } from '../api/propertyApi';

export const useProperties = () => {
  return useQuery({
    queryKey: ['properties'],
    queryFn: fetchProperties,
    staleTime: 5 * 60 * 1000,
    cacheTime: 10 * 60 * 1000,
  });
};