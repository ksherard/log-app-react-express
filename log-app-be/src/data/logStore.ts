import { LogEntryType } from '@shared/interfaces/Interfaces'
import { logEntriesData } from './logEntriesSeedData'

const logEntries = new Map<string, LogEntryType>();

const loadLogEntriesData = () => {
    try {
      logEntries.clear();
      // Type assertion can be useful here if TS doesn't automatically infer correctly
      (logEntriesData as LogEntryType[]).forEach(entry => {
        if (entry.logId) {
          logEntries.set(entry.logId, entry);
        } else {
          console.warn('Seed entry missing logId, skipping:', entry);
        }
      });
      console.log(`Successfully loaded ${logEntries.size} log entries from seed file.`);
    } catch (error) {
        console.error('Error loading seed data:', error);
    }
  }

  loadLogEntriesData();

  // LIST ALL
  export const findAllLogEntries = (): LogEntryType[] => {
    return Array.from(logEntries.values());
  };
  
  // FIND BY ID
  export const findLogById = (logId: string): LogEntryType | undefined => {
    return logEntries.get(logId);
  };
  
  // CREATE
  export const createLog = (entry: LogEntryType): LogEntryType => {
    if (logEntries.has(entry.logId)) {
        throw new Error(`Log ID ${entry.logId} already exists.`);
    }
    logEntries.set(entry.logId, entry);
    return entry;
  };
  
  // UPDATE
  export const updateLog = (logId: string, updates: Partial<LogEntryType>): LogEntryType | undefined => {
    const existingEntry = logEntries.get(logId);
    if (!existingEntry) {
      throw new Error(`Log entry with ID ${logId} does not exist`);
    }
    const updatedEntry: LogEntryType = {
      ...existingEntry,
      ...updates,
      logId: existingEntry.logId,
    };
    logEntries.set(logId, updatedEntry);
    return updatedEntry;
  };
  
  // DELETE
  export const deleteLog = (logId: string): boolean => {
    return logEntries.delete(logId);
  };
