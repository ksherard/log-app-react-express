import { useEffect, useState } from 'react';
import Layout from 'src/components/Layout/Layout';
import LogEntry from './LogEntry/LogEntry';
import Header from './Header/Header';
import { AuthProvider } from '../context/AuthProvider';
import { mockGetLogs } from '../data/mockData';
import { LogEntryType } from '@shared/interfaces/Interfaces';
import { SnackbarProvider } from 'notistack';
import Button from './Common/Button/Button';
import CreateLogDialog from './CreateLogEntry/CreateLogDialog';

import {
  getLogEntries,
  updateLogEntryById,
  deleteLogEntryById,
  createLogEntry,
} from '../services/LogEntryService';

function App() {
  const [data, setData] = useState<LogEntryType[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    getLogEntries()
      .then((response) => {
        setData(response);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        setTimeout(() => {
          setData(mockGetLogs);
          setLoading(false);
        }, 1000);
      });
  }, []);

  const handleUpdateLogEntry = async (
    id: string,
    updatedData: Partial<LogEntryType>,
  ) => {
    try {
      await updateLogEntryById(id, updatedData);
      const refreshedData = await getLogEntries();
      setData(refreshedData);
    } catch (error) {
      console.error('Error updating log entry:', error);
    }
  };

  const handleDeleteLogEntry = async (id: string) => {
    try {
      await deleteLogEntryById(id);
      const refreshedData = await getLogEntries();
      setData(refreshedData);
    } catch (error) {
      console.error('Error deleting log entry:', error);
    }
  };

  const handleCreateLogEntry = async (logData: {
    userId: string;
    firstName: string;
    lastName: string;
    description: string;
    date: string;
    location: string;
  }) => {
    try {
      console.log('log data', logData);
      const newLogEntry = await createLogEntry(logData);
      setData((prevData) => [...prevData, newLogEntry]);
      setIsDialogOpen(false);
    } catch (error) {
      console.error('Error creating log entry:', error);
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <AuthProvider>
      <SnackbarProvider
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Header />
        <div>
          <div style={{ padding: '20px' }}>
            <Button onClick={() => setIsDialogOpen(true)} variant="primary">
              Add new log
            </Button>
          </div>
        </div>
        <Layout>
          {data.map(
            ({
              logId,
              userId,
              firstName,
              lastName,
              description,
              date,
              location,
            }) => (
              <LogEntry
                key={logId}
                logId={logId}
                userId={userId}
                firstName={firstName}
                lastName={lastName}
                description={description}
                date={date}
                location={location}
                onUpdateLogEntry={handleUpdateLogEntry}
                onDeleteLogEntry={handleDeleteLogEntry}
              />
            ),
          )}
        </Layout>
        {isDialogOpen && (
          <CreateLogDialog
            onClose={() => setIsDialogOpen(false)}
            onCreate={handleCreateLogEntry}
          />
        )}
      </SnackbarProvider>
    </AuthProvider>
  );
}

export default App;
