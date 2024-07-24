import React from "react";
import ReactDOM from "react-dom/client";

import { App } from "./components/App";

import { NotesService } from "./services/notes";
const notes = require("./test/notes.json");
const svc = new NotesService(notes);

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <App service={svc} />
  </React.StrictMode>,
);
