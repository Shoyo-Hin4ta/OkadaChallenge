export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePhone = (phone) => {
  // Check if it's exactly 10 digits with no spaces or other characters
  const phoneRegex = /^[0-9]{10}$/;
  return phoneRegex.test(phone);
};

export const validateRequired = (value, fieldName) => {
  if (!value || value.toString().trim() === '') {
    return `${fieldName} is required`;
  }
  return '';
};

export const validatePositiveNumber = (value, fieldName) => {
  // Check if the value contains any non-numeric characters (except decimal point)
  if (value && /[^0-9.]/.test(value.toString())) {
    return `Only numbers 0-9 allowed`;
  }
  
  const num = parseFloat(value);
  if (value && (isNaN(num) || num <= 0)) {
    return `${fieldName} must be a positive number`;
  }
  return '';
};

export const validatePropertyForm = (formData) => {
  const errors = {};

  const requiredError = validateRequired(formData.address, 'Address');
  if (requiredError) errors.address = requiredError;

  // Floor is optional - no validation needed since backend accepts any string

  // Suite is optional, no validation needed

  // Size is required
  const sizeError = validateRequired(formData.size, 'Size') || 
                    validatePositiveNumber(formData.size, 'Size');
  if (sizeError) errors.size = sizeError;

  const rentError = validateRequired(formData.rent, 'Monthly rent') || 
                    validatePositiveNumber(formData.rent, 'Monthly rent');
  if (rentError) errors.rent = rentError;

  // Annual rent is required
  const annualRentError = validateRequired(formData.annual_rent, 'Annual rent') || 
                          validatePositiveNumber(formData.annual_rent, 'Annual rent');
  if (annualRentError) errors.annual_rent = annualRentError;

  const brokerNameError = validateRequired(formData.broker_name, 'Broker name');
  if (brokerNameError) errors.broker_name = brokerNameError;

  const brokerEmailError = validateRequired(formData.broker_email, 'Broker email');
  if (brokerEmailError) {
    errors.broker_email = brokerEmailError;
  } else if (!validateEmail(formData.broker_email)) {
    errors.broker_email = 'Invalid email format';
  }

  // Broker phone is optional but if provided must be 10 digits
  if (formData.broker_phone && formData.broker_phone.trim() !== '') {
    if (!validatePhone(formData.broker_phone)) {
      errors.broker_phone = 'Phone must be exactly 10 digits (no spaces or dashes)';
    }
  }

  const landlordNameError = validateRequired(formData.landlord_name, 'Landlord name');
  if (landlordNameError) errors.landlord_name = landlordNameError;

  const landlordEmailError = validateRequired(formData.landlord_email, 'Landlord email');
  if (landlordEmailError) {
    errors.landlord_email = landlordEmailError;
  } else if (!validateEmail(formData.landlord_email)) {
    errors.landlord_email = 'Invalid email format';
  }

  if (!['available', 'leased'].includes(formData.status)) {
    errors.status = 'Status must be either available or leased';
  }

  return errors;
};