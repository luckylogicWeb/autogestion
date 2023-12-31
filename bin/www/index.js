#!/usr/bin/env node
const http = require("http");

const initApp = require("../../src");
const logger = require("../../src/logger");
const { port } = require("../../config/env");

(async () => {
  /**
   * Get PORT from environment and store in Express.
   */
  const app = await initApp();

  app.set("port", port);

  /**
   * Create HTTP server.
   */
  const server = http.createServer(app);

  /**
   * Event listener for HTTP server "error" event.
   */
  const onError = (error) => {
    if (error.syscall !== "listen") {
      throw error;
    }

    const bind = typeof port === "string" ? `Pipe ${port}` : `Port ${port}`;

    // handle specific listen errors with friendly messages
    switch (error.code) {
      case "EACCES":
        logger.error(`${bind} requires elevated privileges`);
        process.exit(1);
        break;
      case "EADDRINUSE":
        logger.error(`${bind} is already in use`);
        process.exit(1);
        break;
      default:
        throw error;
    }
  };

  /**
   * Event listener for HTTP server "listening" event.
   */
  const onListening = () => {
    const addr = server.address();
    const bind =
      typeof addr === "string" ? `pipe ${addr}` : `port ${addr.port}`;

    logger.info(`Listening on ${bind}`);
  };

  server.on("error", onError);
  server.on("listening", onListening);

  /**
   * Listen on provided PORT, on all network interfaces.
   */
  server.listen(port);
})();
