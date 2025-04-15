# Log App Backend

This is the backend for the Log App, built with Node.js and Express. It provides RESTful APIs for managing log entries.

## Dependencies

The backend uses the following dependencies:

- **express**: A web framework for building APIs.
- **typescript**: A strongly typed programming language that builds on JavaScript.
- **dotenv**: For managing environment variables.
- **pnpm**: A fast, disk space-efficient package manager.

## How to Run the App

1. **Install Dependencies**:
   Make sure you have `pnpm` installed. Then, run the following command in the `log-app-be` directory:
   ```bash
   pnpm install
   ```

2. **Start the Server**:
   Run the following command to start the server:
   `pnpm start`
   Dev Mode:
   `pnpm run dev`
   By default, the server will run on `http://localhost:3001`.

3. **Environment Variables**:
   Not Required

## Endpoints

The backend provides the following endpoints:

### Log Entry Endpoints

- **GET /api/log-entries**: Retrieve all log entries.
- **POST /api/log-entries**: Create a new log entry.
- **GET /api/log-entries/:id**: Retrieve a specific log entry by ID.
- **PUT /api/log-entries/:id**: Update a specific log entry by ID.
- **DELETE /api/log-entries/:id**: Delete a specific log entry by ID.

Use postman collection for examples.

## Development

- **Code Structure**:
  - `src/controllers`: Contains the controller logic for handling API requests.
  - `src/services`: Contains the business logic for managing log entries.
  - `src/routes`: Defines the API routes.
  - `src/data`: Contains the data layer, including the `logStore` for managing log entries.

- **Testing**:
  Add unit tests for controllers, services, and middleware to ensure the app works as expected.

## License

This project is licensed under the MIT License.