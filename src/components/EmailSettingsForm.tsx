'use client';
import React, { useState } from 'react';

const EmailSettingsForm: React.FC = () => {
  const [selectedEmail, setSelectedEmail] = useState<string>('');
  const [file, setFile] = useState<File | null>(null);
  const [textInput, setTextInput] = useState<string>('');
  const [numberInput, setNumberInput] = useState<number>(0);
  const [checkboxInput, setCheckboxInput] = useState<boolean>(false);
  const [radioInput, setRadioInput] = useState<string>('');
  const [textareaInput, setTextareaInput] = useState<string>('');
  const verifiedEmails = ['email1@example.com', 'email2@example.com', 'email3@example.com']; // Replace with actual verified emails

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log('Form Data:', {
      selectedEmail,
      file: file ? file.name : null,
      textInput,
      numberInput,
      checkboxInput,
      radioInput,
      textareaInput
    });
  };

  return (
    <form onSubmit={handleSubmit} className="p-8 max-w-md mx-auto bg-white dark:bg-black rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Email Settings</h2>
      
      {/* Email Dropdown */}
      <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
        Email
      </label>
      <select
        value={selectedEmail}
        onChange={(e) => setSelectedEmail(e.target.value)}
        className="block w-full p-2 border border-gray-300 rounded-md dark:bg-gray-800 dark:border-gray-600 dark:text-gray-300"
      >
        <option value="" disabled>Select a verified email to display</option>
        {verifiedEmails.map((email) => (
          <option key={email} value={email}>{email}</option>
        ))}
      </select>

      {/* Text Input */}
      <label className="block mt-4 mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
        Text Input
      </label>
      <input
        type="text"
        value={textInput}
        onChange={(e) => setTextInput(e.target.value)}
        className="block w-full p-2 border border-gray-300 rounded-md dark:bg-gray-800 dark:border-gray-600 dark:text-gray-300"
      />

      {/* Number Input */}
      <label className="block mt-4 mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
        Number Input
      </label>
      <input
        type="number"
        value={numberInput}
        onChange={(e) => setNumberInput(parseInt(e.target.value))}
        className="block w-full p-2 border border-gray-300 rounded-md dark:bg-gray-800 dark:border-gray-600 dark:text-gray-300"
      />

      {/* Checkbox Input */}
      <label className="block mt-4 mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
        Checkbox Input
      </label>
      <input
        type="checkbox"
        checked={checkboxInput}
        onChange={(e) => setCheckboxInput(e.target.checked)}
        className="block w-full p-2 border border-gray-300 rounded-md dark:bg-gray-800 dark:border-gray-600 dark:text-gray-300"
      />

      {/* Radio Input */}
      <label className="block mt-4 mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
        Radio Input
      </label>
      <div className="flex items-center space-x-4">
        <label>
          <input
            type="radio"
            value="Option1"
            checked={radioInput === 'Option1'}
            onChange={(e) => setRadioInput(e.target.value)}
          /> Option1
        </label>
        <label>
          <input
            type="radio"
            value="Option2"
            checked={radioInput === 'Option2'}
            onChange={(e) => setRadioInput(e.target.value)}
          /> Option2
        </label>
      </div>

      {/* Textarea Input */}
      <label className="block mt-4 mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
        Textarea Input
      </label>
      <textarea
        value={textareaInput}
        onChange={(e) => setTextareaInput(e.target.value)}
        className="block w-full p-2 border border-gray-300 rounded-md dark:bg-gray-800 dark:border-gray-600 dark:text-gray-300"
      />

      {/* File Input */}
      <label className="block mt-4 mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
        Upload File
      </label>
      <input
        type="file"
        onChange={(e) => {
          if (e.target.files) {
            setFile(e.target.files[0]);
          }
        }}
        className="block w-full p-2 border border-gray-300 rounded-md dark:bg-gray-800 dark:border-gray-600 dark:text-gray-300"
      />

      <button
        type="submit"
        className="mt-4 w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
      >
        Submit
      </button>
    </form>
  );
};

export default EmailSettingsForm;