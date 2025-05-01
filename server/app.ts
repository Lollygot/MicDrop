import express from "express";

const PORT = 8888;

const app = express();
app.listen(PORT, (): void => {
  console.log("Server started successfully");
});
