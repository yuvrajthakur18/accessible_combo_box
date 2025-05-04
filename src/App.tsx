import React from 'react';
import ComboBox from './components/ComboBox';
import { countries } from './data/countries';

function App() {
  const handleSelectionChange = (values: string[]) => {
    console.log('Selected:', values);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 flex flex-col items-center p-8">
      <div className="w-full max-w-2xl">
        <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">
          Accessible Combo Box
        </h1>
        
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">
            Country Selector
          </h2>
          <p className="text-gray-600 mb-6">
            Start typing to search for a country, use arrow keys to navigate, and press Enter to select.
            You can select multiple countries and remove them using the backspace key or clicking the X button.
          </p>
          
          <ComboBox 
            options={countries}
            placeholder="Search countries..."
            onSelectionChange={handleSelectionChange}
            multiple={true}
          />
        </div>
      </div>
      
      <footer className="mt-auto text-gray-500 text-sm">
        Built with React, TypeScript, and Tailwind CSS
      </footer>
    </div>
  );
}

export default App;