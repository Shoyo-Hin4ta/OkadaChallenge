import React from 'react';
import { Building2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import Button from '../common/Button';

const Header = () => {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4 sm:py-0 sm:h-16">
          <Link to="/" className="flex items-center gap-2">
            <Building2 className="text-blue-600 flex-shrink-0" size={24} />
            <h1 className="text-lg sm:text-xl font-semibold text-gray-900">
              Property Management
            </h1>
          </Link>
          
          <Link to="/properties/add">
            <Button variant="primary" size="sm" className="sm:text-base sm:px-4 sm:py-2">
              Add Property
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;