import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import * as logEntryService from '../services/logEntry.service';


export const getAllLogEntriesHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const entries = await logEntryService.getAllEntries();
    res.status(StatusCodes.OK).json(entries);
  } catch (error) {
    next(error);
  }
};

export const getLogEntryByIdHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { logId } = req.params;
    const entry = await logEntryService.getEntryById(logId);
    res.status(StatusCodes.OK).json(entry);
  } catch (error) {
    next(error);
  }
};


// TODO: Add input validation middleware before this handler.
export const createLogEntryHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const entryData = req.body;
    const newEntry = await logEntryService.addEntry(entryData);
    res.status(StatusCodes.CREATED).json(newEntry);
  } catch (error) {
    next(error);
  }
};

// TODO: Add validation middleware before this handler.
export const updateLogEntryHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { logId } = req.params;
    const updates = req.body;
    const updatedEntry = await logEntryService.modifyEntry(logId, updates);
    res.status(StatusCodes.OK).json(updatedEntry);
  } catch (error) {
    next(error);
  }
};

// TODO: Add validation middleware before this handler.
export const deleteLogEntryHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { logId } = req.params;
    const success = await logEntryService.removeEntry(logId);

    if (success) {
      res.status(StatusCodes.NO_CONTENT).send();
    } else {
      res.status(StatusCodes.NOT_FOUND).json({ message: `Log entry with ID ${logId} not found.` });
    }
  } catch (error) {
    next(error);
  }
};