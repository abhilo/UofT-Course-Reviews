// importing express module
const express = require("express");

// express instance
const app = express();

// port the application will be running on
const PORT = 3000;

// running application on the PORT
app.listen(PORT, () => {
  `The app is listening on port http://localhost:${PORT}`;
});
