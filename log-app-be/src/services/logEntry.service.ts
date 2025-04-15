import crypto from 'crypto';
import * as logStore from '../data/logStore';
import { LogEntryType } from '@shared/interfaces/Interfaces'

export type CreateLogEntryInput = Omit<LogEntryType, 'logId'>;
export type UpdateLogEntryInput = Partial<Omit<LogEntryType, 'logId' | 'userId'>>;


/**
 * Retrieves all log entries.
 * @returns A promise that resolves to an array of all log entries.
 */
export const getAllEntries = async (): Promise<LogEntryType[]> => {
  const entries = await logStore.findAllLogEntries();
  return Promise.resolve(entries);
};

/**
 * Retrieves a single log entry by its ID.
 * @param logId - The ID of the log entry to retrieve.
 * @returns A promise that resolves to the log entry if found, otherwise null.
 */
export const getEntryById = async (logId: string): Promise<LogEntryType | null> => {
  const entry = logStore.findLogById(logId);
  return Promise.resolve(entry || null);
};

/**
 * Adds a new log entry. Generates a unique logId.
 * Throws an error if ID generation leads to a conflict (highly unlikely with UUID).
 * @param entryData - The data for the new log entry, excluding logId.
 * @returns A promise that resolves to the newly created log entry.
 */
export const addEntry = async (entryData: CreateLogEntryInput): Promise<LogEntryType> => {
  const newEntry: LogEntryType = {
    ...entryData,
    logId: crypto.randomUUID()
  };

  try {
    // Attempt to create the log in the data store
    const createdEntry = logStore.createLog(newEntry);
    return Promise.resolve(createdEntry);
  } catch (error) {
    // Log the specific error internally (optional)
    console.error(`Service Error: Failed to add entry - ${error instanceof Error ? error.message : String(error)}`);
    // Re-throw the error to be handled by higher layers (controller/global handler)
    throw error;
  }
};

/**
 * Modifies an existing log entry.
 * @param logId - The ID of the log entry to modify.
 * @param updates - An object containing the properties to update.
 * @returns A promise that resolves to the updated log entry if found and updated, otherwise null.
 */
export const modifyEntry = async (
  logId: string,
  updates: UpdateLogEntryInput
): Promise<LogEntryType | null> => {
  // Optional: Add business logic validation here before attempting update
  const updatedEntry = logStore.updateLog(logId, updates);
  return Promise.resolve(updatedEntry || null); // Return null if not found
};

/**
 * Removes a log entry by its ID.
 * @param logId - The ID of the log entry to remove.
 * @returns A promise that resolves to true if the entry was successfully deleted, otherwise false.
 */
export const removeEntry = async (logId: string): Promise<boolean> => {
  const success = logStore.deleteLog(logId);
  return Promise.resolve(success);
};