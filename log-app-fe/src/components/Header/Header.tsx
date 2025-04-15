import React, { useState, useContext } from 'react';
import Dialog from './Dialog';
import { AuthContext } from '../../context/AuthContext';

function Header() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { currentUser } = useContext(AuthContext);

  const toggleDialog = () => {
    setIsDialogOpen(!isDialogOpen);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      toggleDialog();
    }
  };

  return (
    <header className="relative flex items-center justify-between border-b border-gray-300 bg-gray-100 p-4">
      <h1 className="m-0 text-xl font-semibold text-gray-800">All Logs</h1>
      {currentUser ? (
        <span className="font-medium text-gray-700">
          Hello, {currentUser.firstName}
        </span>
      ) : (
        <button
          className="rounded-full bg-gray-200 p-2 hover:bg-gray-300 focus:outline-none focus-visible:ring focus-visible:ring-blue-500"
          onClick={toggleDialog}
          onKeyDown={handleKeyDown}
          aria-pressed={isDialogOpen}
          tabIndex={0}
        >
          Sign In 👤
        </button>
      )}
      {isDialogOpen && <Dialog onClose={toggleDialog} />}
    </header>
  );
}

export default Header;
