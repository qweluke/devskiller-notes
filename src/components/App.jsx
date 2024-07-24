import React, { useCallback, useState, useEffect } from "react";

import { NotesList } from "./NotesList";
import { NoteForm } from "./NoteForm";

export const App = ({ service }) => {
  const [notes, setNotes] = useState([]);
  const [selectedNote, setSelectedNote] = useState(null);

  // (!) Get notes from service
  useEffect(() => {
    (async () => {
      const notes = await service.getNotes();
      setNotes(notes);
    })();
  }, [service]);

  // Select new empty note
  const newNote = () => {
    setSelectedNote({
      title: "",
      text: "",
    });
  };

  // Set note as selected
  const onSelect = useCallback((note) => {
    setSelectedNote(note);
  }, []);

  // Unselect note
  const onCancel = useCallback(() => {
    setSelectedNote(null);
  }, []);

  // Save note to service
  const onSubmit = useCallback(
    async (note) => {
      if (note) {
        await service.saveNote(note);
        let nextNotes = await service.getNotes();
        setNotes(nextNotes);
        setSelectedNote(null);
      }
    },
    [service],
  ); // Add dependencies if necessary

  const onChange = useCallback((note) => {
    setSelectedNote(note);
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
          <NotesList
            notes={notes}
            selected={selectedNote}
            onSelect={onSelect}
          />
        </div>
        <div className="col-md-8">
          {selectedNote ? (
            <NoteForm
              note={selectedNote}
              onChange={onChange}
              onSubmit={onSubmit}
              onCancel={onCancel}
            />
          ) : (
            <div>
              <button
                id="new-note"
                data-testid="new-note"
                onClick={newNote}
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
