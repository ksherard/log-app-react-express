import { Router } from 'express';
import * as logController from '../controllers/logEntry.controller';

const router = Router();


// GET /api/v1/logs - Retrieve all log entries
router.get('/', logController.getAllLogEntriesHandler);

// POST /api/v1/logs - Create a new log entry
// TODO: Add validation middleware
router.post('/', logController.createLogEntryHandler);

// GET /api/v1/logs/:logId - Retrieve a log entry by ID
router.get('/:logId', logController.getLogEntryByIdHandler);

// PATCH /api/v1/logs/:logId - Update an existing log entry (Using patch for partial updates)
// TODO: Add validation middleware here, e.g., router.patch('/:logId', validate(updateLogSchema), logController.updateLogEntryHandler);
router.patch('/:logId', logController.updateLogEntryHandler);

// DELETE /api/v1/logs/:logId - Delete a log entry by ID
router.delete('/:logId', logController.deleteLogEntryHandler);

export default router;