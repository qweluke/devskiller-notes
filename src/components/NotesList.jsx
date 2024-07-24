import React from "react";
import PropTypes from "prop-types";

// React.memo to prevent unnecessary re-renders of the NotesList component.
export const NotesList = React.memo(({ notes, selected, onSelect = [] }) => (
  <div className="list-group">
    {notes.map((note) => (
      <div
        key={note.id}
        data-testid="note-item"
        className={`list-group-item ${selected?.id === note.id ? "active" : ""}`}
        onClick={() => onSelect(note)}
      >
        <h3>{note.title}</h3>
        <p>{note.text}</p>
      </div>
    ))}
  </div>
));

NotesList.propTypes = {
  notes: PropTypes.array.isRequired,
  selected: PropTypes.object,
  onSelect: PropTypes.func.isRequired,
};
