import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

const Breadcrumbs = () => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x);

  if (pathnames.length === 0) {
    return null;
  }

  const capitalize = (s) => s.charAt(0).toUpperCase() + s.slice(1).replace(/-/g, ' ');

  return (
    <div className="container mx-auto px-4 pt-28 pb-4">
      <nav className="flex" aria-label="Breadcrumb">
        <ol className="inline-flex items-center space-x-1 md:space-x-3">
          <li className="inline-flex items-center">
            <Link to="/" className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-udsm-blue">
              Home
            </Link>
          </li>
          {pathnames.map((value, index) => {
            const to = `/${pathnames.slice(0, index + 1).join('/')}`;
            const isLast = index === pathnames.length - 1;

            return (
              <li key={to}>
                <div className="flex items-center">
                  <ChevronRight className="h-5 w-5 text-gray-400" />
                  {isLast ? (
                    <span className="ml-1 text-sm font-medium text-gray-500 md:ml-2">
                      {capitalize(value)}
                    </span>
                  ) : (
                    <Link to={to} className="ml-1 text-sm font-medium text-gray-700 hover:text-udsm-blue md:ml-2">
                      {capitalize(value)}
                    </Link>
                  )}
                </div>
              </li>
            );
          })}
        </ol>
      </nav>
    </div>
  );
};

export default Breadcrumbs;