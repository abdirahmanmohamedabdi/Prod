import React from 'react';
import { PlusIcon } from '@heroicons/react/outline';

const Button = () => {
  return (
    <div>
      <a href="/Hr/Staff/Create" className="bg-blue-500 text-white font-bold py-2 px-4 rounded flex items-center">
        <PlusIcon className="h-5 w-5 mr-2" />
        Create Employee
      </a>
    </div>
  );
};

export default Button;