import React, { useCallback, useState, useEffect } from "react";

import { NotesList } from "./NotesList";
import { NoteForm } from "./NoteForm";

export const App = ({ service }) => {
  const [notes, setNotes] = useState([]);
  const [selected, setSelected] = useState(null);

  // (!) Get notes from service
  useEffect(() => {
    (async () => {
      const notes = await service.getNotes();
      setNotes(notes);
    })();
  }, [service]);

  // Select new empty note
  const newNote = () => {
    setSelected({
      title: "",
      text: "",
      id: null,
    });
  };

  // Set note as selected
  const onSelect = useCallback((note) => {
    setSelected(note);
  }, []);

  // Unselect note
  const onCancel = useCallback(() => {
    setSelected(null);
  }, []);

  // Save note to service
  const onSubmit = useCallback(async (note) => {
    if (note) {
      await service.saveNote(note);
      let nextNotes = await service.getNotes();
      setNotes(nextNotes);
      setSelected(null);
    }
  }, []); // Add dependencies if necessary

  const onChange = useCallback((note) => {
    setSelected(note);
  }, []);

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-12">
          <h1>React notes</h1>
        </div>
      </div>
      <div className="row">
        <div className="col-md-4">
          <NotesList notes={notes} selected={selected} onSelect={onSelect} />
        </div>
        <div className="col-md-8">
          {selected && (
            <NoteForm
              note={selected}
              onChange={onChange}
              onSubmit={onSubmit}
              onCancel={onCancel}
            />
          )}
          {!selected && (
            <div>
              <button
                id="new-note"
                data-testid="new-note"
                onClick={() => newNote()}
              >
                New Note
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
