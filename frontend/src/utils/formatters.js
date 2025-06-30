export const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

export const formatNumber = (number) => {
  return new Intl.NumberFormat('en-US').format(number);
};

export const formatPropertyData = (data) => {
  return {
    ...data,
    floor: parseInt(data.floor),
    size: data.size ? parseFloat(data.size) : undefined,
    rent: parseFloat(data.rent),
    annual_rent: parseFloat(data.annual_rent),
  };
};