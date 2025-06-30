import React from 'react';
import { MapPin, Home, DollarSign, Phone, Mail, User, Building2 } from 'lucide-react';
import PropertyActions from './PropertyActions';

const PropertyCard = ({ property, onEdit, onDelete }) => {
  const isAvailable = property.status === 'available';
  const statusStyles = isAvailable 
    ? 'bg-green-50 text-green-700 border-green-200' 
    : 'bg-red-50 text-red-700 border-red-200';
  const statusText = isAvailable ? 'Available' : 'Leased';

  return (
    <div className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
      {/* Mobile: Stack vertically, Desktop: Side by side */}
      <div className="lg:flex">
        {/* Left section - Visual element */}
        <div className="relative lg:w-80 bg-gradient-to-br from-blue-600 to-indigo-700 p-6 lg:p-8">
          <div className="absolute top-0 right-0 opacity-10">
            <Building2 size={120} />
          </div>
          <div className="relative z-10 text-white flex flex-col h-full">
            <div className="flex-1">
              <Home size={40} className="mb-3" />
              <h4 className="text-lg font-semibold mb-1">Premium Property</h4>
              <p className="text-sm opacity-90 mb-2">
                {property.size ? `${property.size.toLocaleString()} sq ft` : 'Commercial Space'}
              </p>
            </div>
            {/* Status badge - now part of the flow */}
            <div className="mt-4">
              <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${statusStyles}`}>
                {statusText}
              </span>
            </div>
          </div>
        </div>

        {/* Right section - Property details */}
        <div className="flex-1 p-6 lg:p-8">
          {/* Header with address and actions */}
          <div className="flex justify-between items-start mb-4">
            <div className="flex-1 mr-4">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                {property.address}
              </h3>
              {(property.floor || property.suite) && (
                <div className="flex items-center text-gray-600 text-sm">
                  <MapPin size={16} className="mr-2 flex-shrink-0" />
                  <span>
                    {property.floor && `Floor ${property.floor}`}
                    {property.floor && property.suite && ', '}
                    {property.suite && `Suite ${property.suite}`}
                  </span>
                </div>
              )}
            </div>
            <PropertyActions
              onEdit={() => onEdit(property)}
              onDelete={() => onDelete(property)}
            />
          </div>

          {/* Price section */}
          <div className="mb-6">
            <div className="flex items-baseline">
              <DollarSign size={24} className="text-blue-600 mr-1" />
              <span className="text-3xl font-bold text-gray-900">
                {property.rent?.toLocaleString()}
              </span>
              <span className="text-gray-600 ml-2">/month</span>
            </div>
            <p className="text-sm text-gray-500 mt-1 ml-8">
              ${property.annual_rent?.toLocaleString()} per year
            </p>
          </div>

          {/* Contact Information Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Broker Info */}
            <div className="space-y-2">
              <h4 className="text-sm font-semibold text-gray-700 flex items-center">
                <User size={16} className="mr-1" />
                Broker Information
              </h4>
              <div className="space-y-1 text-sm">
                <p className="text-gray-600">{property.broker_name}</p>
                <p className="flex items-center text-gray-600">
                  <Mail size={14} className="mr-2" />
                  <span className="truncate">{property.broker_email}</span>
                </p>
                {property.broker_phone && (
                  <p className="flex items-center text-gray-600">
                    <Phone size={14} className="mr-2" />
                    {property.broker_phone}
                  </p>
                )}
              </div>
            </div>

            {/* Landlord Info */}
            <div className="space-y-2">
              <h4 className="text-sm font-semibold text-gray-700 flex items-center">
                <Building2 size={16} className="mr-1" />
                Landlord Information
              </h4>
              <div className="space-y-1 text-sm">
                <p className="text-gray-600">{property.landlord_name}</p>
                <p className="flex items-center text-gray-600">
                  <Mail size={14} className="mr-2" />
                  <span className="truncate">{property.landlord_email}</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;