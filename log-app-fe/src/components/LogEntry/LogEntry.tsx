import { FC, useContext, useState } from 'react';
import { LogEntryType } from '@shared/interfaces/Interfaces';
import { AuthContext } from '../../context/AuthContext';
import { FaTrash } from 'react-icons/fa';

interface LogEntryProps extends LogEntryType {
  onUpdateLogEntry: (
    id: string,
    updatedData: Partial<LogEntryType>,
  ) => Promise<void>;
  onDeleteLogEntry: (id: string) => Promise<void>;
}

const LogEntry: FC<LogEntryProps> = ({
  logId,
  userId,
  firstName,
  lastName,
  description,
  date,
  location,
  onUpdateLogEntry,
  onDeleteLogEntry,
}) => {
  const { currentUser } = useContext(AuthContext);
  const [isEditing, setIsEditing] = useState(false);
  const [editedDescription, setEditedDescription] = useState(description);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditedDescription(e.target.value);
  };

  const handleSaveClick = () => {
    setIsEditing(false);
    onUpdateLogEntry(logId, { description: editedDescription });
  };

  const handleCancelClick = () => {
    setIsEditing(false);
  };

  const handleDeleteClick = () => {
    onDeleteLogEntry(logId);
  };

  const formattedDate = new Date(date).toLocaleString();

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-md">
      <div className="flex items-center justify-between">
        <span className="text-xl font-semibold text-gray-800">
          {firstName} {lastName}
        </span>
        {currentUser?.userId === userId && (
          <button
            className="text-gray-400 hover:text-gray-600"
            aria-label="Delete"
            onClick={handleDeleteClick}
          >
            <FaTrash className="text-red-400" />
          </button>
        )}
      </div>
      {isEditing ? (
        <input
          type="text"
          value={editedDescription}
          onChange={handleInputChange}
          className="mt-2 w-full rounded border border-gray-300 p-2 text-gray-800"
        />
      ) : (
        <p className="mt-2 text-gray-600">{description}</p>
      )}
      {currentUser?.userId === userId &&
        (isEditing ? (
          <div className="mt-4 flex justify-end space-x-2">
            <button
              className="text-blue-500 hover:underline"
              onClick={handleSaveClick}
              aria-label="Save"
            >
              save
            </button>
            <button
              className="text-blue-500 hover:underline"
              onClick={handleCancelClick}
              aria-label="Cancel"
            >
              cancel
            </button>
          </div>
        ) : (
          <button
            className="text-blue-500 hover:underline"
            onClick={handleEditClick}
            aria-label="Edit"
          >
            edit
          </button>
        ))}
      <div className="mt-4 text-sm text-gray-500">
        <p>
          <strong>Date:</strong> {formattedDate}
        </p>
        <p>
          <strong>Location:</strong> {location}
        </p>
      </div>
    </div>
  );
};

export default LogEntry;
