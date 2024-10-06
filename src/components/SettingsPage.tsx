import React from 'react';
import Image from 'next/image';
import EmailSettingsForm from './EmailSettingsForm'; // Import the new form component

const SettingsPage: React.FC = () => {
  return (
    <div className="p-8 max-w-4xl mx-auto page-padding"> {/* Adjust padding to match the height of your navbar */}
      <h1 className="text-4xl font-bold mb-2">Settings</h1>
      <p className="text-gray-500 mb-8">You can manage your account, billing, and team settings here.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="basic-info">
          <h2 className="text-xl font-semibold mb-4">Basic Info</h2>
          <div className="flex items-center mb-4">
            <Image src="/placeholder-avatar.jpg" alt="User Avatar" width={48} height={48} className="rounded-full mr-4" />
            <div>
              <p className="font-medium">John Doe</p>
              <p className="text-gray-500">johndoe@example.com</p>
            </div>
          </div>
          <div className="space-y-2">
            <button className="bg-blue-600 text-white px-4 py-2 rounded-md mr-2">Change # of Fast Requests</button>
            <button className="bg-gray-200 text-gray-800 px-4 py-2 rounded-md">Manage Subscription</button>
          </div>
          <button className="text-gray-500 mt-2">Advanced ▼</button>
        </div>

        <div className="usage">
          <h2 className="text-xl font-semibold mb-4">Usage</h2>
          <div className="space-y-4">
            <div>
              <h3 className="font-medium">Premium models ⓘ</h3>
              <div className="bg-gray-200 rounded-full h-2 mt-2">
                <div className="bg-green-400 h-2 rounded-full" style={{ width: '28%' }}></div>
              </div>
              <p className="text-sm mt-1">You've used 139 requests out of your 500 monthly fast requests quota.</p>
            </div>
            <div>
              <h3 className="font-medium">gpt-4o-mini or cursor-small</h3>
              <div className="bg-gray-200 rounded-full h-2 mt-2">
                <div className="bg-green-400 h-2 rounded-full" style={{ width: '40%' }}></div>
              </div>
              <p className="text-sm mt-1">You've used 40 fast requests of this model. You have no monthly quota.</p>
            </div>
          </div>
          <button className="text-gray-500 mt-4">Optional Usage-Based Pricing ▼</button>
        </div>
      </div>

      {/* Add the EmailSettingsForm component here */}
      <EmailSettingsForm />
    </div>
  );
};

export default SettingsPage;