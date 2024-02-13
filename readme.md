# Log Retrieval Service

This Node.js Express application provides a RESTful API for on-demand monitoring of Unix-based servers' log files located in the `/var/log` directory.

## Requirements

- Node.js (v12 or higher)
- npm (Node Package Manager)

## Installation

1. Clone the repository:

   ```sh
   git clone <repository-url>
   ```

2. Navigate to the project directory:

   ```sh
   cd log-retrieval-service
   ```

3. Install dependencies:
   ```sh
   npm install
   ```

## Running the Server

Start the Express server by running:

```sh
npm start
```

By default, the server will run on port 3000. You can specify a different port using the `PORT` environment variable.

## Usage

### Retrieving Log Files

Send an HTTP GET request to `/logs` with the following query parameters:

- `filename`: Name of the log file in the `/var/log` directory.
- `lines`: (Optional) Number of lines to retrieve from the log file. If not specified, all lines are returned.
- `filter`: (Optional) Keyword to filter log entries. Only log entries containing this keyword will be returned.

Example request:

```
GET /logs?filename=syslog&lines=100&filter=error
```

### Response

The server will respond with a JSON array containing the requested log entries. Each entry represents a line from the log file.

Example response:

```json
[
  "Feb  7 12:34:56 server1 kernel: [   12.345678] ERROR: Something went wrong",
  "Feb  7 12:34:57 server1 app: ERROR: Another error occurred"
]
```

## Performance Considerations

- The service is optimized to handle log files of >1GB by using streams for reading files and efficient filtering algorithms.
- However, performance may vary based on server resources and network conditions. Consider testing with large log files in a production-like environment.

## Adding a Basic UI

To interact with the API using a basic UI, open the provided `index.html` file in a web browser. The UI allows you to input query parameters and displays the returned log data.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
