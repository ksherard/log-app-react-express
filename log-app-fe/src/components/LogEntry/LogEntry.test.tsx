import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';
import { AuthContext } from '../../context/AuthContext';
import LogEntry from './LogEntry';

const mockLogEntry = {
  logId: '1',
  userId: '123',
  firstName: 'John',
  lastName: 'Doe',
  description: 'Test log entry',
  date: '2025-04-10T10:00:00Z',
  location: 'Test Location',
};

describe('LogEntry Component', () => {
  it('renders the full name correctly', () => {
    const { getByText } = render(
      <LogEntry
        firstName="John"
        lastName="Doe"
        description="Test description"
        date="2023-03-15T12:00:00Z"
        location="New York"
        logId="1"
        userId="1"
      />,
    );
    expect(getByText('John Doe')).toBeInTheDocument();
  });

  it('renders the description correctly', () => {
    const { getByText } = render(
      <LogEntry
        firstName="John"
        lastName="Doe"
        description="Test description"
        date="2023-03-15T12:00:00Z"
        location="New York"
        logId="1"
        userId="1"
      />,
    );
    expect(getByText('Test description')).toBeInTheDocument();
  });

  it('renders the location correctly', () => {
    const { getByText } = render(
      <LogEntry
        firstName="John"
        lastName="Doe"
        description="Test description"
        date="2023-03-15T12:00:00Z"
        location="New York"
        logId="1"
        userId="1"
      />,
    );
    expect(getByText('New York')).toBeInTheDocument();
  });

  it('should display edit and delete buttons when userId matches currentUser userId', () => {
    render(
      <AuthContext.Provider
        value={{
          currentUser: {
            userId: '123',
            email: 'test@example.com',
            firstName: 'Test',
            lastName: 'User',
          },
          setCurrentUser: vi.fn(), // Added mock implementation for setCurrentUser
        }}
      >
        <LogEntry {...mockLogEntry} />
      </AuthContext.Provider>,
    );

    expect(screen.getByLabelText('Delete')).toBeInTheDocument();
    expect(screen.getByLabelText('Edit')).toBeInTheDocument();
  });

  it('should not display edit and delete buttons when userId does not match currentUser userId', () => {
    render(
      <AuthContext.Provider
        value={{
          currentUser: {
            userId: '456',
            email: 'another@example.com',
            firstName: 'Test',
            lastName: 'User',
          },
          setCurrentUser: vi.fn(), // Added mock implementation for setCurrentUser
        }}
      >
        <LogEntry {...mockLogEntry} />
      </AuthContext.Provider>,
    );

    expect(screen.queryByLabelText('Delete')).not.toBeInTheDocument();
    expect(screen.queryByLabelText('Edit')).not.toBeInTheDocument();
  });
});
