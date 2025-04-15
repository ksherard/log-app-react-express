import React, { useState, useContext, useEffect } from 'react';
import Button from '../Common/Button/Button';
import { enqueueSnackbar } from 'notistack';
import { AuthContext } from '../../context/AuthContext';

interface CreateLogDialogProps {
  onClose: () => void;
  onCreate: (logData: {
    userId: string;
    firstName: string;
    lastName: string;
    description: string;
    date: string;
    location: string;
  }) => void;
}

function CreateLogDialog({ onClose, onCreate }: CreateLogDialogProps) {
  const { currentUser } = useContext(AuthContext);
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const location = 'Seattle, WA';

  useEffect(() => {
    const now = new Date();
    const formattedDate = now.toISOString();
    setDate(formattedDate);
  }, []);

  useEffect(() => {
    if (!currentUser) {
      enqueueSnackbar('Please sign in to create a log entry.', {
        variant: 'warning',
      });
      onClose();
    }
  }, [currentUser, onClose]);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!description || !date || !location || !currentUser) {
      enqueueSnackbar('All fields are required', { variant: 'error' });
      return;
    }
    const { userId, firstName, lastName } = currentUser;
    onCreate({ userId, firstName, lastName, description, date, location });
    enqueueSnackbar('Log entry created successfully!', { variant: 'success' });
    onClose();
  };

  return (
    <div className="absolute left-1/2 top-16 -translate-x-1/2 rounded bg-white p-4 shadow-lg">
      <div className="mb-4">
        <p className="text-sm font-medium text-gray-700">
          Name: {currentUser?.firstName} {currentUser?.lastName}
        </p>
        <p className="text-sm font-medium text-gray-700">Date: {date}</p>
        <p className="text-sm font-medium text-gray-700">
          Location: {location}
        </p>
      </div>
      <form onSubmit={handleSubmit}>
        <label className="block text-sm font-medium text-gray-700">
          Description
        </label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
          required
        />

        <div className="mt-4 flex justify-end space-x-2">
          <Button type="button" variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" variant="primary">
            Create
          </Button>
        </div>
      </form>
    </div>
  );
}

export default CreateLogDialog;
