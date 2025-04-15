import React, { useState, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { mockUsers } from 'src/data/mockData';
import { enqueueSnackbar } from 'notistack';
import Button from '../Common/Button/Button';

interface DialogProps {
  onClose: () => void;
}

// Ideally this would be a reusable component since we have use for dialogs in multiple places.
function Dialog({ onClose }: DialogProps) {
  const [email, setEmail] = useState('kevin.sherard@example.com');
  const authContext = useContext(AuthContext);

  if (!authContext) {
    throw new Error('AuthContext must be used within an AuthProvider');
    enqueueSnackbar('AuthContext must be used within an AuthProvider', {
      variant: 'error',
      autoHideDuration: 3000,
    });
  }

  const { setCurrentUser } = authContext;

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const user = mockUsers.find((user) => user.email === email);
    if (!user) {
      enqueueSnackbar('User not found', {
        variant: 'error',
      });
      return;
    }

    if (user) {
      setCurrentUser(user);
      enqueueSnackbar(`Welcome back, ${user.firstName}!`, {
        variant: 'success',
        autoHideDuration: 3000,
      });
    }
    onClose();
  };

  return (
    <div className="absolute left-1/2 top-16 -translate-x-1/2 rounded bg-white p-4 shadow-lg">
      <form onSubmit={handleSubmit}>
        <label
          htmlFor="email"
          className="block text-sm font-medium text-gray-700"
        >
          Email Address
        </label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
          required
        />
        <div>
          <div className="mt-2 text-sm text-gray-500">
            Please enter your email address to log in.
          </div>
          <div className="mt-2 text-sm text-gray-500">
            (try kevin.sherard@example.com)
          </div>
        </div>
        <div className="mt-4 flex justify-end space-x-2">
          <Button type="button" variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" variant="primary">
            OK
          </Button>
        </div>
      </form>
    </div>
  );
}

export default Dialog;
