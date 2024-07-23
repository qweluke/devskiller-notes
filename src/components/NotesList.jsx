import React from "react";

export const NotesList = ({ notes, selected, onSelect = [] }) => (
  <div className="list-group">
    {notes.map((note) => (
      <div
        key={note.id}
        data-testid="note-item"
        className={`list-group-item ${selected && selected.id === note.id ? "active" : ""}`}
        onClick={() => onSelect(note)}
      >
        <h3>{note.title}</h3>
        <p>{note.text}</p>
      </div>
    ))}
  </div>
);
