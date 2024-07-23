import React from "react";

export const NoteForm = ({ note, onSubmit, onCancel, onChange }) => {
  const handleChange = (event) => {
    const { name, value } = event.target;
    onChange({
      ...note,
      [name]: value,
    });
  };

  return (
    <form
      onSubmit={(e) => {
        e.stopPropagation();
        e.preventDefault();
        onSubmit(note);
      }}
    >
      <div className="form-group">
        <label>Title:</label>
        <input
          className="form-control"
          data-testid="input-title"
          name="title"
          onChange={handleChange}
          value={note?.title}
        />
      </div>
      <div className="form-group">
        <label>Note:</label>
        <textarea
          className="form-control"
          data-testid="input-text"
          name="text"
          onChange={handleChange}
          value={note?.text}
        />
      </div>
      <div className="form-group">
        <input
          type="button"
          data-testid="cancel-note"
          className="btn btn-default pull-right"
          value="Cancel"
          onClick={onCancel}
        />
        <input
          type="submit"
          data-testid="save-note"
          className="btn btn-default pull-right"
          value="Save"
        />
      </div>
    </form>
  );
};
