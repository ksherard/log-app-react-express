import { LogEntryType } from '@shared/interfaces/Interfaces';
import axios from 'axios';

const baseUrl = import.meta.env.VITE_API_URL;

export const getLogEntries = async (): Promise<LogEntryType[]> => {
  try {
    const response = await axios.get<LogEntryType[]>(baseUrl);
    return response.data;
  } catch (error) {
    console.error('Error fetching log entries:', error);
    throw error;
  }
};

export const updateLogEntryById = async (
  id: string,
  updatedData: Partial<LogEntryType>,
): Promise<LogEntryType> => {
  const url = `${baseUrl}/${id}`;
  try {
    const response = await axios.patch<LogEntryType>(url, updatedData);
    return response.data;
  } catch (error) {
    console.error('Error updating log entry:', error);
    throw error;
  }
};

export const createLogEntry = async (
  newLogEntry: Omit<LogEntryType, 'logId'>,
): Promise<LogEntryType> => {
  try {
    const response = await axios.post<LogEntryType>(baseUrl, newLogEntry);
    return response.data;
  } catch (error) {
    console.error('Error creating log entry:', error);
    throw error;
  }
};

export const deleteLogEntryById = async (id: string): Promise<void> => {
  const url = `${baseUrl}/${id}`;
  try {
    await axios.delete(url);
  } catch (error) {
    console.error('Error deleting log entry:', error);
    throw error;
  }
};
