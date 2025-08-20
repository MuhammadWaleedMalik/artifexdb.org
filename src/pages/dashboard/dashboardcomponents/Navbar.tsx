import { useState } from 'react';
import { FaGlobe, FaPalette } from 'react-icons/fa';

const Navbar = () => {


 


  return (
    <header className="bg-background-light border-b border-gray-200 py-[20px] px-6 flex items-center justify-between">
      <div className="flex items-center">
      
      
        
      
        <div className="relative">
       
        </div>
      </div>
      <div className="flex items-center space-x-4">
        
        




        {/* User Profile */}
        <div className="flex items-center">
          <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center text-white mr-2">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"></path>
            </svg>
          </div>
          <div>
            <div className="text-sm font-medium">{('superAdmin')}</div>
            <div className="text-xs text-text-light">{('superadmin')}</div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;